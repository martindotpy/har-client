import type { HeaderLink } from "@/components/organisms/types/header-types";
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
