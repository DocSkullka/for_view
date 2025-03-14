import React, { useRef, useState, useEffect } from 'react'
import { Box, Typography } from '../../ui';
import styled from 'styled-components';
import { BorderPaper } from '@/components/borderPaper';

const TypographyStyled = styled(Typography)`
  position: absolute;
  padding-left: 2px;
  top: ${({ active, textarea }) => (active ? '5px' : textarea ? '16px' : '17px')};
  transition: 0.1s;

  //z-index: 2;
  color: ${({ error, theme }) => (error ? theme.colors.red : theme.colors.gray)};

  ${({ theme, active }) => (active ? theme.fonts.small : theme.fonts.small)}
`;

const TextAreaStyled = styled.div<any>`
  background-color: transparent;
  z-index: 4;
  position: relative;
  border: none;
  resize: none;
  //min-height: 20px;
  height: fit-content;
  //height: 20px;
  outline: none;
  top: ${({ active }) => (active ? '0px' : '0')};

  width: 100%;
  font-family: Roboto, sans-serif;
  color: ${({ error, theme }) => (error ? theme.colors.red : theme.colors.white)};
  ${({ theme }) => theme.fonts.link};
  font-size: 16px;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.hint};

    ${({ theme }) => theme.fonts.link};
  }
`;

const InputStyled = styled.input<any>`
  background-color: transparent;
  border: none;
  outline: none;
  top: ${({ active }) => (active ? '20px' : '0')};

  width: 100%;
  color: ${({ error, theme }) => (error ? theme.colors.red : theme.colors.white)};
  ${({ theme }) => theme.fonts.small};
  font-size: 16px;

  &::placeholder,
  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.hint};

    ${({ theme }) => theme.fonts.small};
  }
`;

const PaperStyled = styled.div<any>`
  position: relative;
  height: ${({ textarea }) => (textarea ? 'fit-content' : '59px')};
  padding: ${({ active, textarea }) =>
    active || textarea ? '26px 20px 10px 20px' : '20px 20px 20px 20px'};
  display: flex;
  align-items: center;
  border: ${({ error, theme }) => (error ? `2px solid ${theme.colors.red}` : 'none')};

  box-sizing: border-box;
`;

const Label = styled.label<any>`
  width: ${({ width }) => width};
`;

const ActionBlock = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding-right: 10px;
  filter: ${({ disabled }) => (disabled ? 'grayscale(1)' : 'grayscale(0)')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  top: 50%;
  transform: translate(0, -50%);
  height: fit-content;
  position: absolute;
`;

export const Input: React.FC<any> = ({
  value,
  error,
  pattern,
  actionButton,
  actionButtonTitle,
  ActionButtonComponent,
  actionDisable,
  onChange,
  placeholder = 'Enter something',
  readOnly,
  onFocus,
  className,
  withoutFormat,
  onlyWholeNumbers,
  type,
  LeftIcon,
  onBlur,
  textarea,
  setReadyFormat,
}) => {
  const inputRef: any = useRef();
  const [focus, setFocus] = useState(false);
  const [blur, setBlur] = useState(false);
  const isWhole = onlyWholeNumbers ? [''] : [',', '.'];
  // const exceptThisSymbols = type === "number" ? ["."] : [];

  const allowNumberSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ...isWhole];

  const handleFocus = (e) => {
    if (onFocus) {
      onFocus(e);
    }

    setFocus(true);
    setBlur(false);
  };

  const handleBlur = (e) => {
    if (textarea) {
      onChange(inputRef.current.innerText);
    }
    if (onFocus) {
      onBlur(e);
    }
    setFocus(false);
    setBlur(true);
  };

  useEffect(() => {
    if (!focus && value && !withoutFormat) {
      const hasComma = String(value)?.indexOf(',') > -1;
      if (hasComma && onChange) {
        onChange(
          String(
           String(value)
              ?.replace(',', '.')
              ?.replaceAll(',', '')
              .replace(/^0+(?=\d)/, '')
          )
        );
      } else {
        if (type === 'number' && onChange) {
          onChange(String(value).replace(/^0+(?=\d)/, ''));
        }
      }
      if (setReadyFormat) {
        setReadyFormat(true);
      }
    }
  }, [focus, withoutFormat]);

  const handleChange = (e) => {
    if (setReadyFormat) {
      setReadyFormat(false);
    }
    if (onChange) {
      if (type === 'number' && onlyWholeNumbers) {
        const value =
          e.target.value && e.target.value !== '0'
            ? String(Number(e.target.value))
            : e.target.value;

        if (e.target.value !== '0') {
          onChange(value);
        }
      } else {
        onChange(e.target.value);
      }
    }
  };

  const handleKeyPress = (e) => {
    // const lastComma = value.charAt(value.length - 1) === ",";
    // const keyComma = e.key === ",";
    if (
      type === 'number' &&
      !allowNumberSymbols.includes(e.key)
      // (lastComma && keyComma)
    ) {
      e.preventDefault();
    }

    if (e.key === 'Enter' || e.key === 'Return' || e.nativeEvent.charCode === 13) {
      if (onBlur) {
        onBlur();
        inputRef.current?.blur();
      } else {
        inputRef.current?.blur();
      }
    }
  };

  const Component = textarea ? TextAreaStyled : InputStyled;

  return (
    <BorderPaper>
      <PaperStyled
        p='20px'
        active={!!value}
        error={error}
        className={className}
        textarea={textarea}
      >
        {LeftIcon && (
          <Box width='5%' m='0 12px 0 0'>
            <IconWrapper>
              <Box>
                <LeftIcon />
              </Box>
            </IconWrapper>
          </Box>
        )}
        <Label width={actionButton ? '90%' : '100%'}>
          {(value || textarea) && (
            <TypographyStyled
              variant='medium'
              textarea={textarea}
              active={textarea ? focus || (value && blur) : !!value}
              error={error}
            >
              {placeholder}
            </TypographyStyled>
          )}
          <Component
            contentEditable
            ref={inputRef}
            error={error}
            onKeyPress={handleKeyPress}
            pattern={pattern}
            onFocus={handleFocus}
            onBlur={handleBlur}
            active={!!value}
            readOnly={readOnly}
            onChange={handleChange}
            value={value}
            placeholder={placeholder}
          />
        </Label>
        {actionButton && (
          <ActionBlock
            width='25%'
            onClick={!actionDisable ? () => actionButton() : null}
            disabled={actionDisable}
          >
            {ActionButtonComponent && ActionButtonComponent}
            {actionButtonTitle && (
              <Typography variant='link' color='link'>
                {actionButtonTitle}
              </Typography>
            )}
          </ActionBlock>
        )}
      </PaperStyled>
    </BorderPaper>
  );
};
