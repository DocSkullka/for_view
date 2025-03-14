import React, { useEffect, useState } from 'react';
import { Box, Row, Typography } from '@ui';
import { PageHeader } from '@/components/pageHeader/Header';

import styled from 'styled-components';
import { BorderPaper } from '@/components/borderPaper';
import { ContentWrapperScrollable } from '@/components/ContentWrapperScrollable/ContentWrapperScrollable';
import { useParams } from 'react-router-dom';
import { networks } from '@/pages/Wallet/networks';
import { Input } from '@/components/input/Input';
import { COINS } from '@/constants/coins';
import BackArrow from '@/assets/arrowDown.svg?react';
import { TokensDropdownBottom } from '@/components/tokensDropdown/TokensDropdownBottom';
import { useSnackbar } from '@/services/contexts/notistack';
import { useNavigate } from 'react-router-dom';
import { WALLET_COIN_PATH } from '@/navigation/navigation_routes';

const Wrapper = styled.div`
  padding: 8px 15px;
  position: relative;
`;

const Icon = (icon) => styled(icon)`
  width: 56px;
  height: 56px;
`;

const Field = styled.div`
  box-sizing: border-box;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  padding: 12px;
  &:last-child {
    border: none;
  }
`;

const ConfirmWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 8px;
`;

const ResizeIcon = (icon) => styled(icon)`
  width: 20px;
  height: 20px;
`;

const TokenButton = ({ nameToken, Icon, onClick }) => {
  const ResizedIcon = Icon && ResizeIcon(Icon);
  return (
    <Box width='100px' onClick={onClick}>
      <BorderPaper>
        <Row alignItems='center' height='39px' justifyContent='center'>
          {ResizedIcon && <ResizedIcon />}
          <Typography variant='small' m='0 8px 0 8px'>
            {nameToken}
          </Typography>
          <BackArrow />
        </Row>
      </BorderPaper>
    </Box>
  );
};

const Confirm: React.FC<any> = ({ network, data, onConfirm }) => {
  const IconComponent = Icon(network.Icon);

  return (
    <ConfirmWrapper>
      <Row m='27px 0 27px 0'>
        <IconComponent />
        <Box m='0 0 0 58px'>
          <Typography variant='medium'>{`${network.title.toUpperCase()} TRANSFER`}</Typography>
          <Typography m='8px 0 0 0' variant='small' colorName='gray'>
            CONFIRM ACTION
          </Typography>
        </Box>
      </Row>
      <BorderPaper>
        <Box>
          <Field>
            <Box>
              <Typography variant='small' colorName='gray'>
                RECIPEINT
              </Typography>
              <Typography variant='small'>{data.address}</Typography>
            </Box>
          </Field>
          <Field>
            <Box>
              <Row widt='100%' justifyContent='space-between'>
                <Typography variant='small' colorName='gray'>
                  AMOUNT
                </Typography>
                <Typography variant='small'>{`${data?.amount} ${data?.token?.currencyName}`}</Typography>
              </Row>

              <Row width='100%'>
                <Typography width='100%' ta='right' variant='small' colorName='gray'>
                  $ 6.92
                </Typography>
              </Row>
            </Box>
          </Field>
          <Field>
            <Box>
              <Row widt='100%' justifyContent='space-between'>
                <Typography variant='small' colorName='gray'>
                  FEE
                </Typography>
                <Typography variant='small'>{`~ 0.003676229 TON`}</Typography>
              </Row>

              <Row width='100%'>
                <Typography width='100%' ta='right' variant='small' colorName='gray'>
                  ~ $ 6.92
                </Typography>
              </Row>
            </Box>
          </Field>
          <Field>
            <Box>
              <Row widt='100%' justifyContent='space-between'>
                <Typography variant='small' colorName='gray'>
                  COMMENT
                </Typography>
                <Typography variant='small'>{data?.comment}</Typography>
              </Row>
            </Box>
          </Field>
        </Box>
      </BorderPaper>
      <ButtonWrapper>
        <Box p='0 0 0px 0' onClick={() => onConfirm && onConfirm()}>
          <BorderPaper>
            <Box height='57px' justifyContent='center'>
              <Typography ta='center' variant='huge'>
                CONFIRM AND SEND
              </Typography>
            </Box>
          </BorderPaper>
        </Box>
      </ButtonWrapper>
    </ConfirmWrapper>
  );
};

const Send: React.FC<any> = ({ data, setData, setOpen, onContinue }) => {
  return (
    <ConfirmWrapper>
      <Box m='20px 0 0 0'>
        <Input
          placeholder='ADDRESS'
          value={data.address}
          onChange={(val) => setData('address', val)}
        />
      </Box>

      <Box m='12px 0 12px 0'>
        <Input
          type='number'
          ActionButtonComponent={
            <TokenButton
              onClick={() => setOpen && setOpen(true)}
              nameToken={data?.token?.currencyName}
              Icon={data?.token?.Icon}
            />
          }
          actionButton={() => setOpen(true)}
          placeholder='AMOUNT'
          value={data.amount}
          onChange={(val) => setData('amount', val)}
        />
      </Box>
      <Box m='12px 0 12px 0'>
        <Input
          placeholder='COMMENT'
          value={data.comment}
          onChange={(val) => setData('comment', val)}
        />
      </Box>
      <Box p='0 0 0px 0' onClick={() => onContinue && onContinue()}>
        <BorderPaper>
          <Box height='57px' justifyContent='center'>
            <Typography ta='center' variant='huge'>
              CONTINUE
            </Typography>
          </Box>
        </BorderPaper>
      </Box>
    </ConfirmWrapper>
  );
};

export const WalletWithdraw = () => {
  const { network_id, coin_id } = useParams();
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({ amount: '0' });
  const { showError, showSuccess } = useSnackbar();
  const network = networks.find((el) => el?.networkId === network_id?.toLowerCase());
  const navigate = useNavigate();

  
  const handleChangeData = (name, value) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  useEffect(() => {
    if (network_id) {
      const token = COINS.find((coin) => coin.network?.toLowerCase() === network_id?.toLowerCase());

      if (token) {
        handleChangeData('token', token);
      }
    }
  }, [network_id]);

  const handleSend = () => {
    showSuccess('Transaction has been sent');
    navigate(WALLET_COIN_PATH(coin_id));
  };

  const handleValidateForm = (cb) => {
    let error: string | null = null;
    if (!data.address && !error) {
      error = 'The address field must be filled in.';
    }

    if ((data?.amount === '0' || !data.amount) && !error) {
      error = 'The amount field must be filled in';
    }

    if (!data.comment && !error) {
      error = 'The comment field must be filled in';
    }

    if (error) {
      showError(error);
    }

    if (!error && cb) {
      cb();
    }
  };

  return (
    <Wrapper>
      <PageHeader
        cb={confirm ? () => setConfirm(false) : null}
        centerContent={!confirm && <Typography variant='medium'>SEND</Typography>}
        rightContent={!confirm && <div></div>}
      />

      <ContentWrapperScrollable>
        {confirm ? (
          <Confirm network={network} data={data} onConfirm={handleSend} />
        ) : (
          <Box height='100%'>
            <Send
              network={network}
              setOpen={setOpen}
              onContinue={() => handleValidateForm(() => setConfirm(true))}
              data={data}
              setData={handleChangeData}
            />
          </Box>
        )}
      </ContentWrapperScrollable>
      <TokensDropdownBottom
        coins={COINS}
        open={open}
        setOpen={setOpen}
        activeTokenId={data?.token?.coinId}
        onChange={(val) => handleChangeData('token', val)}
      />
    </Wrapper>
  );
};
