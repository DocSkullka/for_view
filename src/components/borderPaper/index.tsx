import React, { ReactNode } from 'react'
import styled from 'styled-components';
import { Box } from '@ui';


const WrapperBox = styled(Box)`
  position: relative;
  padding: 2px 0 2px 0;
`;

const Lines = styled.div<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: ${({ color, theme }) =>
    color ? `1px solid ${theme.colors[color]}` : `1px solid ${theme.colors.white}`};
  border-radius: 12px;
`;

const Background = styled.div`
  position: absolute;
  top: 1px;
  left: -1px;
  right: -1px;
  bottom: 1px;
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: 12px;
`;

const Content = styled(Box)`
  position: relative;

  z-index: 5;
`;

export const BorderPaper: React.FC<{children: ReactNode, color?: string}> = ({
  children,
  color,
}) => {
  return (
    <WrapperBox height='fit-content' width='100%'>
      <Lines color={color}></Lines>
      <Background />
      <Content>{children}</Content>
    </WrapperBox>
  );
};
