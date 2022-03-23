import { VariantType, useSnackbar, OptionsObject } from "notistack";
import { useCallback } from "react";
function useToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickVariant = useCallback(
    (message: string, variant: VariantType, options?: OptionsObject) => {
      return enqueueSnackbar(message, { variant, ...options });
    },
    [enqueueSnackbar]
  );

  return {
    success: (msg: string, options?: OptionsObject) =>
      handleClickVariant(msg, "success", options),
    error: (msg: string, options?: OptionsObject) =>
      handleClickVariant(msg, "error", options),
    info: (msg: string, options?: OptionsObject) =>
      handleClickVariant(msg, "info", options),
    warning: (msg: string, options?: OptionsObject) =>
      handleClickVariant(msg, "warning", options),
    default: (msg: string, options?: OptionsObject) =>
      handleClickVariant(msg, "default", options),
    close: closeSnackbar,
    show: enqueueSnackbar,
  };
}

export default useToast;
