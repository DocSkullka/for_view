import { useEffect } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import { navigation_routes, routes } from '@/navigation/navigation_routes.ts';
import { Start } from '@/pages/Start/Start.tsx';
import { Layout } from '@/components/layout/Layout.tsx';

export function App() {
  const location = useLocation();

  const element = useRoutes([
    {
      path: '/*',
      element: <Layout />,
      children: [
        ...[...navigation_routes, ...routes].map(({ path, Component }) => ({
          path,
          element: <Component />,
        })),
      ],
    },
    {
      path: '/',
      element: <Start />,
    },
    { path: '*', element: <Navigate to='/' /> },
  ]);

  useEffect(() => {
    if (location.pathname !== '/') {
      document.body.style.backgroundImage = 'none';

      const logoElement = document.getElementById('logo');
      if (logoElement) logoElement.style.display = 'none';
    }
  }, [location]);

  if (!element) return null;

  return element;
}
