"use client";
import { useEffect } from "react";

// Microinterações para tela com mouse: botões magnéticos, inclinação dos vídeos e contagem dos números medidos.
export default function Movimento() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const limpa = [];

    // Contagem dos números (o texto final é sempre o original)
    const alvos = [...document.querySelectorAll(".dado strong")];
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target, orig = el.dataset.orig, t0 = performance.now();
        const passo = (t) => {
          const k = Math.min(1, (t - t0) / 1300), f = 1 - Math.pow(1 - k, 3);
          el.textContent = k >= 1 ? orig : orig.replace(/\d+/g, (n) => String(Math.round(Number(n) * f)));
          if (k < 1) requestAnimationFrame(passo);
        };
        requestAnimationFrame(passo);
      });
    }, { threshold: 0.6 });
    alvos.forEach((el) => { el.dataset.orig = el.textContent; io.observe(el); });
    limpa.push(() => io.disconnect());

    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll(".btn").forEach((b) => {
        const mv = (e) => {
          const r = b.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          b.style.setProperty("--tx", dx * 0.18 + "px"); b.style.setProperty("--ty", dy * 0.28 + "px");
        };
        const sai = () => { b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); };
        b.addEventListener("pointermove", mv); b.addEventListener("pointerleave", sai);
        limpa.push(() => { b.removeEventListener("pointermove", mv); b.removeEventListener("pointerleave", sai); });
      });
      document.querySelectorAll(".proj-video").forEach((f) => {
        const mv = (e) => {
          const r = f.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
          f.style.setProperty("--ry", x * 7 + "deg"); f.style.setProperty("--rx", -y * 7 + "deg");
        };
        const sai = () => { f.style.setProperty("--ry", "0deg"); f.style.setProperty("--rx", "0deg"); };
        f.addEventListener("pointermove", mv); f.addEventListener("pointerleave", sai);
        limpa.push(() => { f.removeEventListener("pointermove", mv); f.removeEventListener("pointerleave", sai); });
      });
    }
    return () => limpa.forEach((f) => f());
  }, []);
  return null;
}
