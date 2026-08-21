import { theme } from "@theme/ThemeConfig";

/**
 * Reexporta a instância única do tema do app.
 * Serve para os poucos pontos que precisam das cores fora da árvore React
 * (ex.: estilos inline do react-highlight-words).
 */
export default theme;
