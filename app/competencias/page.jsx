import Link from "next/link";
import { competencias, projetos } from "../../data/site";

export const metadata = { title: "Competências" };

export default function Competencias() {
  return (
    <>
      <h1>Competências</h1>
      <p className="intro">
        Só entram competências com evidência pública. Cada uma leva ao projeto que a prova.
      </p>
      <div className="secao">
        <ul className="linhas">
          {competencias.map((c) => {
            const p = projetos.find((x) => x.slug === c.slug);
            return (
              <li key={c.nome}>
                <span className="nome">{c.nome}</span>
                <p>
                  {c.prova} <Link href={`/projetos/${c.slug}/`}>{p.titulo}</Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
