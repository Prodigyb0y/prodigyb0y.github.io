"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const itens = [
  ["/", "Início"],
  ["/projetos/", "Projetos"],
  ["/competencias/", "Competências"],
  ["/experiencia/", "Experiência"],
  ["/video/", "Vídeo"],
  ["/contato/", "Contato"],
];

export default function Nav() {
  const pathname = usePathname() || "/";
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

  const ativo = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <nav aria-label="Principal">
        <ul className="nav">
          {itens.map(([href, rotulo]) => (
            <li key={href}>
              <Link href={href} aria-current={ativo(href) ? "page" : undefined}>{rotulo}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="tema" onClick={alternar} aria-pressed={tema === "dark"}>
        {tema === "dark" ? "Tema claro" : "Tema escuro"}
      </button>
    </>
  );
}
