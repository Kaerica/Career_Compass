'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

export function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on dashboard pages (sidebar handles navigation)
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  return <Navbar />;
}


