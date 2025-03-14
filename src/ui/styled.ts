import styled, { css } from 'styled-components';
export const setStyle = (nameProps, defaultValue) => (props) => props?.[nameProps] || defaultValue;

const Sizes = css`
  width: ${setStyle('width', 'auto')};
  min-height: ${setStyle('minHeight', 'auto')};
  min-width: ${setStyle('minWidth', 'auto')};
  height: ${setStyle('height', 'auto')};
`;

const Indents = css`
  margin: ${setStyle('m', '0')};
  padding: ${setStyle('p', '0')};
`;

export const Typography = styled.div<any>`
  font-family: IBMPlexSansCondensed;
  white-space: ${setStyle('ws', 'pre-line')};
  margin: ${setStyle('m', '0')};
  text-align: ${setStyle('ta', 'left')};
  color: ${({ colorName, color, theme }) => color || theme.colors?.[colorName]};
  ${({ theme, variant }) => theme.fonts[variant] || theme.fonts.medium};
  font-weight: ${({ fw }) => fw || '500'};
  font-size: ${({ variant }) => (variant ? null : setStyle('fs', '16px'))};
  line-height: ${({ lh }) => (lh ? lh : setStyle('lh', 'normal'))};
  ${Sizes};
`;

export const Box = styled.div<any>`
  display: flex;
  flex-direction: column;
  flex-grow: ${setStyle('flexGrow', '0')};
  flex-flow: ${setStyle('flexFlow', 'normal')};
  overflow: ${setStyle('overflow', 'visible')};
  align-items: ${setStyle('alignItems', 'normal')};
  justify-content: ${setStyle('justifyContent', 'normal')};
  gap: ${setStyle('gap', '0')};
  ${Sizes}
  ${Indents}
`;

export const Row = styled.div<any>`
  display: flex;
  align-items: ${setStyle('alignItems', 'normal')};
  justify-content: ${setStyle('justifyContent', 'normal')};
  flex-wrap: ${setStyle('fw', 'auto')};
  gap: ${setStyle('gap', '0')};
  ${Sizes}
  ${Indents}
`;
