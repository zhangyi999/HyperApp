import { SxProps, Box, Typography } from "@mui/material";

const FormItem: React.FC<{
  label: string;
  sx?: SxProps;
}> = ({ label, children, sx }) => {
  return (
    <Box
      sx={{
        background: "rgba(2,10,26,0.3)",
        borderRadius: "10px",
        position: "relative",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          color: "#bebfc8",
          textAlign: "left",
          display: "inline-block",
          fontWeight: 500,
          lineHeight: "14px",
          px: "14px",
          pt: "12px",
          margin: "unset",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};

export default FormItem;
