import React from 'react';
import { Row, Typography } from '@ui';
import styled from 'styled-components';

// type TabType = {
//   items: { id: string; title: string }[];
//   activeTab: string;
//   onChange: (key: string) => void;
// };

const TabElement = styled.div<any>`
  padding: 12px;
  display: flex;
  justify-content: center;
  width: ${({ width }) => `${width}%`};
  align-items: center;
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.colors.white}` : `2px solid ${theme.colors.noActiveWhite}`};
`;

export const Tab: React.FC<any> = ({ items, onChange, activeTab }) => {
  const width = (100 / items.length).toFixed(2);

  const handleChange = (id) => {
    onChange && onChange(id);
  };
  return (
    <Row>
      {items.map((el, i) => {
        return (
          <TabElement
            key={i}
            width={width}
            onClick={() => handleChange(el.id)}
            active={el.id === activeTab}
          >
            <Typography variant='small'>{el.title}</Typography>
          </TabElement>
        );
      })}
    </Row>
  );
};
