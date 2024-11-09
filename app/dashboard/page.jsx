'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
