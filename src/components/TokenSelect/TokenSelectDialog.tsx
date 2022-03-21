import Dialog from "../Dialog";
import { useCallback } from "react";
import TokenData, { Token } from "../../data/token";
import {
  Avatar,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";

const TokenSelectDialog: React.FC<{
  open: boolean;
  tokens?: Token[];
  onClose: VoidFunction;
  disabledTokens?: Token[];
  onTokenChange: (token: Token) => void;
}> = ({ open, onClose,tokens = TokenData, disabledTokens, onTokenChange }) => {
  const handleSelectToken = useCallback(
    (token) => {
      onTokenChange && onTokenChange(token);
      onClose && onClose();
    },
    [onClose, onTokenChange]
  );
  return (
    <Dialog title="Select a Token" open={open} onClose={onClose}>
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
        <List
          sx={{
            maxHeight: "60vh",
            overflow: "scroll",
          }}
        >
          {tokens.map((item, index) => {
            const disabled = disabledTokens?.includes(item);
            return (
              <ListItem
                sx={{
                  py: "3px",

                  "& .MuiListItemText-secondary": {
                    fontSize: "0.75rem",
                  },
                }}
                disabled={disabled}
                key={index}
                button
                onClick={() => {
                  handleSelectToken(item);
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.icon}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.fullName} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Dialog>
  );
};

export default TokenSelectDialog;

function SearchInput() {
  return (
    <OutlinedInput
      fullWidth
      placeholder="search name or paste addrtess"
      sx={{
        fontSize: "16px",
      }}
    />
  );
}
