import React, { useMemo } from 'react';
import { Accordion } from '@/components/accordion/Accordion'
import { Box, Typography, Row } from '@ui';
import { DropdownChainWrapper, DropdownContent, DropdownBlock, Icon, DropdownItem } from './styled';
import { BorderPaper } from '@/components/borderPaper';

export const DropdownNetwork: React.FC<any> = ({
  items,
  onOpen,
  currentValue,
  setValue,
  subTitle,
  onHeight,
  ...props
}) => {
  const DataComponent = useMemo(
    () =>
      ({ data, close, withRef }) => {
        const dataFiltered = data?.filter((el) => el?.id !== currentValue?.id);

        const handleSetChain = (value) => {
          setValue(value);
          close();
        };

        return (
          <DropdownBlock ref={withRef}>
            <DropdownContent>
              {dataFiltered?.map((el, i) => {
                const IconComp = el.Icon && Icon(el.Icon);
                const active = currentValue?.id === el.id;
                return (
                  <DropdownItem
                    width='100%'
                    alignItems='center'
                    key={i}
                    onClick={() => {
                      handleSetChain(el);
                    }}
                  >
                    {IconComp && <IconComp />}
                    <Typography m='0 0 0 8px' variant='small' colorName={active ? 'white' : 'gray'}>
                      {el.title}
                    </Typography>
                  </DropdownItem>
                );
              })}
            </DropdownContent>
          </DropdownBlock>
        );
      },
    [currentValue, setValue]
  );

  const SelectComponent = ({ value, withRef }) => {
    return (
      <Box ref={withRef}>
        <Typography ta='center' width='100%' variant='link'>
          {value?.title || '...'}
        </Typography>
      </Box>
    );
  };

  const itemsFormat = useMemo(
    () =>
      items.map((el) => {
        return {
          ...el,
          id: el?.id,
          title: el?.title,
        };
      }),
    [items]
  );

  return (
    <DropdownChainWrapper>
      <BorderPaper>
        <Row width='100%' alignItems='center' justifyContent='center' height='100%' p='12px 0px'>
          <Accordion
            {...props}
            onOpen={onOpen}
            onHeight={onHeight}
            value={currentValue}
            data={itemsFormat}
            ContentHeader={SelectComponent}
            Content={DataComponent}
          />
        </Row>
      </BorderPaper>
    </DropdownChainWrapper>
  );
};
