'use client';
import Image from "next/image";
import { useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const router = useRouter();
    const { user } = useUser();
    const create=useMutation(api.documents.create);

    const onCreate=()=>{
        const promise=create({title:"Untitled document"})
        .then((documentId)=>router.push(`/documents/${documentId}`));
        toast.promise(promise,{
            loading:'Creating document...',
            success:'Document created',
            error:'Failed to create document'
        });
    }
  
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src='/empty-light.png' width={300} height={300} alt='empty' className="dark:hidden" />
            <Image src='/empty.png' width={300} height={300} alt='empty' className="hidden dark:block" />
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Notion-clone
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a new document
            </Button>
        </div>
    );
}

export default DocumentsPage;