import { Box } from "@mui/material";
import React from "react";
import FormItem from "../../../components/FormItem";

const FormInput: React.FC<{
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}> = ({ value, onChange, label, inputProps }) => {
  return (
    <FormItem label={label} sx={{ mt: 1 }}>
      <Box
        sx={{
          padding: "8px 14px",
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
    </FormItem>
  );
};
export default FormInput;
