import { Box, Row } from '@ui';
import styled from 'styled-components';

export const IconPriceDetail = styled.div`
  background-color: black;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.light_gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StakingWrapper = styled(Box)`
  opacity: ${({ disable }) => (disable ? 0.2 : 1)};
`;

export const PriceDetailHeader = styled(Row)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray}`};
`;

export const iconSize = (Icon) =>
  Icon &&
  styled(Icon)`
    width: 24px;
    height: 24px;
  `;

export const NetProfitBox = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
  padding: 2px;
  border-radius: 4px;
`;
