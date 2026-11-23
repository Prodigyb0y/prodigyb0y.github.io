"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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

  function alternar() {
    const novo = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = novo;
    setTema(novo);
    try { localStorage.setItem("tema", novo); } catch (e) {}
  }

  return (
    <>
      <nav aria-label="Principal">
        <ul className="nav">
          {itens.map(([href, rotulo]) => (
            <li key={href}><Link href={href}>{rotulo}</Link></li>
          ))}
        </ul>
      </nav>
      <button type="button" className="tema" onClick={alternar} aria-pressed={tema === "dark"}>
        {tema === "dark" ? "Tema claro" : "Tema escuro"}
      </button>
    </>
  );
}
