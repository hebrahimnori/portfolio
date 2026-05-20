"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

import { hebiAudioEngine, type HebiClickKind } from "../lib/audio/hebiAudioEngine";
import { SOUND_ENABLED_STORAGE_KEY } from "../data/site";
import { useTheme } from "./ThemeProvider";

type SiteAudioContextValue = {
  soundEnabled: boolean;
  canUseAudio: boolean;
  toggleSound: () => void;
  playClick: (kind?: HebiClickKind) => void;
};

const SiteAudioContext = createContext<SiteAudioContextValue | null>(null);

const INTERACTIVE_SELECTOR =
  "a[href], button:not([disabled]), [role='button'], input[type='submit'], input[type='button']";

function isSoundToggle(el: Element | null) {
  return Boolean(el?.closest("[data-sound-toggle]"));
}

export function SiteAudioProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isHebi = theme === "light";
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);
  const isHebiRef = useRef(isHebi);
  const lastClickAt = useRef(0);

  soundEnabledRef.current = soundEnabled;
  isHebiRef.current = isHebi;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOUND_ENABLED_STORAGE_KEY);
      if (stored === "1") setSoundEnabled(true);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const canUseAudio = isHebi;

  const applyAmbient = useCallback(async (enabled: boolean) => {
    if (!enabled || !isHebiRef.current) {
      hebiAudioEngine.stopAmbient();
      return;
    }
    const ready = await hebiAudioEngine.prepare();
    if (!ready) return;
    hebiAudioEngine.startAmbient();
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(SOUND_ENABLED_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      void (async () => {
        if (next && isHebiRef.current) {
          const ready = await hebiAudioEngine.prepare();
          if (!ready) return;
          hebiAudioEngine.startAmbient();
          hebiAudioEngine.playClick("toggle");
        } else {
          hebiAudioEngine.stopAmbient();
        }
      })();
      return next;
    });
  }, []);

  const playClick = useCallback((kind: HebiClickKind = "soft") => {
    if (!soundEnabledRef.current || !isHebiRef.current) return;
    hebiAudioEngine.playClick(kind);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isHebi) {
      hebiAudioEngine.stopAmbient();
      return;
    }
    if (soundEnabled) {
      void applyAmbient(true);
    }
  }, [hydrated, isHebi, soundEnabled, applyAmbient, pathname]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!soundEnabledRef.current || !isHebiRef.current) return;
      const target = e.target as Element | null;
      if (!target?.closest(INTERACTIVE_SELECTOR)) return;
      if (isSoundToggle(target)) return;

      const now = Date.now();
      if (now - lastClickAt.current < 70) return;
      lastClickAt.current = now;

      if (hebiAudioEngine.isUnlocked()) {
        hebiAudioEngine.playClick("soft");
        return;
      }
      void hebiAudioEngine.prepare().then((ready) => {
        if (!ready) return;
        hebiAudioEngine.playClick("soft");
      });
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);

  const value = useMemo(
    () => ({ soundEnabled, canUseAudio, toggleSound, playClick }),
    [soundEnabled, canUseAudio, toggleSound, playClick]
  );

  return (
    <SiteAudioContext.Provider value={value}>{children}</SiteAudioContext.Provider>
  );
}

export function useSiteAudio() {
  const ctx = useContext(SiteAudioContext);
  if (!ctx) {
    throw new Error("useSiteAudio must be used within SiteAudioProvider");
  }
  return ctx;
}
