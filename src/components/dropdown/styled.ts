import styled from 'styled-components';
import { Row } from '@ui';

export const DropdownChainWrapper = styled.div`
  height: fit-content;
  min-height: 40px;
`;

export const DropdownItem = styled(Row)`
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  padding: 8px 12px;

  &:last-child {
    border: none;
  }
`;

export const DropdownBlock = styled.div`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 1px;
    right: 1px;
    top: 1px;
    bottom: -1px;
    border-radius: 12px;
    background-color: white;
    z-index: -1;
  }
`;

export const DropdownContent = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  margin-top: 20px;
  border-radius: 12px;
  padding-left: 12px;
  padding-right: 12px;
  //padding: 12px 8px;
  z-index: 2;
`;

export const Icon = (icon) => styled(icon)`
  width: 20px;
  height: 20px;
  //border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
`;
