"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";


export const Heading = () => {
    const{isAuthenticated,isLoading}=useConvexAuth();
    return (  
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Make Documents & Plans Welcome 
                to <span className="underline">Notion Clone</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                A Notion clone built with Next.js.<br />
                workspace  with your team, share documents, and more.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                <Spinner size='lg' />
                </div>
            )}
            {isAuthenticated && !isLoading && (
            <Button asChild>
                <Link href='/documents'>
                Get Started 
                <ArrowRight className="h-4 w-4 ml-2"/>
                </Link>
            </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode='modal'>
                    <Button>
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Button>
                    </SignInButton>)}
        </div>
     );
}
 
