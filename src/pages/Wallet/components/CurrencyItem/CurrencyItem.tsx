import React, { useState } from 'react';
import styles from './styles.module.scss';
import Arrow from '../../../../assets/forwardArrow.svg?react';
import PaymentCard from '../../../../assets/paymentCard.svg?react';
import PositiveDifference from '../../../../assets/positiveDifference.svg?react';
import NegativeDifference from '../../../../assets/negativeDifference.svg?react';
import { BorderPaper } from '@/components/borderPaper';
import { Row, Box } from '@ui';
import styled from 'styled-components';

type Props = {
  Icon: React.FunctionComponent;
  label: string;
  subLabel: string;
  balance: string;
  difference: string;
  isPositive: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const IconResize = (icon) => styled(icon)`
  width: 53px;
  height: 53px;
  border-radius: 10px;
`;

export function CurrencyItem({
  Icon,
  label,
  subLabel,
  balance,
  difference,
  isPositive,
  onClick,
}: Props) {
  const [showCard, setShowCard] = useState<boolean>(false);

  const IconResized = Icon && IconResize(Icon);
  return (
    <>
      <Row
        p='5px 0 0 0'
        height='52px'
        onClick={() => onClick && setShowCard((prevState) => !prevState)}
        alignItems='center'
      >
        <Box m='0 8px 0 0' width='60px'>
          <BorderPaper>
            <Box height='50px' width='50px' justifyContent='center' alignItems='center'>
              {IconResized && <IconResized />}
            </Box>
          </BorderPaper>
        </Box>

        <BorderPaper>
          <Box height='52px' justifyContent='center' alignItems='center'>
            <Row width='100%' justifyContent='space-between' p='12px'>
              <Box>
                <div className={styles.label}>{label}</div>
                <div className={styles.subLabel}>{subLabel}</div>
              </Box>
              <Box>
                <Box>{balance}</Box>
                <Row alignItems='center'>
                  <Box m='0 8px 0 0'>
                    {isPositive ? <PositiveDifference /> : <NegativeDifference />}
                  </Box>
                  <div>{difference}</div>
                </Row>
              </Box>
            </Row>
          </Box>
        </BorderPaper>
      </Row>

      {showCard ? (
        <div className={styles.cardItem} onClick={onClick}>
          <div className={styles.arrow}>
            <Arrow />
          </div>
          <div className={styles.cardBody}>
            <div className={styles.cardIcon}>
              <PaymentCard />
            </div>
            <div className={styles.cardLabel}>IPOON card</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
