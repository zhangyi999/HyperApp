import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

const FormSwitch: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <div>
      <FormControlLabel
        sx={{ ml: 0 }}
        control={
          <Switch
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        }
        label={label}
        labelPlacement="end"
      />
    </div>
  );
};
export default FormSwitch;
