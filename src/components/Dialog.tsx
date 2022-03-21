import {
  Box,
  Dialog as MuiDialog,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const styles = {
  root: {
    fontSize: 16,
    margin: 0,
    padding: "12px",
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    mt: 1,
  },
  closeButton: {
    position: "absolute",
    right: 6,
    top: 6,
  },
};

const Dialog: React.FC<{
  open: boolean;
  title: string;
  onClose?: VoidFunction;
}> = ({ open, title, children, onClose }) => {
  return (
    <MuiDialog fullWidth open={open} onClose={onClose} maxWidth="xs">
      <Box sx={styles.root}>
        <Typography variant="h5" sx={styles.title}>
          {title}
        </Typography>
        {onClose ? (
          <IconButton sx={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      {children}
    </MuiDialog>
  );
};

export default Dialog;
