import { SxProps, Theme } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

import React from "react";
import { useMemo } from "react";

type RoundType = "xs" | "sm" | "md" | "lg" | "full";
type ButtonProps = {
  rounded?: RoundType;
  gradient?: boolean;
} & MuiButtonProps;

const roundedMap: Record<RoundType, string> = {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  full: "999px",
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "contained",
    gradient = false,
    rounded = "full",
    disableElevation = true,
    sx,
    ...reset
  } = props;

  const SX: SxProps<Theme> | undefined = useMemo(() => {
    let _sx: SxProps = {
      borderRadius: roundedMap[rounded],
    };
    if (gradient) {
      _sx.backgroundImage = `linear-gradient(90deg,#4927d4,#9916b6)`;
      _sx.color = "white";
    }
    return {
      ..._sx,
      ...sx,
    };
  }, [gradient, rounded, sx]);

  return (
    <MuiButton
      variant={variant}
      disableElevation={disableElevation}
      {...reset}
      sx={SX}
    >
      {children}
    </MuiButton>
  );
};
export default Button;
