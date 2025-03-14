import { Providers } from '@/components/Providers.tsx';
import { App } from '@/components/App.tsx';
import { GlobalStyles } from '@ui';

export function Root() {
  return (
    <Providers>
      <App />
      <GlobalStyles />
    </Providers>
  );
}
