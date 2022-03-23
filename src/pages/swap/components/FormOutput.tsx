import { Box, CircularProgress } from "@mui/material";
import React from "react";
import FormItem from "../../../components/FormItem";

const FormOutput: React.FC<{
  value?: string;
  label: string;
  loading?: boolean;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}> = ({ value, loading, label, inputProps }) => {
  return (
    <FormItem label={label} sx={{ mt: 1 }}>
      <Box
        sx={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <input
            {...inputProps}
            value={value}
            style={{
              fontSize: 16,
              lineHeight: "24px",
              border: "unset",
              outline: "unset",
              color: "#FFF",
              background: "transparent",
              appearance: "none",
              width: "100%",
              ...inputProps.style,
            }}
          />
        </Box>
        <Box
          sx={{
            width: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading && <CircularProgress size="20px" />}
        </Box>
      </Box>
    </FormItem>
  );
};
export default FormOutput;
