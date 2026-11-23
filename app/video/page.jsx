import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { projetos } from "../../data/site";

export const metadata = { title: "Vídeo de apresentação" };

const existe = (f) => fs.existsSync(path.join(process.cwd(), "public", "video", f));

export default function Video() {
  const mp4 = existe("apresentacao.mp4");
  const gif = existe("apresentacao.gif");
  return (
    <>
      <h1>Vídeos</h1>
      <p className="intro">
        Dois minutos, em português, com legendas na tela. Os dados mostrados são fictícios e os números vêm dos READMEs.
      </p>
      <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem" }}>Apresentação geral</h2>
      <div className="video-box">
        {mp4 ? (
          <video controls preload="metadata" poster={existe("capa.webp") ? "/video/capa.webp" : undefined}>
            <source src="/video/apresentacao.mp4" type="video/mp4" />
            Seu navegador não reproduz vídeo. O arquivo está em /video/apresentacao.mp4.
          </video>
        ) : (
          <p>O vídeo ainda não foi publicado.</p>
        )}
        {gif ? (
          <>
            <h2 style={{ marginTop: "2.5rem", marginBottom: "0.8rem" }}>Trecho em GIF</h2>
            <img src="/video/apresentacao.gif" alt="Trecho do vídeo: um pedido de compra em texto livre vira campos estruturados e um e-mail de pendências." width="960" height="540" loading="lazy" />
          </>
        ) : null}
      </div>

      <section className="secao" aria-labelledby="por-projeto">
        <h2 id="por-projeto">Um vídeo por projeto</h2>
        <p className="intro" style={{ marginBottom: "1.5rem" }}>
          Cada vídeo mostra a demo pública, o método de medição e as limitações do projeto. Dados fictícios, legendas na tela, sem narração.
        </p>
        <ul className="linhas">
          {projetos.map((p) => (
            <li key={p.slug}>
              <span className="nome">{p.titulo}</span>
              <p>
                {Math.floor(p.videoSegundos / 60)} min {String(p.videoSegundos % 60).padStart(2, "0")} s.{" "}
                <Link href={`/projetos/${p.slug}/`}>Assistir na página do projeto</Link>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
