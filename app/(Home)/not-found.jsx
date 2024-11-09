import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const notFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image
        src="/404.svg"
        alt="404"
        width={500}
        height={500}
        className="object-contain"
      />
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default notFound;
