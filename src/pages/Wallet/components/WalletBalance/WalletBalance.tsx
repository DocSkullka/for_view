import { formatNumberWithCommas } from '@/utils/format';
import { useMemo } from 'react';
import { Typography, Box, Row } from '@ui';

interface ISplitBalance {
  integerPart: string;
  decimalPart: string;
}

type Props = {
  balance?: number;
};

export default function WalletBalance({ balance = 21311.12 }: Props) {
  const getCurrencySymbol = () => '$';

  const splitBalance = useMemo<ISplitBalance>(() => {
    let result = balance?.toString()?.split('.');
    return {
      integerPart: result[0],
      decimalPart: result[1],
    };
  }, [balance]);

  return (
    <Box>
      <Row>
        <Typography variant='hugeMain'>{`${getCurrencySymbol()} ${formatNumberWithCommas(
          splitBalance.integerPart
        )}`}</Typography>
        <Typography variant='hugeMain'>
          {splitBalance.decimalPart ? `,${splitBalance.decimalPart}` : ',00'}
        </Typography>
      </Row>
      <Row width='100%' justifyContent='center'>
        <Typography colorName='gray' width='fit-content' variant='small'>
          ↑$ 7,17 (0,28%)
        </Typography>
      </Row>
    </Box>
  );
}
