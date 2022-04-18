import { TArquivoParams } from "@typesApp/IArquivo";
import fs from "fs";
import lodash from "lodash";

export default class FilesUtils {
  static criarArquivo({
    conteudo,
    arquivo,
    formatarConteudo = true,
    criarSomenteSeTiverDado = true,
  }: TArquivoParams): Promise<TArquivoParams> {
    return new Promise(async (resolve, reject) => {
      if (criarSomenteSeTiverDado && !conteudo?.length) {
        reject(`Arquivo não possui dados para poder ser criado`);
        return;
      }

      try {
        await FilesUtils.criarArquivoJsonIncrementalmente(
          conteudo || [],
          arquivo?.dir || "",
          formatarConteudo
        );
      } catch (error) {
        reject(`Error criarArquivo: ${error}`);
      }

      resolve({ arquivo, conteudo });
    });
  }

  static async atualizarArquivo({
    conteudo,
    arquivo,
    mergeById = true,
  }: TArquivoParams): Promise<TArquivoParams | null> {
    const conteudoJson = await FilesUtils.lerArquivoJson({
      arquivo: {
        dir: arquivo?.dir || "",
      },
    });

    if (conteudoJson && conteudo) {
      let fileMerged = conteudoJson.concat(conteudo);
      if (mergeById) {
        fileMerged = lodash.uniqBy(fileMerged, "id");
      }

      return FilesUtils.criarArquivo({
        conteudo: fileMerged,
        arquivo: {
          dir: arquivo?.dir || "",
        },
      });
    }

    return null;
  }

  static async criarArquivoJsonIncrementalmente(
    data: {}[],
    outputDir: string,
    formatarConteudo: boolean
  ) {
    return await new Promise(async (resolve, reject) => {
      const ident = formatarConteudo ? 2 : 0;

      let output = fs.createWriteStream(outputDir);

      output.write("[");

      for (let indx = 0; indx < data.length - 1; indx++) {
        try {
          output.write(JSON.stringify(data[indx], null, ident) + ",");
        } catch (error) {
          reject(`error: ${error}, ${data[indx]}`);
          break;
        }
      }
      output.write(JSON.stringify(data[data.length - 1], null, ident) + "]");
      output.end();

      output
        .on("error", function (err) {
          reject(`Error ao escrever JSON via Stream: ${err}`);
        })
        .on("finish", function () {
          resolve("Terminou");
        });
    });
  }

  static async lerArquivoJson({ arquivo }: TArquivoParams): Promise<{}[]> {
    if (!arquivo) {
      console.log(`Não foi passado um arquivo`);
      return [];
    }
    if (!fs.existsSync(arquivo.dir)) {
      console.log(`Este arquivo não existe: ${arquivo.dir}`);
      return [];
    }

    let arquivoLido: any = (await FilesUtils.lerArquivoJsonIncrementalmente(
      arquivo.dir
    )) as {}[];

    let arquivoLidoTransformado = [];
    const objArq = arquivoLido[0];

    for (const key in objArq) {
      if (Object.prototype.hasOwnProperty.call(objArq, key)) {
        const element = objArq[key];
        arquivoLidoTransformado.push(element);
      }
    }

    return arquivoLidoTransformado;
  }

  static async lerArquivoJsonIncrementalmente(inputDir: string) {
    return new Promise(async (resolve, reject) => {
      const json = require("big-json");
      const parseStream = json.createParseStream();

      let input = fs.createReadStream(inputDir, {
        flags: "r",
        encoding: "utf8",
      });

      let jsonCompleto: any = [];

      parseStream
        .on("error", function (err: any) {
          console.log(" Error ao escrever JSON via Stream:", err);
          resolve("Erro");
        })
        .on("data", function (jsonStr: any) {
          jsonCompleto.push(jsonStr);
        })
        .on("end", function () {
          parseStream.destroy();
          resolve(jsonCompleto);
        });

      input.pipe(parseStream);
    });
  }
}
