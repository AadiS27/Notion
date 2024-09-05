'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Error=()=>{
    return(
        <div className='h-full flex justify-center space-y-4 flex-col items-center'>
            <Image src="/logo.png" width={200} height={200} alt="Error" className='dark:hidden'/>
            <Image src="/logo-dark.png" width={200} height={200} alt="Error" className='hidden dark:block'/>
            <h2 className='text-xl font-bold'>Something went wrong!</h2>
        <Button asChild>
            <Link href='/documents'>
            Go back
            </Link>

        </Button>
        </div>
    )
}

export default Error;