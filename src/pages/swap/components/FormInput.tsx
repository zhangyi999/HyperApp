import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "../../../components/Button";
import FormItem from "../../../components/FormItem";

const FormInput: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  onMaxClick?: VoidFunction;
  balance?: string;
  label: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}> = ({ value, onChange, balance, onMaxClick, label, inputProps }) => {
  return (
    <FormItem label={label} sx={{ mt: 1 }}>
      <Box
        sx={{
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <input
            {...inputProps}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
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
        <Typography variant="caption" sx={{ mx: 1 }}>
          余额:{balance || "0.0"}
        </Typography>
        <Button
          gradient
          size="small"
          onClick={onMaxClick}
          sx={{
            height: "28px",
            lineHeight: "28px",
            fontSize: "0.75rem",
            minWidth: "56px",
          }}
        >
          Max
        </Button>
      </Box>
    </FormItem>
  );
};
export default FormInput;
