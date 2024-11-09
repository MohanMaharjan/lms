'use client';
import '../globals.css';

import { SessionProvider } from 'next-auth/react';

import AuthProvider from '@/context/AuthProvider';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthProvider>
            <DashboardLayout children={children} />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
