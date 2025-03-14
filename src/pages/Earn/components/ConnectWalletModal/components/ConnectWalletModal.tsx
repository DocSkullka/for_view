import { FunctionComponent, useEffect, useState } from "react";
import {
    Button,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Box,
} from "@chakra-ui/react";
import { isWalletInfoCurrentlyInjected, isWalletInfoRemote, WalletInfo, WalletInfoRemote } from "@tonconnect/sdk";
import { connector } from "../../../../../connector";
import { QRCodeModal } from "./QRCodeModal";
import { useWallet } from "../../../../../components/hooks/useWallet";

export const ConnectWalletModal: FunctionComponent<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [walletsList, setWalletsList] = useState<WalletInfo[] | null>(null);
    const [selectedWalletInfo, setSelectedWalletInfo] = useState<WalletInfoRemote | null>(null);
    const [isQRCodeModalOpen, setQRCodeModalOpen] = useState(false); // Состояние для отслеживания открытия QR-кода
    const wallet = useWallet();

    useEffect(() => {
        if (isOpen && wallet) {
            onClose();
        }
    }, [isOpen, wallet, onClose]);

    useEffect(() => {
        connector.getWallets().then(setWalletsList);
    }, []);

    useEffect(() => {
        if (selectedWalletInfo) {
            setQRCodeModalOpen(true);
        } else {
            setQRCodeModalOpen(false);
        }
    }, [selectedWalletInfo]);

    const onWalletClick = (walletInfo: WalletInfo) => {
        if (isWalletInfoRemote(walletInfo)) {
            return setSelectedWalletInfo(walletInfo);
        }

        if (isWalletInfoCurrentlyInjected(walletInfo)) {
            return connector.connect({ jsBridgeKey: walletInfo.jsBridgeKey });
        }

        window.open(walletInfo.aboutUrl, '_blank');
    }

    return (
        <>
            <Modal 
                isOpen={isOpen} 
                onClose={onClose} 
                size="lg" 
                isCentered
                closeOnOverlayClick
            >
                <ModalOverlay 
                    bg="rgba(0, 0, 0, 0.9)" 
                    onClick={onClose}
                />
                <ModalContent 
    bg="gray.900" 
    borderRadius="md" 
    p="20" 
    maxW="md" 
    mx="auto" 
    display="flex" 
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="300px" 
    maxHeight="90vh"
>
    {!isQRCodeModalOpen && (
        <ModalHeader color="white" fontSize="2xl" textAlign="center">Choose a Wallet</ModalHeader>
    )}
    <ModalBody 
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflowY="auto" 
    >
        {!!walletsList && !isQRCodeModalOpen && (
            <Box 
                border="1px solid white" 
                borderRadius="md" 
                p="4" 
                overflow="auto" 
                width="full"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Flex 
                    wrap="wrap" 
                    gap="4" 
                    justify="center"
                    width="full"
                    flexDirection="row"
                >
                    {walletsList.map(walletInfo => (
                        <Button
                            key={walletInfo.name}
                            onClick={() => onWalletClick(walletInfo)}
                            leftIcon={<Image w="40px" h="40px" src={walletInfo.imageUrl} />}
                            variant="outline"
                            color="white"
                            borderColor="white"
                            _hover={{ bg: 'whiteAlpha.200' }}
                            _active={{ bg: 'whiteAlpha.300' }}
                            borderRadius="md"
                            w="auto"
                            minW="150px"
                            textAlign="left"
                        >
                            {walletInfo.name}
                        </Button>
                    ))}
                </Flex>
            </Box>
        )}
    </ModalBody>
</ModalContent>
            </Modal>
            <QRCodeModal
                isOpen={isQRCodeModalOpen}
                onClose={() => {
                    setSelectedWalletInfo(null);
                    setQRCodeModalOpen(false);
                }}
                walletInfo={selectedWalletInfo}
            />
        </>
    );
}
