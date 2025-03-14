import React from 'react';
import { Box, Row, Typography } from '@ui';
import { getNetworkIcon, getTokenIcon } from '@/components/Icons/Icons';
import styled from 'styled-components';
import { shortWallet } from '@/utils/format';
import ReceivedIcon from '@/assets/received.svg?react';

const mock = [
  {
    date: 'NOV 26, 2024',
    operations: [
      {
        type: 'received',
        from: 'afklj23kf3klsakld3',
        amount: '0.00001',
        network: 'SOLANA',
        tokenName: 'SOLANA',
      },
      {
        type: 'send',
        from: 'aslfj4ym43gmwg09m2302mf',
        amount: '0.000032',
        tokenName: 'USDT',
        network: 'TRON',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'BNB',
        network: 'BSC',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'USDT',
        network: 'TRON',
      },
    ],
  },
  {
    date: 'NOV 26, 2024',
    operations: [
      {
        type: 'send',
        from: 'afklj23kf3klsakld3',
        amount: '0.00001',
        network: 'SOLANA',
        tokenName: 'SOLANA',
      },
      {
        type: 'send',
        from: 'aslfj4ym43gmwg09m2302mf',
        amount: '0.000032',
        tokenName: 'USDT',
        network: 'TRON',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'BNB',
        network: 'BSC',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'USDT',
        network: 'TON',
      },
    ],
  },
  {
    date: 'NOV 26, 2024',
    operations: [
      {
        type: 'received',
        from: 'afklj23kf3klsakld3',
        amount: '0.00001',
        network: 'SOLANA',
        tokenName: 'SOLANA',
      },
      {
        type: 'send',
        from: 'aslfj4ym43gmwg09m2302mf',
        amount: '0.000032',
        tokenName: 'USDT',
        network: 'TRON',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'BNB',
        network: 'BSC',
      },
      {
        type: 'received',
        from: 'dlsad;l23j523mdaskdj3ad',
        amount: '0.0004',
        tokenName: 'USDT',
        network: 'TON',
      },
    ],
  },
];

const WrapperOperationElement = styled(Row)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.noActiveWhite}`};
`;

const IconWrapper = styled(Box)`
  position: relative;
  height: 40px;
  width: 40px;
`;

const IconNetworkResize = (icon) => styled(icon)`
  width: 16px;
  height: 16px;
  background-color: black;
`;
const IconTokenResize = (icon) => styled(icon)`
  width: 40px;
  height: 40px;
`;

const NetworkWrapper = styled(Box)`
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  overflow: hidden;

  bottom: -5px;
  right: -5px;
`;

const IconComponents = ({ tokenName, type, networkName }) => {
  const IconTokenCurrent = getTokenIcon(tokenName);
  const IconNetworkCurrent = getNetworkIcon(networkName);
  const IconNetworkResized = IconNetworkCurrent && IconNetworkResize(IconNetworkCurrent);
  const IconTokenResized = IconTokenCurrent && IconTokenResize(IconTokenCurrent);
  const IconReceivedResized = IconNetworkResize(ReceivedIcon);
  return (
    <IconWrapper>
      {IconTokenResized && <IconTokenResized />}
      <NetworkWrapper>
        {type === 'received' ? (
          <IconReceivedResized />
        ) : (
          IconNetworkResized && <IconNetworkResized />
        )}
      </NetworkWrapper>
    </IconWrapper>
  );
};

const OperationElement = ({ tokenName, network, type, from, amount }) => {
  return (
    <WrapperOperationElement width='100%' justifyContent='space-between' p='12px 0'>
      <Row>
        <Box m='0 8px 0 0'>
          <IconComponents tokenName={tokenName} type={type} networkName={network} />
        </Box>
        <Box>
          <Typography variant='smallBold'>{type?.toUpperCase()}</Typography>
          <Typography variant='small' colorName='gray'>
            FROM: {shortWallet(from?.toUpperCase(), 4, from.length - 4)}
          </Typography>
        </Box>
      </Row>
      <Box>
        <Typography>{`+< ${amount} ${tokenName}`}</Typography>
      </Box>
    </WrapperOperationElement>
  );
};

export const Activity: React.FC<{coins?: any}> = ( ) => {
  return (
    <Box m='8px 0 0 0'>
      {mock.map((el, i) => {
        return (
          <Box key={i}>
            <Typography m='8px 0 16px 0' variant='small'>
              {el.date.toUpperCase()}
            </Typography>
            <Box>
              {el.operations.map((operation, i) => {
                return (
                  <OperationElement
                    key={i}
                    network={operation.network}
                    amount={operation.amount}
                    tokenName={operation.tokenName}
                    type={operation.type}
                    from={operation.from}
                  />
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
