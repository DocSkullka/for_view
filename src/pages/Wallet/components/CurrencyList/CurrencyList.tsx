import ArrowDown from '../../../../assets/arrowDown.svg?react';
import { CurrencyItem } from '../CurrencyItem/CurrencyItem.tsx';
import { Box, Row, Typography } from '@ui';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WALLET_COIN_PATH } from '@/navigation/navigation_routes';


const DynamicArrow = styled(ArrowDown)<any>`
  transform: ${({ active }) => (active ? 'rotate(180deg)' : 'rotate(0)')};
  transition: 0.3s transform;
`;

const ItemWrapper = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0px;
  }
`;

export function CurrencyList({ onClick, coins }: any) {
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  const hiddenTokens = coins;
  return (
    <Box height='300px'>
      {coins.map(({ Icon, coinId, label, subLabel, balance, difference, isPositive }, index) => {
        return (
          <ItemWrapper key={index} onClick={() => navigate(WALLET_COIN_PATH(coinId))}>
            <CurrencyItem
              Icon={Icon}
              label={label}
              subLabel={subLabel}
              balance={balance}
              difference={difference}
              isPositive={isPositive}
              onClick={onClick}
            />
          </ItemWrapper>
        );
      })}
      <Row m='0 0 16px 0'>
        <Typography m='0 5px 0 0' variant='small'>
          Hidden ({hiddenTokens.length})
        </Typography>
        <Row alignItems='center' onClick={() => setHidden((prev) => !prev)}>
          <Typography m='0 5px 0 0' variant='small'>
            Show
          </Typography>
          <DynamicArrow active={!hidden} />
        </Row>
      </Row>

      {!hidden &&
        hiddenTokens.map(
          ({ Icon, coinId, label, subLabel, balance, difference, isPositive }, index) => {
            return (
              <ItemWrapper onClick={() => navigate(WALLET_COIN_PATH(coinId))} key={index}>
                <CurrencyItem
                  Icon={Icon}
                  label={label}
                  subLabel={subLabel}
                  balance={balance}
                  difference={difference}
                  isPositive={isPositive}
                  onClick={onClick}
                />
              </ItemWrapper>
            );
          }
        )}
    </Box>
  );
}
