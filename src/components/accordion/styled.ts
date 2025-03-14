import styled from 'styled-components';
import BackArrow from '../../assets/arrowDownBold.svg?react';
import { Box } from '@ui';

export const DropdownArrow = styled(BackArrow)`
  width: 15px;
  height: 15px;
`;

export const Wrapper = styled(Box)<any>`
  position: relative;
  height: ${({ height }) => height + 'px'};
  z-index: ${({ z }) => z || 1};
  width: 100%;
`;

export const AccordionHeader = styled.div<any>`
  position: relative;
  z-index: 50000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AccordionWrapper = styled.div<any>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background2};
  border-radius: 12px;
  //padding: ${({ open }) => (open ? '12px 12px 12px 20px' : '12px 12px 12px 20px')};
`;

export const ArrowBlock = styled.div`
  width: 28px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArrowAnimation = styled.div<any>`
  display: flex;
  transform: ${({ open }) => (open ? 'rotate(-180deg)' : 'rotate(-0deg)')};
  transition: 0.3s transform ease-in-out;
  -moz-transition: 0.3s transform ease-in-out; /* Firefox 4 */
  -webkit-transition: 0.3s transform ease-in-out; /* Safari and Chrome */
  -o-transition: 0.3s transform ease-in-out; /* Opera */
  -ms-transition: 0.3s transform ease-in-out; /* Explorer 10 */
`;

export const AccordionContent = styled.div<any>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background2};
  height: ${({ height, open }) => (open ? `${height}px` : '0px')};
  transition: 0.3s;
  top: 81%;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: content-box;
  border-radius: 0 0 12px 12px;
  z-index: 3000;
`;

export const AccordionContentWrapper = styled.div<any>`
  transition: 0.2s;
`;
