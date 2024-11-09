'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { PiDotsNineBold, PiDotsThreeBold } from 'react-icons/pi';
import {
  MagnifyingGlassIcon,
  MagnifyingGlassMinusIcon,
} from '@heroicons/react/24/outline';
import { RiShareBoxLine } from 'react-icons/ri';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn, useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const handleLeftClick = (event) => {
    if (event.button === 0) {
      console.log('Left mouse button clicked');
      // Add your left click logic here
    }
  };

  const handleRightClick = (event) => {
    if (event.button === 2) {
      event.preventDefault(); // Prevent right-click context menu

      // Add your right click logic here
    }
  };

  const [showMessage, setShowMessage] = useState(false);
  const [showAvatarMessage, setShowAvatarMessage] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowAvatarMessage(!showAvatarMessage);
    setShowProfile(!showProfile);
  };
  const handleLogout = async () => {
    try {
      // Send request to logout endpoint on the backend
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`, // Include the bearer token in the request headers
          },
        }
      );

      if (response.status === 200) {
        // Logout from NextAuth without redirecting
        await signOut({ callbackUrl: '/login' });

        // Redirect to login page after successful logout
        router.push('/login');
      } else {
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <>
      <div
        className="text-gray-700 h-12 flex items-center  border-b-[1px] border-gray-300 p-0 m-0 "
        onMouseDown={handleLeftClick}
        onContextMenu={handleRightClick}
      >
        <div className="z-0 flex items-center justify-start w-full text-center">
          <button className="w-[58px] hover:bg-white text-center flex items-center justify-center hover:shadow-lg  ">
            <PiDotsNineBold className="w-6 h-6 m-3" />
          </button>
          <div className="flex items-center justify-between w-full">
            <div>
              <Image
                src="/achs.svg"
                width={100}
                height={20}
                className="object-contain text-blue-400 "
                alt=""
              />
            </div>
            <div className="relative ">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2 mr-4 ">
              <div
                onMouseEnter={() => setShowAvatarMessage(true)}
                onMouseLeave={() => setShowAvatarMessage(false)}
                onClick={toggleProfile}
                className="relative"
              >
                <div className="rounded-full bg-rose-200 text-xs items-center justify-center flex font-bold text-rose-900   hover:ring-4 hover:ring-white cursor-pointer w-[30px] h-[30px]">
                  MM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed right-0 z-50 bg-blue-400 top-12">
        {showProfile && (
          <div className=" bg-white w-[330px] rounded-sm p-2 shadow-lg text-sm space-y-6  hover:bg-blue-300">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold ">achsnepal.edu.np</h3>
              <button
                className="text-xs text-gray-500 cursor-pointer hover:text-red-500"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
            <div className="flex items-start justify-start gap-x-2">
              <div className="rounded-full bg-rose-200 text-lg text-rose-900 items-center justify-center  flex   font-bold hover:ring-4 hover:ring-white cursor-pointer w-[45px] h-[45px]">
                MM
              </div>
              <div className="space-y-1 text-xs text-left">
                <h2 className="font-bold">Mohan Maharjan</h2>
                <p>mohan@achsnepal.edu.np</p>
                <p className="flex gap-2 cursor-pointer hover:text-red-500">
                  View account <RiShareBoxLine />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
