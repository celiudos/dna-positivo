interface IArquivo {
  titulo?: string;
  nome?: string;
  dir: string;
}

interface TArquivoParams {
  arquivo?: IArquivo;
  arquivos?: IArquivo[];
  conteudo?: {}[];
  formatarConteudo?: boolean;
  atualizarArquivoMeta?: boolean;
  criarSomenteSeTiverDado?: boolean;
  encoding?: BufferEncoding;
  mergeById?: boolean;
}

export default IArquivo;
export type { TArquivoParams };
