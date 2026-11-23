import Link from "next/link";
import { eixos, projetos } from "../../data/site";

export const metadata = { title: "Projetos" };

export default function Projetos() {
  return (
    <>
      <h1>Projetos</h1>
      <p className="intro">
        Seis projetos públicos, agrupados por eixo. Todos usam dados fictícios. Cada card traz o problema, a stack e o link do repositório.
      </p>
      {eixos.map((eixo) => {
        const lista = projetos.filter((p) => p.eixo === eixo.id);
        if (!lista.length) return null;
        return (
          <section className="secao" key={eixo.id} aria-labelledby={`eixo-${eixo.id}`}>
            <h2 id={`eixo-${eixo.id}`}>{eixo.nome}</h2>
            <ul className="razao">
              {lista.map((p) => (
                <li key={p.slug}>
                  <h3><Link href={`/projetos/${p.slug}/`}>{p.titulo}</Link></h3>
                  <div>
                    <p>{p.problema}</p>
                    <p className="stack">{p.stack.slice(0, 3).join(" · ")}</p>
                  </div>
                  <p className="repo">
                    <a href={p.links[0].href} rel="noopener">Repositório no GitHub</a>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
