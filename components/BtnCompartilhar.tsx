import styled from "@emotion/styled";
import { Button, Container } from "@mui/material";
import * as React from "react";
import outlineShare from "@iconify/icons-ic/outline-share";
import { Icon } from "@iconify/react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function BtnCompartilhar({ children, ...props }: Props) {
  return (
    <Button
      variant="outlined"
      endIcon={<Icon icon={outlineShare} />}
      {...props}
    >
      {children}
    </Button>
  );
}
