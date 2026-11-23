import {
  ChartColumn, Webhook, FileSearch, MessageSquareText, Workflow, Network, Sparkles, Layers, Terminal, Code, Bot,
  Link2, GitBranch, Database, Zap, TableProperties, LayoutGrid, FolderKanban, Factory, Cloud, Brain,
  GraduationCap, Wrench, MapPin, ArrowUpRight, Briefcase, Building2,
} from "lucide-react";

// Ícones genéricos (Lucide, licença ISC). Não são logos de marcas e são sempre decorativos.
const mapa = {
  prompts: MessageSquareText, rag: FileSearch, orquestracao: Network, automacao: Workflow, api: Webhook,
  vibe: Sparkles, nextjs: Layers, python: Terminal, web: Code, hf: Bot,
  langchain: Link2, github: GitBranch, fabric: Database, pyspark: Zap, sql: TableProperties, powerbi: ChartColumn,
  powerapps: LayoutGrid, powerautomate: Workflow, sharepoint: FolderKanban, sap: Factory, azure: Cloud,
  dados: ChartColumn, ia: Brain, apis: Webhook, formacao: GraduationCap, tecnico: Wrench, local: MapPin,
  externo: ArrowUpRight, trabalho: Briefcase, empresa: Building2,
};

export default function Icone({ nome, tamanho = 20 }) {
  const C = mapa[nome];
  if (!C) return null;
  return <C className="ic" width={tamanho} height={tamanho} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
