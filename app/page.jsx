import Link from "next/link";
import VideoPoster from "../components/VideoPoster";
import Icone from "../components/Icone";
import {
  perfil, sobre, experiencia, competenciasExtras, projetos, eixos, competencias,
  formacao, cursos, hackathon, idiomas,
} from "../data/site";

const manchete = {
  "api-pedidos-ia": { dado: "160 de 160 campos corretos", metodo: "20 pedidos fictícios, gabarito registrado antes, uma rodada." },
  "assistente-rag-auditoria": { dado: "30/30 de acerto, com citação válida", metodo: "30 perguntas com gabarito, uma execução por modo, sem intervalo de confiança." },
  "dashboard-importacao": { dado: "14 de 14 recortes com diferença zero", metodo: "Conferido contra um script independente. Dados fictícios." },
};

const sigla = (n) => (/schaeffler/i.test(n) ? "S" : n.split(" ")[0].slice(0, 3).toUpperCase());
const duracao = (s) => `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;

export default function Inicio() {
  return (
    <>
      <section className="hero wrap" aria-labelledby="nome">
        <div className="hero-texto">
          <p className="cargo"><Icone nome="local" tamanho={16} /> {perfil.cargo} · {perfil.local}</p>
          <h1 id="nome">{perfil.nome}</h1>
          <p className="frase">{perfil.frase}</p>
          <div className="botoes">
            <a className="btn primario" href="#projetos">Ver projetos</a>
            <a className="btn" href="#historia">Currículo</a>
            <a className="btn" href={perfil.links.linkedin} rel="noopener">LinkedIn</a>
          </div>
        </div>
        <figure className="hero-foto">
          <img src="/img/foto-guilherme.webp" width="900" height="900" alt="Foto de Guilherme Gabriel Bento, de frente, com camisa preta" fetchPriority="high" decoding="async" />
        </figure>
      </section>

      <section id="historia" className="secao wrap" aria-labelledby="h-historia">
        <div className="secao-cab" data-rv>
          <h2 id="h-historia">Minha história</h2>
          {sobre.map((t) => <p key={t} className="lede">{t}</p>)}
        </div>

        <ol className="tempo">
          {experiencia.map((e) => (
            <li key={e.periodo} className="passo" data-rv>
              <span className="ponto" aria-hidden="true" />
              <p className="periodo">{e.periodo}</p>
              <h3>{e.cargo}</h3>
              <p className="meta"><span className="logo" aria-hidden="true">{sigla(e.empresa)}</span>{e.empresa} · {e.local}</p>
              <p>{e.texto}</p>
              {e.topicos ? <ul className="topicos">{e.topicos.map((t) => <li key={t}>{t}</li>)}</ul> : null}
              {e.entregas ? <ul className="entregas">
                {e.entregas.map((d) => (
                  <li key={d.titulo} className={d.medido ? "entrega medido" : "entrega"}>
                    <h4>{d.titulo}</h4>
                    <p><span className="rot">Problema</span> {d.problema}</p>
                    <p><span className="rot">O que fiz</span> {d.acao}</p>
                    <p><span className="rot">Resultado</span> {d.resultado}</p>
                    {d.slug ? <p className="mais"><Link href={`/projetos/${d.slug}/`}>Ver a recriação pública</Link></p> : null}
                  </li>
                ))}
              </ul> : null}
            </li>
          ))}
          <li className="passo" data-rv>
            <span className="ponto" aria-hidden="true" />
            <p className="periodo">Hoje</p>
            <h3>Projetos públicos</h3>
            <p>
              A experiência interna não é pública e ninguém de fora consegue conferir. Por isso recriei esses padrões
              com dados fictícios, em repositórios abertos, cada um com método de medição e limitações.
            </p>
            <p className="mais"><a href="#projetos">Ver os projetos</a></p>
          </li>
        </ol>
        <p className="nota" data-rv>
          Nenhuma tela nem dado da empresa aparece neste site. Os sistemas e ferramentas citados são os mesmos do meu
          LinkedIn. Os dois tempos cronometrados acima foram medidos por mim e não dá para verificá-los de fora.
        </p>
      </section>

      <section id="projetos" className="secao wrap" aria-labelledby="h-projetos">
        <div className="secao-cab" data-rv>
          <h2 id="h-projetos">Projetos</h2>
          <p className="lede">
            Seis projetos públicos, todos com dados fictícios. Cada um tem vídeo, repositório e uma página com o método
            de medição, os resultados e o que eles não provam.
          </p>
        </div>
        <div className="projs">
          {projetos.map((p, i) => {
            const m = manchete[p.slug];
            const eixo = eixos.find((e) => e.id === p.eixo)?.nome;
            return (
              <article key={p.slug} className={`proj${i % 2 ? " inverso" : ""}`} data-rv>
                <figure className="proj-video">
                  <VideoPoster src={`/video/projetos/${p.slug}.mp4`} poster={`/video/projetos/${p.slug}.webp`} titulo={`do projeto ${p.titulo}`} />
                  <figcaption>{duracao(p.videoSegundos)}, legendas na tela e narração por voz sintética.</figcaption>
                </figure>
                <div className="proj-texto">
                  <p className="eixo"><Icone nome={p.eixo} tamanho={18} /> {eixo}</p>
                  <h3>{p.titulo}</h3>
                  <p>{p.resumo}</p>
                  {m ? (
                    <p className="dado"><strong>{m.dado}</strong><span>{m.metodo}</span></p>
                  ) : null}
                  <div className="botoes">
                    <Link className="btn primario" href={`/projetos/${p.slug}/`}>Ver detalhes</Link>
                    <a className="btn" href={p.links[0].href} rel="noopener">Repositório</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="competencias" className="secao wrap" aria-labelledby="h-comp">
        <div className="secao-cab" data-rv>
          <h2 id="h-comp">Competências</h2>
          <p className="lede">As do primeiro grupo têm um projeto público que as prova, e cada uma leva até ele. As do segundo vêm do meu trabalho e do meu LinkedIn, e não têm projeto público para conferir.</p>
        </div>
        <ul className="comps">
          {competencias.map((c) => (
            <li key={c.nome} data-rv>
              <Link href={`/projetos/${c.slug}/`}>
                <span className="c-ic"><Icone nome={c.icone} tamanho={22} /></span>
                <span className="c-txt">
                  <span className="c-nome">{c.nome}</span>
                  <span className="c-prova">{c.prova}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="extras" data-rv>
          <h3>Do trabalho, sem projeto público para conferir</h3>
          <ul className="chips" data-rv>
            {competenciasExtras.map(([ic, c]) => <li key={c}><Icone nome={ic} tamanho={16} /> {c}</li>)}
          </ul>
        </div>
      </section>

      <section id="formacao" className="secao wrap" aria-labelledby="h-form">
        <div className="secao-cab" data-rv>
          <h2 id="h-form">Formação</h2>
        </div>
        <ul className="forms">
          {formacao.map((f) => (
            <li key={f.curso} data-rv>
              <span className="f-ic"><Icone nome={/SENAI/.test(f.instituicao) ? "tecnico" : "formacao"} tamanho={22} /></span>
              <h3>{f.curso}</h3>
              <p>{f.instituicao}</p>
              <p className="meta">{f.status}</p>
            </li>
          ))}
        </ul>
        <div className="mais-form" data-rv>
          <p><strong>Inglês:</strong> {idiomas.replace("Inglês ", "").replace(/^./, (c) => c.toUpperCase())}</p>
          <p>{hackathon}</p>
          <details>
            <summary>Cursos concluídos (formação, sem projeto público associado)</summary>
            <dl>
              {cursos.map(([t, d]) => (
                <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
              ))}
            </dl>
          </details>
        </div>
      </section>

      <section id="contato" className="secao wrap fim" aria-labelledby="h-contato">
        <div className="secao-cab" data-rv>
          <h2 id="h-contato">Contato</h2>
          <p className="lede">O melhor caminho é o LinkedIn. O código está no GitHub e o Space no Hugging Face.</p>
        </div>
        <div className="botoes" data-rv>
          <a className="btn primario" href={perfil.links.linkedin} rel="noopener"><Icone nome="trabalho" tamanho={18} /> LinkedIn</a>
          <a className="btn" href={perfil.links.github} rel="noopener"><Icone nome="github" tamanho={18} /> GitHub</a>
          <a className="btn" href={perfil.links.huggingface} rel="noopener"><Icone nome="hf" tamanho={18} /> Hugging Face</a>
        </div>
      </section>
    </>
  );
}
