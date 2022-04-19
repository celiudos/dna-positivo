// material
import {
  CssBaseline,
  styled,
  ThemeOptions,
  useMediaQuery,
} from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import { DisplayFlexCenter } from "@styles/DisplayFlex";
import Image from "next/image";

// ----------------------------------------------------------------------

type ThemeConfigType = {
  children: JSX.Element | JSX.Element[];
};

//https://bareynol.github.io/mui-theme-creator/

export const themeOptions: ThemeOptions = {
  palette: {
    // mode: "dark",
    primary: {
      main: "#260273",
    },
    // secondary: {
    //   main: "#2ec5d3",
    // },
    background: {
      default: "#192231",
      // paper: "#24344d",
    },
  },
};

// export const themeOptions: ThemeOptions = {
//   palette: {
//       background: {
//         default: "#ddd",
//       },
//   },
// };

export default function ThemeConfig({
  children,
}: ThemeConfigType): JSX.Element {
  const theme = createTheme(themeOptions);
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}

        <ImageContainerCss>
          {matches ? (
            <Image
              className="rotating"
              src="/img/planeta-maior.jpg"
              alt="Planeta terra"
              layout="fill"
              objectFit="contain"
            />
          ) : null}
        </ImageContainerCss>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

const ImageContainerCss = styled(DisplayFlexCenter)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: #000;
`;
