import { type ReactNode, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@ui';
// @ts-ignore
import { initNavigator, SDKProvider } from '@telegram-apps/sdk-react';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { PopoverContextProvider } from '@/services/contexts/popover/PopoverContext.tsx';
import { UserContextProvider } from '@/services/contexts/user/UserContext.tsx';
import store from '@/store';
import { Provider } from 'react-redux';
import { NotistackProvider } from '@/services/contexts/notistack';

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [navigatorLocation, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    void navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <SDKProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <NotistackProvider>
            <Router location={navigatorLocation} navigator={reactNavigator}>
              <UserContextProvider>
                <PopoverContextProvider>{children}</PopoverContextProvider>
              </UserContextProvider>
            </Router>
          </NotistackProvider>
        </ThemeProvider>
      </Provider>
    </SDKProvider>
  );
}
