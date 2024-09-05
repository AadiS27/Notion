'use client';

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Skeleton } from "@/components/ui/skeleton";

   

interface MenuProps {
    documentId: Id<'documents'>;
}

export const Menu = ({documentId}:MenuProps) => {
    const router=useRouter();
const {user}=useUser();

const archive=useMutation(api.documents.archive);

const onArchive=()=>{
    const promise=archive({id :documentId });
    toast.promise(promise,{
        loading:'Moving to Trash...',
        success:'Moved to Trash',
        error:'Failed to archive'
    });

    router.push('/documents');
}
    return (
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
        <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align='end' alignOffset={8} forceMount>
            <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2"/>
                Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
                Last edited by {user?.fullName}
            </div>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton(){
    return (
       <Skeleton className="h-9 w-9" />
    )
}