import Link from "next/link";
import { notFound } from "next/navigation";
import { eixos, projetos } from "../../../data/site";
import VideoPoster from "../../../components/VideoPoster";
import Resultados from "../../../components/Resultados";

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  return p ? { title: p.titulo, description: p.resumo } : {};
}

export default async function Projeto({ params }) {
  const { slug } = await params;
  const p = projetos.find((x) => x.slug === slug);
  if (!p) notFound();
  const eixo = eixos.find((e) => e.id === p.eixo)?.nome;

  return (
    <article className="wrap detalhe">
      <header className="cab-projeto">
        <p className="eixo"><Link href="/#projetos">← Todos os projetos</Link> · {eixo}</p>
        <h1>{p.titulo}</h1>
        <p className="intro">{p.resumo}</p>
      </header>

      <section className="video-topo" aria-label="Vídeo do projeto">
        <div className="video-box">
          <VideoPoster src={`/video/projetos/${p.slug}.mp4`} poster={`/video/projetos/${p.slug}.webp`} titulo={`do projeto ${p.titulo}`} />
          <p className="legenda-video">{Math.floor(p.videoSegundos / 60)} min {String(p.videoSegundos % 60).padStart(2, "0")} s, com legendas na tela e trilha musical, sem narração. Prints das demos públicas, com dados fictícios.</p>
        </div>
      </section>

      <section className="bloco" aria-labelledby="problema">
        <h2 id="problema">Problema</h2>
        <p>{p.problema}</p>
      </section>

      <section className="bloco" aria-labelledby="solucao">
        <h2 id="solucao">Solução</h2>
        <p>{p.solucao}</p>
      </section>

      <section className="bloco" aria-labelledby="demo">
        <h2 id="demo">Demo</h2>
        <div>
          {p.imagem ? (
            <figure className="figura">
              <img src={p.imagem.src} alt={p.imagem.alt} width="1280" height="800" loading="lazy" decoding="async" />
              <figcaption>{p.imagem.legenda}</figcaption>
            </figure>
          ) : (
            <p>Este projeto não tem demo interativa. O código e os resultados estão no repositório.</p>
          )}
        </div>
      </section>

      <section className="bloco" aria-labelledby="metodo">
        <h2 id="metodo">Método de medição</h2>
        <ul>
          {p.medicao.metodo.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </section>

      <section className="bloco" aria-labelledby="resultados">
        <h2 id="resultados">Resultados</h2>
        <div>
          {p.estimativa ? <div className="aviso" style={{ marginBottom: "1rem" }}><p>{p.estimativa}</p></div> : null}
          <Resultados itens={p.medicao.resultados} />
        </div>
      </section>

      <section className="bloco" aria-labelledby="limites">
        <h2 id="limites">Limitações</h2>
        <div className="limites">
          <ul>
            {p.limitacoes.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </section>

      <section className="bloco" aria-labelledby="stack">
        <h2 id="stack">Stack</h2>
        <ul>{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
      </section>

      <section className="bloco" aria-labelledby="links">
        <h2 id="links">Links</h2>
        <ul className="links">
          {p.links.map((l) => (
            <li key={l.href}><a href={l.href} rel="noopener">{l.rotulo}</a></li>
          ))}
        </ul>
      </section>
    </article>
  );
}
