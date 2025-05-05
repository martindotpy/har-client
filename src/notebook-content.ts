import { notebookApi } from "@/api";
import marked from "@/lib/marked";

// Markdown
export const notebookMarkdown = (await notebookApi.getNotebookFile({
  params: {
    file_path: "har_clustering.md",
  },
})) as string;

export const notebookMarkdownTokens = marked.lexer(notebookMarkdown);
