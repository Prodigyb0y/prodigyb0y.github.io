"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Revela os blocos marcados com data-rv quando entram na tela.
// Sem JavaScript, ou com prefers-reduced-motion, tudo aparece de uma vez (ver globals.css).
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const itens = document.querySelectorAll("[data-rv]");
    if (!("IntersectionObserver" in window)) {
      itens.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    itens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
