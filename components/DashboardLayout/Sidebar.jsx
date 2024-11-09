'use client';
import React from 'react';
import { HomeIcon, UsersIcon } from '@heroicons/react/24/outline';
import { HiAcademicCap } from 'react-icons/hi';
import { FaCogs } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdLocalPostOffice } from 'react-icons/md';
const Sidebar = ({ hasRole, hasPermission }) => {
  const pathname = usePathname();

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div className="fixed z-10 h-screen bg-gradient-to-r from-transparent to-gray-300 text-center shadow-lg text-gray-600 flex flex-col items-center">
      <Link
        href="/dashboard"
        className={classNames(
          pathname === '/dashboard'
            ? 'bg-white text-[#5b5fc7] shadow-none'
            : 'text-gray-700 hover:bg-gray-500 hover:text-white',
          'flex flex-col justify-center items-center group hover:bg-white w-full p-2 '
        )}
      >
        <HomeIcon className="w-6 h-6 group-hover:text-[#5b5fc7]" />
        <span className="text-[12px] group-hover:text-[#5b5fc7]">Home</span>
      </Link>
      {hasPermission('Open Users') && (
        <>
          <Link
            href="/dashboard/users"
            className={classNames(
              pathname === '/dashboard/users'
                ? 'bg-white text-[#5b5fc7] shadow-none'
                : 'text-gray-700 hover:bg-gray-500 hover:text-white',
              'flex flex-col justify-center items-center group hover:bg-white w-full p-2 '
            )}
          >
            <UsersIcon className="w-6 h-6 group-hover:text-[#5b5fc7]" />
            <span className="text-[12px] group-hover:text-[#5b5fc7]">
              Users
            </span>
          </Link>
        </>
      )}
      {hasPermission('Open College') && (
        <Link
          href="/dashboard/college"
          className={classNames(
            pathname === '/dashboard/college'
              ? 'bg-white text-[#5b5fc7] shadow-none'
              : 'text-gray-700 hover:bg-gray-500 hover:text-white',
            'flex flex-col justify-center items-center group hover:bg-white w-full p-2 '
          )}
        >
          <HiAcademicCap className="w-6 h-6 group-hover:text-[#5b5fc7]" />
          <span className="text-[12px] group-hover:text-[#5b5fc7]">
            College
          </span>
        </Link>
      )}
      {hasPermission('Open Roles') && (
        <Link
          href="/dashboard/roles"
          className={classNames(
            pathname === '/dashboard/roles'
              ? 'bg-white text-[#5b5fc7] shadow-none'
              : 'text-gray-700 hover:bg-gray-500 hover:text-white',
            'flex flex-col justify-center items-center group hover:bg-white w-full p-2 '
          )}
        >
          <FaCogs className="w-6 h-6 group-hover:text-[#5b5fc7]" />
          <span className="text-[12px] group-hover:text-[#5b5fc7]">Roles</span>
        </Link>
      )}
      {hasPermission('Open Posts') && (
        <Link
          href="/dashboard/posts"
          className={classNames(
            pathname === '/dashboard/posts'
              ? 'bg-white text-[#5b5fc7] shadow-none'
              : 'text-gray-700 hover:bg-gray-500 hover:text-white',
            'flex flex-col justify-center items-center group hover:bg-white w-full p-2 '
          )}
        >
          <MdLocalPostOffice className="w-6 h-6 group-hover:text-[#5b5fc7]" />
          <span className="text-[12px] group-hover:text-[#5b5fc7]">Posts</span>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
