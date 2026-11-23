import "./globals.css";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import Link from "next/link";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import { perfil, aviso } from "../data/site";

const dmSans = localFont({
  src: "../fonts/DMSans.woff2",
  variable: "--font-sans",
  weight: "100 1000",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://prodigyb0y.github.io"),
  title: { default: `${perfil.nome} · ${perfil.cargo}`, template: `%s · ${perfil.nome}` },
  description:
    "Portfólio de Guilherme Gabriel Bento: automações e ferramentas com IA, cada uma com repositório, método de medição e limitações.",
  openGraph: { title: perfil.nome, description: perfil.cargo, type: "website", locale: "pt_BR" },
};

export const viewport = { width: "device-width", initialScale: 1 };

const temaInicial = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("tema");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body>
        <a className="skip" href="#conteudo">Pular para o conteúdo</a>
        <div className="progresso" aria-hidden="true" />
        <header className="topo">
          <div className="wrap">
            <Link className="marca" href="/">{perfil.nome}</Link>
            <Nav />
          </div>
        </header>
        <Reveal />
        <ViewTransition>
          <main id="conteudo" tabIndex={-1}>
            {children}
          </main>
        </ViewTransition>
        <footer className="rodape">
          <div className="wrap">
            <p>{aviso}</p>
            <p>Telas e dados da produção interna do autor não são públicos e não aparecem aqui.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
