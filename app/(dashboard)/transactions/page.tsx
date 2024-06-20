'use client';

import { useState } from 'react';
import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";

import { transactions as transactionSchema } from "@/db/schema";

import {  columns } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { toast } from 'sonner';
import { useBulkCreateransactions } from '@/features/transactions/api/use-bulk-create-transactions';


enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT",

}

const INITIAL_IMPORT_RESULT = {
    data: [],
    errors: [],
    meta: {},
}

 
const Page = () => {
    const [AccountDialog, confirm] = useSelectAccount();

    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULT);

    const onUpload = (result: typeof INITIAL_IMPORT_RESULT) => {
        setImportResults(result);
        setVariant(VARIANTS.IMPORT);
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULT);
        setVariant(VARIANTS.LIST);
    }

    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const createTransactions = useBulkCreateransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

    const onSubmitImport = async (value: typeof transactionSchema.$inferInsert[]) => {
        const accountId = await confirm();
        if (!accountId) {
            return toast.error("Please select an account to continue.");
        }
        
        const data = value.map((item) => ({ ...item, accountId: accountId as string }));
        
        createTransactions.mutate(data, {
            onSuccess: () => {
                onCancelImport();
            }
        
        });
    }

    if (transactionsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="w-1/4 h-6" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center" >
                            <Loader2 className="size-7 text-slate-300 animate-spin" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <>
                <AccountDialog />
                <ImportCard
                    data={importResults.data}
                    onCancel={onCancelImport}
                    onSubmit={onSubmitImport}
                />
            </>
        );
    }

    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
              <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                  <CardTitle className="text-lg line-clamp-1">
                    Transactions History
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                        <Button
                            size="sm"
                            onClick={newTransaction.onOpen}
                            className="w-full lg:w-auto"
                        >
                            <Plus className="size-4 mr-2"/>
                            Add new
                        </Button>
                        <UploadButton
                            onUpload={onUpload}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="payee"
                        onDelete={(row) => { 
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        tableName="transactions"
                    />
                </CardContent>
          </Card>
    </div>
  )
}

export default Page;