import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import Button from "../components/Button";
import WalletSelector from "../components/WalletSelector";

export function useConnectWallet() {
  const context = useWeb3React<Web3Provider>();
  return context;
}

const ConnectWallet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { account, active } = useConnectWallet();

  useEffect(() => {
    if (active) {
      setOpen(false);
    }
  }, [active]);

  if (account && active) {
    return <HashAddress>{account}</HashAddress>;
  }

  return (
    <>
      <WalletSelector open={open} onClose={() => setOpen(false)} />
      <Button variant="outlined" onClick={() => setOpen(true)}>
        连接钱包
      </Button>
    </>
  );
};
export default ConnectWallet;

function HashAddress(props: { children: string }) {
  const { children } = props;
  const short = useMemo(() => {
    if (children) {
      return children.slice(0, 5) + "..." + children.slice(children.length - 5);
    }
    return undefined;
  }, [children]);
  return (
    <Button
      variant="text"
      sx={{
        backgroundColor: "rgba(37,9,70,.38)",
        px: 2,
        fontSize: "12px",
        fontFamily: `Montserrat,sans-serif`,
      }}
    >
      {short}
    </Button>
  );
}
