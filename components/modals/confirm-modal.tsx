'use client';


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";

  interface ConfirmModalProps {
    children: React.ReactNode;
 onConfirm: () => void;
}

 export const ConfirmModal=({
    children,
    onConfirm}:ConfirmModalProps)=>{
        const handleConfirm=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        event.stopPropagation();
        onConfirm();
        }

 return(
        <AlertDialog>
            <AlertDialogTrigger onClick={(e)=>e.stopPropagation()}  asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to delete this document?
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleConfirm}>Yes</AlertDialogAction>
                    <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>No</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
 )
}