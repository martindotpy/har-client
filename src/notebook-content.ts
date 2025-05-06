import { notebookApi } from "@/api";
import marked from "@/lib/marked";
import { generateSlug } from "@/lib/slug";
import type { Tokens } from "marked";

// Markdown
export const notebookMarkdown = (await notebookApi.getNotebookFile({
  params: {
    file_path: "har_clustering.md",
  },
})) as string;

export const notebookMarkdownTokens = marked.lexer(notebookMarkdown);
export const notebookToc = notebookMarkdownTokens
  .filter(
    (token): token is Tokens.Heading =>
      token.type === "heading" && token.depth >= 2,
  )
  .map((token) => ({
    label: token.text,
    href: `/notebook#${generateSlug(token.text)}`,
    depth: token.depth,
  }));
