import { perfil } from "../../data/site";

export const metadata = { title: "Contato" };

export default function Contato() {
  return (
    <>
      <h1>Contato</h1>
      <p className="intro">Os três perfis abaixo são os canais públicos.</p>
      <div className="secao">
        <ul className="linhas">
          <li><span className="nome">LinkedIn</span><p><a href={perfil.links.linkedin} rel="noopener">linkedin.com/in/guilherme-g-bento</a></p></li>
          <li><span className="nome">GitHub</span><p><a href={perfil.links.github} rel="noopener">github.com/Prodigyb0y</a></p></li>
          <li><span className="nome">Hugging Face</span><p><a href={perfil.links.huggingface} rel="noopener">huggingface.co/bEniac</a></p></li>
        </ul>
      </div>
    </>
  );
}
