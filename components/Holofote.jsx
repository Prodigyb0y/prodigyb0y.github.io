"use client";
import { useEffect } from "react";

// Luz que acompanha o mouse no topo da página. Só em telas com mouse e sem pedido de redução de movimento.
export default function Holofote() {
  useEffect(() => {
    const ok = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    const el = document.documentElement;
    let raf = 0, x = 0, y = 0;
    const aplica = () => {
      raf = 0;
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
    };
    const mover = (e) => {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(aplica);
    };
    addEventListener("pointermove", mover, { passive: true });
    return () => { removeEventListener("pointermove", mover); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return null;
}
