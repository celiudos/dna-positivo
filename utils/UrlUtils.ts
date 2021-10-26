import ILinks from "@iadou/types/ILinks";
import { ISancoes } from "@iadou/types/IPost";

type getUrlSansaoProps = {
  arquivo: ISancoes["arquivo"];
  links: ILinks;
  cnpj?: string;
  numero_convenio?: string;
};

export default class UrlUtils {
  static getUrlComParams = ({ urlBase = "", params = {} }) => {
    const urlObj = new URL(urlBase);
    urlObj.search = new URLSearchParams(params).toString();
    return urlObj;
  };

  static getUrlSansao = ({
    arquivo,
    cnpj,
    numero_convenio,
    links,
  }: getUrlSansaoProps) => {
    let url = "";
    if (arquivo === "relatorio_inabilitado") url = `${links.tcu.inabilitados}`;
    if (arquivo === "relatorio_inidoneo") url = `${links.tcu.inidoneos}`;
    if (arquivo === "sancoes_cgu") url = `${links.cgu.ceis}?cpfCnpj=${cnpj}`;
    if (arquivo === "empresas_punidas")
      url = `${links.cgu.cnep}?cpfCnpj=${cnpj}`;
    if (arquivo === "ent_priv_sem_fim_lucr_impedida")
      url = `${links.cgu.cepim_convenio}/${numero_convenio}`;
    if (arquivo === "acordos")
      url = `${links.cgu.acordos_leniencia}?cnpj=${cnpj}`;

    return url;
  };
}
