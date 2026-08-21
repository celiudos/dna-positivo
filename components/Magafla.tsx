import outlineOpenInNew from "@iconify/icons-ic/outline-open-in-new";
import { Icon } from "@iconify/react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { IPostYoutube } from "@typesApp/IPost";
import Image from "next/image";
import Link from "next/link";

export default function Magafla({
  resultCerteza,
}: {
  resultCerteza: IPostYoutube[];
}) {
  const postComDadosYoutube: IPostYoutube | null =
    resultCerteza.length > 0 ? resultCerteza[0] : null;

  if (!postComDadosYoutube) return null;

  return (
    <Box component="section" sx={{ pt: 2 }}>
      <Card
        component={Link}
        href={postComDadosYoutube.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: "block", textDecoration: "none", overflow: "hidden" }}
      >
        <Box sx={{ position: "relative", lineHeight: 0 }}>
          <Image
            src={postComDadosYoutube.youtubeImg}
            alt={postComDadosYoutube.title}
            width={600}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <CardContent>
          <Typography
            variant="overline"
            component="p"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Icon icon={outlineOpenInNew} width={14} height={14} />
            Assistir no YouTube
          </Typography>
          <Typography variant="subtitle1" component="h3" sx={{ mt: 0.5 }}>
            {postComDadosYoutube.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
