import { Box, useDisclosure, Flex } from "@chakra-ui/react";
import { Header } from "./components/Header";
import { ConnectWalletModal } from "./components/ConnectWalletModal";
import { useEffect, useMemo, useState } from "react";
import { isWalletInfoCurrentlyEmbedded, WalletInfo } from "@tonconnect/sdk";
import { connector } from "../../../../connector";

export function Wallet() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);

  useEffect(() => {
    connector.getWallets().then(setWalletsList);
  }, []);

  const embeddedWallet = useMemo(() => walletsList && walletsList.find(isWalletInfoCurrentlyEmbedded), [walletsList]);

  const onConnectClick = () => {
    if (embeddedWallet) {
      connector.connect({ jsBridgeKey: embeddedWallet.jsBridgeKey });
    }
    onOpen();
  }

  return (
      <Box p="4">
        <Flex align="center" justify="start">
          <Header onConnect={onConnectClick} />
        </Flex>
        <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </Box>
  );
}
