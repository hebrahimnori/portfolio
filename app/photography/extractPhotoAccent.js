/**
 * Samples a downscaled bitmap to get a pleasant accent RGB for UI chrome.
 * Skips near-black / near-white pixels so frames stay lively on dark or blown highlights.
 */
export function extractPhotoAccent(img) {
  const fallback = { r: 150, g: 165, b: 235 };
  if (!img?.naturalWidth || !img.naturalHeight) return fallback;

  try {
    const w = 64;
    const h = Math.max(
      1,
      Math.round((img.naturalHeight / img.naturalWidth) * w)
    );
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return fallback;

    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    let r = 0;
    let g = 0;
    let b = 0;
    let n = 0;

    for (let i = 0; i < data.length; i += 8) {
      const rr = data[i];
      const gg = data[i + 1];
      const bb = data[i + 2];
      const aa = data[i + 3];
      if (aa < 24) continue;

      const lum = 0.2126 * rr + 0.7152 * gg + 0.0722 * bb;
      if (lum < 22 || lum > 245) continue;

      r += rr;
      g += gg;
      b += bb;
      n++;
    }

    if (n < 8) return fallback;

    r = Math.round(r / n);
    g = Math.round(g / n);
    b = Math.round(b / n);

    const avg = (r + g + b) / 3;
    const push = 1.28;
    r = Math.min(255, Math.max(0, Math.round(avg + (r - avg) * push)));
    g = Math.min(255, Math.max(0, Math.round(avg + (g - avg) * push)));
    b = Math.min(255, Math.max(0, Math.round(avg + (b - avg) * push)));

    return { r, g, b };
  } catch {
    return fallback;
  }
}
