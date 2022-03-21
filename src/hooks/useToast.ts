import { VariantType, useSnackbar } from "notistack";
import { useCallback } from "react";
function useToast() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, { variant });
    },
    [enqueueSnackbar]
  );

  return {
    success: (msg: string) => handleClickVariant(msg, "success"),
    error: (msg: string) => handleClickVariant(msg, "error"),
    info: (msg: string) => handleClickVariant(msg, "info"),
    warning: (msg: string) => handleClickVariant(msg, "warning"),
    default: (msg: string) => handleClickVariant(msg, "default"),
  };
}

export default useToast;
