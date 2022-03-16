import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";
import { useCallback } from "react";

const styles = (theme) => ({
  root: {
    fontSize: 16,
    margin: 0,
    padding: "12px",
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    marginTop: 6,
  },
  closeButton: {
    position: "absolute",
    right: 6,
    top: 6,
  },
});

const DialogTitleWithClose = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" className={classes.title}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

function TokenSelectDialog({ open, onClose, defaultToken, onTokenChange }) {
  const handleSelectToken = useCallback(
    (token) => {
      onTokenChange && onTokenChange(token);
      onClose && onClose();
    },
    [onClose, onTokenChange]
  );
  return (
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="xs">
      <DialogTitleWithClose onClose={onClose}>
        Select a Token
      </DialogTitleWithClose>
      <DialogContent
        style={{
          padding: 16,
        }}
      >
        <SearchInput />
        {/* Hot Tags */}
      </DialogContent>
      <Divider />
      <Box>
        <TokenList onChange={handleSelectToken} />
      </Box>
    </Dialog>
  );
}

export default TokenSelectDialog;

const useSearchInputStype = makeStyles({
  root: {
    fontSize: 16,
  },
  input: {
    padding: 12,
  },
});

function SearchInput() {
  const classes = useSearchInputStype();
  return (
    <OutlinedInput
      fullWidth
      placeholder="search name or paste addrtess"
      className={classes.root}
      classes={{
        input: classes.input,
      }}
    />
  );
}

const useListStyle = makeStyles({
  root: {
    maxHeight: "60vh",
    overflow: "scroll",
  },
  item: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  primary: {
    fontSize: 18,
    lineHeight: "24px",
  },
  secondary: {
    fontSize: 14,
    lineHeight: "18px",
  },
});

const data = [
  ["ETH", "Ether"],
  ["AMP", "Amp"],
  ["BTC", "Bitcoin"],
  ["TOKEN1", "Token 1"],
  ["TOKEN2", "Token 2"],
  ["TOKEN3", "Token 3"],
  ["TOKEN4", "Token 4"],
  ["TOKEN5", "Token 5"],
  ["TOKEN6", "Token 6"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
  ["TOKEN7", "Token 7"],
];
function TokenList({ onChange }) {
  const classes = useListStyle();
  return (
    <List className={classes.root}>
      {data.map((item, index) => {
        return (
          <ListItem
            className={classes.item}
            key={index}
            button
            onClick={() => {
              onChange(item);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              classes={{
                primary: classes.primary,
                secondary: classes.secondary,
              }}
              primary={item[0]}
              secondary={item[1]}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
