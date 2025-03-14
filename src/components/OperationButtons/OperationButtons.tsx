import React from 'react';
import { Row, Box, Typography } from '@ui';
import { BorderPaper } from '@/components/borderPaper';
import styled from 'styled-components';

type Props = {
  buttons: {
    disable?: boolean;
    label: string;
    onClick?: () => void;
    Icon: React.FunctionComponent;
  }[];
};

const ButtonWrapper = styled(Box)`
  opacity: ${({ disable }) => (disable ? 0.2 : 1)};
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-right: 8px;

  &:last-child {
    margin: 0;
  }
`;

const Button = ({ Icon, title }) => {
  return (
    <BorderPaper>
      <Box height='72px' width='100%' justifyContent='center' alignItems='center'>
        <Icon />
        <Typography m='8px 0 0 0' variant='tiny'>
          {title}
        </Typography>
      </Box>
    </BorderPaper>
  );
};

export function OperationButtons({ buttons }: Props) {
  return (
    <Row width='100%' height='72px' justifyContent='space-between'>
      {buttons.map(({ Icon, label, onClick, disable }, index) => {
        return (
          <ButtonWrapper disable={disable} onClick={() => !disable && onClick && onClick()}>
            <Button key={index} Icon={Icon} title={label} />
          </ButtonWrapper>
        );
      })}
    </Row>
  );
}
