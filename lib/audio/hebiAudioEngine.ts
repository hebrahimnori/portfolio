/**
 * Hebi (light theme) — ambient MP3 + UI sounds.
 * Clicks: soft synthesized tone; dock hover: light tick WAV.
 */

import { HEBI_AUDIO_VERSION } from "../../data/site";

export type HebiClickKind = "soft" | "hover" | "nav" | "toggle";

const v = HEBI_AUDIO_VERSION;

const AMBIENT_SRC = `/audio/hebi/ambient.mp3?v=${v}`;

/** File-based sounds only (hover + toggle). */
const CLICK_FILES: Partial<Record<HebiClickKind, string>> = {
  hover: `/audio/hebi/click-hover.wav?v=${v}`,
  toggle: `/audio/hebi/click-toggle.wav?v=${v}`,
};

const FILE_GAIN: Partial<Record<HebiClickKind, number>> = {
  hover: 0.26,
  toggle: 0.38,
};

type AmbientHandle = {
  stop: () => void;
};

export class HebiAudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambient: AmbientHandle | null = null;
  private ambientEl: HTMLAudioElement | null = null;
  private clickEls: Partial<Record<HebiClickKind, HTMLAudioElement>> = {};
  private unlocked = false;
  private assetsReady = false;
  private fadeTimer: ReturnType<typeof setInterval> | null = null;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctx) return null;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.85;
      this.master.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  private loadAudio(src: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const el = new Audio(src);
      el.preload = "auto";
      const done = () => {
        el.removeEventListener("canplaythrough", done);
        el.removeEventListener("error", onErr);
        resolve(el);
      };
      const onErr = () => {
        el.removeEventListener("canplaythrough", done);
        el.removeEventListener("error", onErr);
        reject(new Error(`failed: ${src}`));
      };
      el.addEventListener("canplaythrough", done, { once: true });
      el.addEventListener("error", onErr, { once: true });
      el.load();
    });
  }

  resetAssets() {
    this.stopAmbient();
    this.ambientEl = null;
    this.clickEls = {};
    this.assetsReady = false;
  }

  private async preloadFiles(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    if (this.assetsReady && this.ambientEl) return true;

    this.stopAmbient();
    this.ambientEl = null;
    this.clickEls = {};

    try {
      const ambient = await this.loadAudio(AMBIENT_SRC);
      ambient.loop = true;
      ambient.volume = 0;
      this.ambientEl = ambient;

      const kinds = Object.keys(CLICK_FILES) as HebiClickKind[];
      await Promise.all(
        kinds.map(async (kind) => {
          const src = CLICK_FILES[kind];
          if (!src) return;
          const el = await this.loadAudio(src);
          this.clickEls[kind] = el;
        })
      );

      this.assetsReady = true;
      return true;
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[Hebi audio] Missing ambient.mp3 or click files in public/audio/hebi/.",
          err
        );
      }
      this.resetAssets();
      return false;
    }
  }

  async unlock(): Promise<boolean> {
    const ctx = this.ensureContext();
    if (!ctx) return false;
    if (ctx.state === "suspended") {
      try {
        await ctx.resume();
      } catch {
        return false;
      }
    }
    this.unlocked = ctx.state === "running";
    return this.unlocked;
  }

  isUnlocked() {
    return this.unlocked;
  }

  async prepare(): Promise<boolean> {
    const ok = await this.unlock();
    if (!ok) return false;
    if (this.assetsReady && this.ambientEl) return true;
    return this.preloadFiles();
  }

  startAmbient(volume = 0.2) {
    if (this.ambient) return;

    if (this.ambientEl) {
      const el = this.ambientEl;
      el.volume = 0;
      void el.play().catch(() => {});

      const start = performance.now();
      const duration = 1400;
      if (this.fadeTimer) clearInterval(this.fadeTimer);
      this.fadeTimer = setInterval(() => {
        const t = Math.min(1, (performance.now() - start) / duration);
        el.volume = volume * t;
        if (t >= 1 && this.fadeTimer) {
          clearInterval(this.fadeTimer);
          this.fadeTimer = null;
        }
      }, 50);

      this.ambient = {
        stop: () => {
          if (this.fadeTimer) {
            clearInterval(this.fadeTimer);
            this.fadeTimer = null;
          }
          const fadeStart = performance.now();
          const fadeDur = 1100;
          const fromVol = el.volume;
          const fade = setInterval(() => {
            const t = Math.min(1, (performance.now() - fadeStart) / fadeDur);
            const eased = 1 - (1 - t) * (1 - t);
            el.volume = fromVol * (1 - eased);
            if (t >= 1) {
              clearInterval(fade);
              el.pause();
              el.volume = 0;
            }
          }, 40);
          this.ambient = null;
        },
      };
    }
  }

  stopAmbient() {
    this.ambient?.stop();
    this.ambient = null;
  }

  /** Warm low “bloom” — soft click, not a sharp tick. */
  private playRelaxingClickSynth(brightness = 1) {
    const ctx = this.ensureContext();
    if (!ctx || !this.master) return;

    const now = ctx.currentTime;
    const peak = 0.09 * brightness;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, now);
    filter.frequency.exponentialRampToValueAtTime(520, now + 0.22);
    filter.Q.value = 0.55;

    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.linearRampToValueAtTime(peak, now + 0.014);
    bus.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    bus.connect(filter);
    filter.connect(this.master);

    const body = ctx.createOscillator();
    body.type = "sine";
    body.frequency.setValueAtTime(300, now);
    body.frequency.exponentialRampToValueAtTime(220, now + 0.2);
    body.connect(bus);
    body.start(now);
    body.stop(now + 0.26);

    const air = ctx.createOscillator();
    air.type = "triangle";
    air.frequency.setValueAtTime(480 * brightness, now);
    air.frequency.exponentialRampToValueAtTime(360, now + 0.14);
    const airGain = ctx.createGain();
    airGain.gain.value = 0.22;
    air.connect(airGain);
    airGain.connect(bus);
    air.start(now);
    air.stop(now + 0.2);
  }

  playClick(kind: HebiClickKind = "soft") {
    if (!this.unlocked) return;

    if (kind === "soft" || kind === "nav") {
      this.playRelaxingClickSynth(1);
      return;
    }

    if (kind === "toggle") {
      this.playRelaxingClickSynth(1.08);
      return;
    }

    const el = this.clickEls[kind];
    if (el) {
      const click = el.cloneNode(true) as HTMLAudioElement;
      click.volume = FILE_GAIN[kind] ?? 0.3;
      void click.play().catch(() => {});
    }
  }

  dispose() {
    this.resetAssets();
    if (this.fadeTimer) clearInterval(this.fadeTimer);
    if (this.ctx) {
      void this.ctx.close();
    }
    this.ctx = null;
    this.master = null;
    this.unlocked = false;
  }
}

export const hebiAudioEngine = new HebiAudioEngine();
