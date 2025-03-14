import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from '@ui';
import ArrowLeft from '../../assets/arrowLeft.svg?react';
import styled from 'styled-components';

const Arrow = styled(ArrowLeft)`
  width: 16px;
  height: 16px;
`;

export const PageHeader: React.FC<any>= ({ cb, toBack, centerContent, rightContent }) => {
  const navigate = useNavigate();

  return (
    <Row height='24px' width='100%' alignItems='center' justifyContent='space-between'>
      <Arrow onClick={() => (cb ? cb() : navigate(toBack ? toBack : -1))} />
      {centerContent}
      {rightContent}
    </Row>
  );
};
