import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Spinner, useClipboard } from "@chakra-ui/react";
import { useWallet } from "../../../../../components/hooks/useWallet";
import { connector } from "../../../../../connector";
import { CHAIN, toUserFriendlyAddress } from "@tonconnect/sdk";
import { useIsConnectionRestored } from "../../../../../components/hooks/useIsConnectionRestored";

export const Header = ({ onConnect }: { onConnect: () => void }) => {
    const isConnectionRestored = useIsConnectionRestored();
    const wallet = useWallet();
    const userFriendlyAddress = wallet ? toUserFriendlyAddress(wallet.account.address, wallet.account.chain === CHAIN.TESTNET) : '';
    const slicedUserFriendlyAddress = userFriendlyAddress.slice(0, 4) + '…' + userFriendlyAddress.slice(-4);

    const { onCopy, hasCopied } = useClipboard(userFriendlyAddress);

    return (
        <Box as="header" display="flex" background="gray.800" p="4" borderRadius="md" color="white">
            {wallet ? (
                <Menu>
                    <MenuButton 
                        as={Button} 
                        variant="ghost" 
                        color="white" 
                        fontSize="24px"
                        p="6"
                        borderRadius="10px"
                        _hover={{ bg: 'transparent', cursor: 'pointer' }}  
                        _active={{ bg: 'transparent' }}
                        marginLeft='10px'
                    >
                        {slicedUserFriendlyAddress}
                    </MenuButton>
                    <MenuList>
                        <MenuItem closeOnSelect={false} onClick={onCopy}>
                            {hasCopied ? 'Copied!' : 'Copy Address'}
                        </MenuItem>
                        <MenuItem onClick={() => connector.disconnect()}>Disconnect</MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <Button 
                    w="200px"
                    h="50px"
                    onClick={onConnect} 
                    variant="ghost" 
                    color="white" 
                    fontSize="24px"
                    p="6"
                    borderRadius="10px"
                    _hover={{ bg: 'transparent', cursor: 'pointer' }} 
                    _active={{ bg: 'transparent' }}
                    marginLeft='10px'
                >
                    {isConnectionRestored ? 'Connect Wallet' : <Spinner />}
                </Button>
            )}
        </Box>
    );
};
