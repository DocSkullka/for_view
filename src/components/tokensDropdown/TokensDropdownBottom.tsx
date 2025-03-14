import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Row } from '@ui';
import { BorderPaper } from '@/components/borderPaper';
import styled from 'styled-components';
import CrossIcon from '@/assets/cross.svg?react';
import ActiveTokenIcon from '@/assets/activeToken.svg?react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNetworkIcon } from '@/components/Icons/Icons';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -120px;
  z-index: 2523523523;
`;


const ScrollBlock = styled.div`
  overflow: scroll;
  height: 300px;
  padding: 8px 0 8px 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: -120px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.64);
`;
const BoxZ = styled.div`
  z-index: 50;
`;

const TokenWrapper = styled(Row)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  padding: 12px;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;

const IconWrapper = styled(Box)`
  position: relative;
  height: 40px;
  width: 40px;
`;

const IconNetworkResize = (icon) => styled(icon)`
  width: 16px;
  height: 16px;
  background-color: black;
`;

const NetworkWrapper = styled(Box)`
  position: absolute;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  overflow: hidden;

  bottom: 2px;
  right: 2px;
`;

const Token: React.FC<any> = ({ Icon, title, symbol, noViewNetwork, network, amount, active }) => {
  const NetworkIcon = getNetworkIcon(network);
  const NetworkResized = NetworkIcon && IconNetworkResize(NetworkIcon);
  return (
    <TokenWrapper justifyContent='space-between'>
      <Row alignItems='center'>
        <IconWrapper>
          <Icon />
          <NetworkWrapper>{!noViewNetwork && NetworkResized && <NetworkResized />}</NetworkWrapper>
        </IconWrapper>
        <Typography m='0 0 0 12px' variant='small' colorName={active ? 'white' : 'gray'}>
          {title}
        </Typography>
      </Row>
      <Row alignItems='center'>
        <Typography
          m='0 12px 0 0'
          colorName='gray'
          variant='small'
        >{`${amount} ${symbol}`}</Typography>
        {active && <ActiveTokenIcon />}
      </Row>
    </TokenWrapper>
  );
};

const TokenItem = styled.div`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray}`};

  &:last-child {
    border: none;
  }
`;

export const TokensDropdownBottom: React.FC<any> = ({ open, setOpen, coins, activeTokenId, onChange }) => {
  const contentRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) {
      setTimeout(() => {
        setInit(true);
      }, 400);
    }
  }, [init]);

  return (
    <Box>
      <AnimatePresence>
        {open && (
          <BoxZ>
            <motion.div
              key='animOverlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Overlay onClick={() => setOpen && setOpen(false)} />
            </motion.div>
          </BoxZ>
        )}
      </AnimatePresence>
      <Wrapper>
        <AnimatePresence>
          {open && (
            <motion.div
              key='animDropdown'
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 600 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Box p='0px 0 20px 0 '>
                <BorderPaper>
                  <Box p='0 12px 12px 12px'>
                    <Row
                      width='100%'
                      height='56px'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Typography variant='medium'>TOKENS</Typography>
                      <CrossIcon onClick={() => setOpen && setOpen(false)} />
                    </Row>
                    <BorderPaper>
                      <Box p='4px 0 4px 0'>
                        <ScrollBlock ref={contentRef}>
                          {coins?.map((el, index) => {
                            return (
                              <TokenItem onClick={() => onChange && onChange(el)}>
                                <Token
                                  noViewNetwork={el?.noViewNetwork}
                                  amount={4}
                                  onChange={onChange}
                                  symbol={el.currencyName}
                                  title={el.label}
                                  key={index}
                                  network={el.network}
                                  Icon={el.Icon}
                                  active={activeTokenId === el.coinId}
                                />
                              </TokenItem>
                            );
                          })}
                        </ScrollBlock>
                      </Box>
                    </BorderPaper>
                  </Box>
                </BorderPaper>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </Box>
  );
};
