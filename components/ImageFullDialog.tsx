import ContainerApp from "@components/ContainerApp";
import baselineArrowBack from "@iconify/icons-ic/baseline-arrow-back";
import { Icon } from "@iconify/react";
import { Dialog, Slide, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import lodash from "lodash";
import Image, { ImageProps } from "next/image";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  title?: string;
  propsImg: ImageProps;
  children: React.ReactNode;
};

export default function ImageFullDialog({
  title = "Imagem",
  propsImg,
  children,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const id = `ImageFullDialog-${lodash.snakeCase(title)}-${lodash.random()}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        id={id}
        size="large"
        aria-label="abrir imagem"
        color="inherit"
        onClick={handleClickOpen}
      >
        {children}
      </IconButton>
      <Dialog
        fullScreen
        TransitionComponent={Transition}
        open={open}
        onClose={handleClose}
      >
        <ContainerApp title="Pesquisar">
          <AppBar position="static" color="transparent">
            <Toolbar>
              <IconButton
                size="large"
                id="btn-header-voltar"
                aria-label="voltar"
                color="inherit"
                onClick={handleClose}
              >
                <Icon icon={baselineArrowBack} />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Image alt={propsImg.alt || "Imagem"} {...propsImg} />
          </main>
        </ContainerApp>
      </Dialog>
    </>
  );
}
