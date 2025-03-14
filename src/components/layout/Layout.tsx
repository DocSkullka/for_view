import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar/Navbar.tsx';
import Fullscreen from '../fullscreen/Fullscreen'; 

export function Layout() {
  return (
    <>
      <Outlet />
      <Navbar />
      <Fullscreen />
    </>
  );
}
