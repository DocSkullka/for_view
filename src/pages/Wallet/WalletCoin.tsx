import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { COINS } from '@/constants/coins';
import { Box, Row, Typography } from '@ui';
import Ellipsis from '../../assets/ellipsis.svg?react';
import Plus from '../../assets/plus.svg?react';
import Send from '../../assets/send.svg?react';
import StakingIcon from '../../assets/staking.svg?react';
import Swap from '../../assets/swap.svg?react';
import { OperationButtons } from '@/components/OperationButtons/OperationButtons';
import { BorderPaper } from '@/components/borderPaper';
import { ContentWrapperScrollable } from '@/components/ContentWrapperScrollable/ContentWrapperScrollable';
import { WALLET_DEPOSIT_PATH, WALLET_WITHDRAW_PATH } from '@/navigation/navigation_routes';
import { PageHeader } from '@/components/pageHeader/Header';
import { Activity } from '@/pages/Wallet/components/Activity/Activity';
import { Chart } from 'react-google-charts';
import {
  iconSize,
  IconPriceDetail,
  IconWrapper,
  StakingWrapper,
  PriceDetailHeader,
  NetProfitBox,
} from './styled';

const options = {
  lineWidth: 1,
  colors: ['#F65535'],
  backgroundColor: {
    fill: 'transparent',
  },
  legend: 'none',
  hAxis: {
    baselineColor: 'none',
    gridlines: { color: 'transparent' },
    textPosition: 'none',
  },
  vAxis: {
    baselineColor: 'none',
    gridlines: { color: 'transparent' },
    textPosition: 'none',
  },
  chartArea: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
};

const WalletCoinHeader = ({ coinName }) => {
  return (
    <PageHeader
      rightContent={<Ellipsis />}
      centerContent={<Typography variant='medium'>{coinName?.toUpperCase()}</Typography>}
    />
  );
};

const Staking: React.FC<any> = ({ coin, disable, onClick }) => {
  return (
    <StakingWrapper disable={disable} onClick={() => !disable && onClick()}>
      <Typography m='0 0 8px 0' variant='medium'>
        STAKING
      </Typography>
      <BorderPaper>
        <Row p='12px' height='69px' alignItems='center'>
          <IconWrapper>
            <StakingIcon />
          </IconWrapper>
          <Box m='0 0 0 12px'>
            <Typography variant='medium'>Start earning {coin?.currencyName}</Typography>
            <Typography colorName='gray' variant='small'>
              Stake tockens and earn rewards
            </Typography>
          </Box>
        </Row>
      </BorderPaper>
    </StakingWrapper>
  );
};

const InfoTemplate = ({ header, content, title, height }) => {
  return (
    <Box>
      <Typography m='0 0 8px 0' variant='medium'>
        {title}
      </Typography>

      <BorderPaper>
        <Box height={`${height}px`}>
          <PriceDetailHeader p='12px' alignItems='center' justifyContent='space-between'>
            {header}
          </PriceDetailHeader>
          <Box p='12px'>{content}</Box>
        </Box>
      </BorderPaper>
    </Box>
  );
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PriceDetail = ({ coin }) => {
  const Icon = iconSize(coin?.Icon);

  const data = [
    ['x', 'value'],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
    [getRandomInteger(0, 1000), getRandomInteger(0, 1000)],
  ].sort(([a], [b]) => a - b);

  return (
    <Box>
      <InfoTemplate
        title={'PRICE DETAIL'}
        height={126}
        header={
          <Row width='100%' alignItems='center' justifyContent='space-between'>
            <Row alignItems='center'>
              <IconPriceDetail>{Icon && <Icon />}</IconPriceDetail>
              <Typography m='0 0 0 8px' variant='small'>
                {coin?.label}
              </Typography>
            </Row>
            <Typography variant='tiny' colorName='gray'>
              24H PRICE
            </Typography>
          </Row>
        }
        content={
          <Row justifyContent='space-between'>
            <Box>
              <Typography variant='small'>$132.34</Typography>
              <Row m='8px 0 0 0' alignItems='center'>
                <Typography m='0 4px 0 0' variant='small' colorName='red'>
                  -$4.64
                </Typography>
                <NetProfitBox>
                  <Typography variant='small' colorName='black'>
                    -3.38%
                  </Typography>
                </NetProfitBox>
              </Row>
            </Box>
            <Box>
              <Chart
                chartType='LineChart'
                width='100px'
                height='50px'
                data={data}
                options={options as any}
              />
            </Box>
          </Row>
        }
      />
    </Box>
  );
};

const AboutCoin = ({ coin }) => {
  return (
    <Box>
      <InfoTemplate
        title={`ABOUT ${coin?.label}`}
        height={90}
        header={
          <Row width='100%' alignItems='center' justifyContent='space-between'>
            <Row alignItems='center'>
              <Typography variant='small'>TOKEN NAME</Typography>
            </Row>
            <Typography variant='small' colorName='gray'>
              {`${coin?.label} (${coin?.currencyName})`}
            </Typography>
          </Row>
        }
        content={
          <Row alignItems='center' justifyContent='space-between'>
            <Typography variant='small' colorName='gray'>
              NETWORK
            </Typography>
            <Typography m='0 4px 0 0' variant='small' colorName='gray'>
              {coin?.network?.toUpperCase()}
            </Typography>
          </Row>
        }
      />
    </Box>
  );
};

export const WalletCoin = () => {
  const [coin, setCoin] = useState<any>(null);
  const [balance] = useState<any>(0.20339);
  const [balanceUsdt] = useState<any>(26.92);
  const { coin_id } = useParams();
  const navigate = useNavigate();

  const OPERATION_BUTTONS = useMemo(
    () => [
      {
        label: 'Receive',
        Icon: Plus,
        onClick: () => {
          navigate(WALLET_DEPOSIT_PATH(coin?.network));
        },
      },
      {
        label: 'Send',
        Icon: Send,
        onClick: () => {
          navigate(WALLET_WITHDRAW_PATH(coin?.network, coin?.coinId));
        },
      },
      {
        label: 'Swap',
        Icon: Swap,
        disable: true,
        onClick: () => {},
      },
    ],
    [coin]
  );

  useEffect(() => {
    if (coin_id) {
      const curCoin = COINS.find((el) => el.coinId === coin_id);
      setCoin(curCoin);
    }
  }, [coin_id]);

  return (
    <Box p='8px 15px 8px 15px'>
      <WalletCoinHeader coinName={coin?.label} />
      <ContentWrapperScrollable minusBottom={100}>
        <Typography ta='center' variant='hugeMain'>{`${balance} ${coin?.currencyName}`}</Typography>
        <Typography
          m='12px 0 12px 0'
          ta='center'
          variant='small'
          colorName='gray'
        >{`$${balanceUsdt}`}</Typography>
        <Box m='32px 0 20px 0'>
          <OperationButtons buttons={OPERATION_BUTTONS} />
        </Box>
        <Staking coin={coin} disable />
        <Box m='20px 0 16px 0'>
          <PriceDetail coin={coin} />
        </Box>
        <AboutCoin coin={coin} />
        <Typography m='12px 0 0 0' variant='medium'>
          TRANSACTION HISTORY
        </Typography>
        <Activity />
      </ContentWrapperScrollable>
    </Box>
  );
};
