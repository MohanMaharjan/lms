import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';

const loginPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="items-center hidden h-screen lg:flex flex-center">
          <Image
            src="/auth_img.svg"
            width={500}
            height={500}
            alt="Auth Image"
            className="object-contain w-full"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-start justify-start w-full mb-6 px-4 md:w-[500px]">
            <Image src="/achs.png" width={150} height={80} alt="ACHS" />
            <h1 className="mt-2 text-2xl font-bold text-cabbage">
              Where Innovation Meets Excellence
            </h1>
          </div>
          <Tabs defaultValue="login" className="w-full p-2 lg:w-[500px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">login</TabsTrigger>
              <TabsTrigger value="register">register</TabsTrigger>
            </TabsList>

            <Login />
            <Register />
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default loginPage;
