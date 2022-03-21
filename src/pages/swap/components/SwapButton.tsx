import { CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import WalletSelector from "../../../components/WalletSelector";
import { useConnectWallet } from "../../../layout/ConnectWallet";

const SwapButton: React.FC<{
  onSwap: VoidFunction;
  loading: boolean;
  text: string;
  error?: string;
}> = ({ onSwap, error, loading, text }) => {
  const [open, setOpen] = useState(false);
  const { account, active } = useConnectWallet();

  useEffect(() => {
    if (active) {
      setOpen(false);
    }
  }, [active]);

  if (account && active) {
    if (error) {
      return (
        <Button disabled fullWidth sx={{ mt: 2, transition: "none" }}>
          {error}
        </Button>
      );
    }
    return (
      <Button
        gradient
        fullWidth
        sx={{ mt: 2, pointerEvents: loading ? "none" : "auto" }}
        onClick={onSwap}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {loading && <CircularProgress size="16px" />}
          <span>{text}</span>
        </Stack>
      </Button>
    );
  }

  return (
    <>
      <WalletSelector open={open} onClose={() => setOpen(false)} />
      <Button gradient fullWidth sx={{ mt: 2 }} onClick={() => setOpen(true)}>
        连接钱包
      </Button>
    </>
  );
};
export default SwapButton;
