import outlineShare from "@iconify/icons-ic/outline-share";
import { Icon } from "@iconify/react";
import { Button, ButtonProps } from "@mui/material";
import * as React from "react";

type Props = ButtonProps & {
  children: React.ReactNode;
};

export default function BtnCompartilhar({ children, ...props }: Props) {
  return (
    <Button
      variant="outlined"
      endIcon={<Icon icon={outlineShare} width={18} height={18} />}
      {...props}
    >
      {children}
    </Button>
  );
}
