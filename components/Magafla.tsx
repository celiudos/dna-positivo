import {
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import Link from "next/link";

import { IPostYoutube } from "@typesApp/IPost";

export default function Magafla({
  resultCerteza,
}: {
  resultCerteza: IPostYoutube[];
}) {
  const postComDadosYoutube: IPostYoutube | null =
    resultCerteza.length > 0 ? resultCerteza[0] : null;

  return (
    <section>
      {postComDadosYoutube && (
        <Box pt={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {postComDadosYoutube.title}
              </Typography>
              <Link href={postComDadosYoutube.youtubeUrl} passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <Image
                    src={postComDadosYoutube.youtubeImg}
                    alt={postComDadosYoutube.title}
                    width={600}
                    height={400}
                  />
                </a>
              </Link>
            </CardContent>
          </Card>
        </Box>
      )}
    </section>
  );
}
