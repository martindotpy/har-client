import { notebookToc } from "@/notebook-content";
import { marked } from "marked";

const notebookMarkdownToc = notebookToc.reduce(
  (acc, { label, href, depth }) => {
    const indent = "  ".repeat(depth - 2);
    return acc + `${indent}- [${label}](${href})\n`;
  },
  "",
);

const tocContent = await marked.parse(notebookMarkdownToc);

interface HeaderLink {
  title: string;
  href: string;
  /**
   * Este contenido se mostrará en el tooltip al pasar el mouse sobre el link.
   *
   * Deberá ser un string en formato HTML.
   */
  content?: string;
}

export const headerLinks: HeaderLink[] = [
  {
    title: "Modelo",
    href: "/",
  },
  {
    title: "Notebook",
    href: "/notebook",
    content: tocContent,
  },
];
