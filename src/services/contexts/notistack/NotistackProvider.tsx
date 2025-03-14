import styled from 'styled-components';
import { createContext, forwardRef, useCallback, useMemo } from 'react';
import Grow from './Grow';
import { SnackbarProvider, enqueueSnackbar, closeSnackbar } from 'notistack';
import { Row, Typography } from '@/ui';
import { BorderPaper } from '@/components/borderPaper';

const ErrorColors = {
  error: 'red',
  success: 'success',
  info: 'white',
};

const ErrorMessage = styled.div<any>`
  width: 100%;
  height: fit-content;
  border-radius: 12px;
  word-break: normal;
  background-color: ${({ theme, type }) => theme.colors?.[ErrorColors[type]] || theme.colors.black};
  padding: 20px;
  font-family: IBMPlexSansCondensed;
  box-sizing: border-box;

  ${({ theme }) => theme.fonts.tiny};
  color: white;
`;

const MySnackbar = forwardRef((props: {message?: string, variant: string, id: string | number}, ref) => {
  return (
    <ErrorMessage
      {...props}
      ref={ref}
      type={props.variant}
      onClick={() => {
        closeSnackbar(props.id);
      }}
    >
      <BorderPaper color={ErrorColors[props.variant] as keyof typeof ErrorColors}>
        <Row p='18px 12px' width='100%' justifyContent='space-between'>
          <Typography variant='tiny'>{props?.message}</Typography>
        </Row>
      </BorderPaper>
    </ErrorMessage>
  );
});

export const NotistackContext = createContext<any>(null);

const NOTISTACK_DURATION = 2500;

export const NotistackProvider = ({ children }) => {
  const handleShowNotification = useCallback(
    (msg, type) =>
      enqueueSnackbar(msg, {
        variant: type,
        autoHideDuration: NOTISTACK_DURATION,
      }),
    [enqueueSnackbar]
  );

  const methods = useMemo(
    () => ({
      showError: (msg) => {
        msg && handleShowNotification(msg?.message || msg, 'error');
      },
      showSuccess: (msg) => handleShowNotification(msg, 'success'),
      showWarning: (msg) => handleShowNotification(msg, 'warning'),
      showInfo: (msg) => handleShowNotification(msg, 'info'),
    }),
    []
  );

  return (
    <NotistackContext.Provider value={{ ...methods }}>
      <SnackbarProvider
        maxSnack={3}
        TransitionComponent={Grow}
        Components={{
          error: MySnackbar,
          success: MySnackbar,
          info: MySnackbar,
        }}
      >
        {children}
      </SnackbarProvider>
    </NotistackContext.Provider>
  );
};
