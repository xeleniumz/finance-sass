"use client"
import { useMountedState } from "react-use";
import { NewSheetAccount } from "@/features/accounts/components/new-account-sheet"
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewSheetCategory } from "@/features/categories/components/new-category-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";


export const SheetProvider = () => {
    const isMounted = useMountedState();

    if (!isMounted) return null;
        return (
            <>
                <NewSheetAccount />
                <EditAccountSheet />

                <NewSheetCategory />
                <EditCategorySheet />

                <NewTransactionSheet />
         
            </>
        )
}