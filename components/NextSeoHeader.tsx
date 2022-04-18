import { NextSeo } from "next-seo";
import configApp from "../configApp";

type Props = {
  title?: string;
  description?: string;
  urlImg?: string;
};

export default function NextSeoHeader({
  title,
  description,
  urlImg,
}: Props): JSX.Element {
  const titleFinal = title
    ? `${title} - ${configApp.titulo}`
    : configApp.titulo;
  const descriptionFinal = description ? description : configApp.subtitulo;
  const urlImgFinal = urlImg ? urlImg : `${configApp.url}/img/logo-180x180.jpg`;

  return (
    <>
      <NextSeo
        title={titleFinal}
        description={descriptionFinal}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
          {
            rel: "icon",
            sizes: "32x32",
            href: "/favicon/favicon-32x32.png",
          },
          {
            rel: "icon",
            sizes: "16x16",
            href: "/favicon/favicon-16x16.png",
          },
        ]}
        openGraph={{
          type: "website",
          url: configApp.url,
          title: titleFinal,
          description: descriptionFinal,
          images: [
            {
              url: urlImgFinal,
              width: 180,
              height: 180,
              alt: titleFinal,
            },
          ],
        }}
      />
    </>
  );
}
