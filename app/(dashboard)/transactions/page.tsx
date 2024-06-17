'use client';

import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table";

import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

import {  columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

 
const Page = () => {
    const newTransaction = useNewTransaction();
    const transactionsQuery = useGetTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactions = transactionsQuery.data || [];

    const isDisabled = transactionsQuery.isLoading || deleteTransactions.isPending;

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

    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card
            className="border-none drop-shadow-sm"
          >
              <CardHeader
                className="gap-y-2 lg:flex-row lg:items-center lg:justify-between"
              >
                  <CardTitle
                    className="text-lg line-clamp-1"
                  >
                    Transactions History
                  </CardTitle>
                  <Button size="sm" onClick={newTransaction.onOpen}>
                      <Plus className="size-4 mr-2"/>
                      Add new
                  </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={transactions}
                        filterKey="name"
                        onDelete={(row) => { 
                            const ids = row.map((r) => r.original.id);
                            deleteTransactions.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        tableName="accounts"
                    />
                </CardContent>
          </Card>
    </div>
  )
}

export default Page;