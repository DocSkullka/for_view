import { useEffect, useState } from 'react';
import { Box, Typography } from '@ui';
import { PageHeader } from '@/components/pageHeader/Header';

import styled from 'styled-components';
import { BorderPaper } from '@/components/borderPaper';
import { DropdownNetwork } from '@/components/dropdown/Dropdown';
import { QRCodeComponent } from '@/components/QR/QRCode';
import { ContentWrapperScrollable } from '@/components/ContentWrapperScrollable/ContentWrapperScrollable';
import { copyClipboard } from '@/utils/helpres';
import { shortWallet } from '@/utils/format';
import { networks } from '@/pages/Wallet/networks';
import { useParams } from 'react-router-dom';
import { useSnackbar } from '@/services/contexts/notistack';

const Wrapper = styled.div`
  padding: 8px 15px;
`;

export const WalletDeposit = () => {
  const { network_id } = useParams();
  const { showInfo } = useSnackbar();

  const [network, setNetwork] = useState(() => networks[0]);
  const [, setOpenDropdown] = useState(false);
  const [, setHeight] = useState(0);

  const wallet = 'dlaksdklj53lkn5dsjh432';

  useEffect(() => {
    if (network_id) {
      const curNetwork = networks.find((net) => net.networkId === network_id?.toLowerCase());

      if (curNetwork) {
        setNetwork(curNetwork);
      }
    }
  }, [network_id]);

  const handleCopy = (value) => {
    copyClipboard(value);
    showInfo('Copied');
  };

  return (
    <Wrapper>
      <PageHeader />
      <ContentWrapperScrollable>
        <Box width='100%' m='24px auto 48px auto'>
          <DropdownNetwork
            subTitle={''}
            onOpen={setOpenDropdown}
            onHeight={setHeight}
            setValue={(value) => setNetwork(value)}
            items={networks}
            currentValue={network}
          />
        </Box>
        <QRCodeComponent value={wallet} width='60%' />
        <Typography m='12px 0 40px 0' ta='center' variant='medium'>
          {shortWallet(wallet?.toUpperCase(), 10, wallet.length - 4)}
        </Typography>
        <Typography m='0 0 0 0' ta='center' variant='medium'>
          {`YOUR ${network.title} ADDRESS`}
        </Typography>
        <Typography width='80%' colorName='gray' m='8px auto 59px auto' ta='center' variant='small'>
          Use this address to recieve tokens  and collectibles on Solana
        </Typography>

        <Box p='0 0 30px 0' onClick={() => handleCopy(wallet)}>
          <BorderPaper>
            <Box height='57px' justifyContent='center'>
              <Typography ta='center' variant='huge'>
                COPY
              </Typography>
            </Box>
          </BorderPaper>
        </Box>
      </ContentWrapperScrollable>
    </Wrapper>
  );
};
