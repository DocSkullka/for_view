import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { WalletInfoRemote } from "@tonconnect/sdk";
import QRCode from 'react-qr-code';
import { connector } from "../../../../../connector";
import { useWallet } from "../../../../../components/hooks/useWallet";

export const QRCodeModal: FunctionComponent<{ isOpen: boolean; onClose: () => void, walletInfo: WalletInfoRemote | null }> = ({ isOpen, onClose, walletInfo }) => {
    const [walletConnectionURL, setWalletConnectionURL] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (walletInfo) {
            setWalletConnectionURL(connector.connect({ bridgeUrl: walletInfo.bridgeUrl, universalLink: walletInfo.universalLink }));
        }
    }, [walletInfo]);

    const wallet = useWallet();

    useEffect(() => {
        if (isOpen && wallet) {
            onClose();
        }
    }, [isOpen, wallet, onClose]);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
            buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const handleClickInside = (event: MouseEvent) => {
        if (
            qrRef.current && qrRef.current.contains(event.target as Node) ||
            headerRef.current && headerRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('mousedown', handleClickInside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickInside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickInside);
        };
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent ref={modalRef} p="20">
                <ModalHeader ref={headerRef} textAlign="center">Connect to {walletInfo?.name}</ModalHeader>
                <ModalBody display="flex" flexDirection="column" alignItems="center" p="10" >
                    {showQRCode && (
                        <div ref={qrRef}>
                            <QRCode value={walletConnectionURL} />
                        </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Button 
                            ref={buttonRef} 
                            onClick={() => window.open(walletConnectionURL, '_blank')} 
                            w="45%" 
                            my="15"
                        >
                            Open {walletInfo?.name}
                        </Button>
                        <Button 
                            onClick={() => setShowQRCode(!showQRCode)} 
                            w="45%" 
                            my="15"
                        >
                            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};