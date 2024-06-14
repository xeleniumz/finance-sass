"use client"
import { useMountedState } from "react-use";
import { NewSheetAccount } from "@/features/accounts/components/new-account-sheet"

export const SheetProvider = () => {
      const isMounted = useMountedState();

  if (!isMounted) return null;
    return (
        <>
            <NewSheetAccount />
        </>
    )
}