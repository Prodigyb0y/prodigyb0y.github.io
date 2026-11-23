"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

const itens = [
  ["/#historia", "História"],
  ["/#projetos", "Projetos"],
  ["/#competencias", "Competências"],
  ["/#formacao", "Formação"],
  ["/#contato", "Contato"],
];

export default function Nav() {
  const [tema, setTema] = useState(null);

  useEffect(() => {
    setTema(document.documentElement.dataset.theme || "light");
  }, []);

  const [ativo, setAtivo] = useState("");

  // Destaca no menu a seção que está na tela.
  useEffect(() => {
    const secoes = itens.map(([h]) => document.getElementById(h.slice(2))).filter(Boolean);
    if (!secoes.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAtivo(e.target.id); }),
      { rootMargin: "-35% 0px -55% 0px" }
    );
    secoes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function alternar() {
    const novo = tema === "dark" ? "light" : "dark";
    const aplicar = () => {
      document.documentElement.dataset.theme = novo;
      setTema(novo);
      try { localStorage.setItem("tema", novo); } catch (e) {}
    };
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduz) {
      document.startViewTransition(() => { flushSync(aplicar); });
    } else {
      aplicar();
    }
  }

  return (
    <>
      <nav aria-label="Principal">
        <ul className="nav">
          {itens.map(([href, rotulo]) => (
            <li key={href}><Link href={href} aria-current={ativo === href.slice(2) ? "location" : undefined}>{rotulo}</Link></li>
          ))}
        </ul>
      </nav>
      <button type="button" className="tema" onClick={alternar} aria-pressed={tema === "dark"}>
        {tema === "dark" ? "Tema claro" : "Tema escuro"}
      </button>
    </>
  );
}
