"use client";

import { useEffect,useState } from "react";
import { Command, File, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandDialog
  } from "@/components/ui/command";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";

export const SearchCommand = () => {
    const router=useRouter();
    const {user}=useUser();
    const documents=useQuery(api.documents.getSearch);
    const[isMounted,setIsMounted]=useState(false);

    const toggle=useSearch((store)=>store.toggle);
    const isOpen=useSearch((store)=>store.isOpen);
    const onClose=useSearch((store)=>store.onClose);

    const onSelect = (value: string) => {
        const [id] = value.split('-');
        router.push(`/documents/${id}`);
        onClose();
    };

    useEffect(() => {
        setIsMounted(true);
    }
    ,[]);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };

        window.addEventListener('keydown', down);

        return () => {
            window.removeEventListener('keydown', down);
        };
    }, [toggle]);

    if(!isMounted){
        return null;
    }

    return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput
        placeholder={`Search${user?.fullName}'s documents`}
        />
        <CommandList>
            <CommandEmpty>No result found</CommandEmpty>
            <CommandGroup heading="Documents">
            {documents?.map((document)=>( 
                <CommandItem
                key={document._id}
                value={`${document._id}-${document.title}`}
                title={document.title}
                onSelect={onSelect}>
                    {document.icon?(
                        <p className="mr-2 text-[18px]">{document.icon}</p>
                    ):(
                        <File className="mr-2 w-4 h-4" />
                    )}
                    <span>{document.title}
                    </span>

                </CommandItem>
                ))}
            </CommandGroup>
        </CommandList>

    </CommandDialog>
    )
}
   