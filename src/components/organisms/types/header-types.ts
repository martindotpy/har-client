export interface HeaderLink {
  title: string;
  href: string;
  /**
   * Este contenido se mostrará en el tooltip al pasar el mouse sobre el link.
   *
   * Deberá ser un string en formato HTML.
   */
  content?: string;
}