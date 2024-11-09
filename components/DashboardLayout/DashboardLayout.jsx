'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session data is loaded
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect to login if no session exists
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading indicator while session is being determined
  }

  if (status === 'authenticated') {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-screen">
          <div className="relative flex flex-col items-center justify-between w-full h-full">
            <div className="w-full h-12 ">
              <Navbar />
            </div>
            <div className="flex-1 w-full">{children}</div>
          </div>
        </div>
      </>
    );
  }

  return null; // Render nothing if unauthenticated to prevent layout from flickering
};

export default DashboardLayout;
