'use client';

import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccount } from "@/features/accounts/api/use-bulk-delete";

import {  columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from "react";

 
const Page = () => {
    const newAccount = useNewAccount();
    const accountsQuery = useGetAccounts();
    const deleteAccounts = useBulkDeleteAccount();
    const accounts = accountsQuery.data || [];

    const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

    if (accountsQuery.isLoading) {
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
                    Account page
                  </CardTitle>
                  <Button size="sm" onClick={newAccount.onOpen}>
                      <Plus className="size-4 mr-2"/>
                      Add new
                  </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={accounts}
                        filterKey="name"
                        onDelete={(row) => { 
                            const ids = row.map((r) => r.original.id);
                            deleteAccounts.mutate({ ids });
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
          </Card>
    </div>
  )
}

export default Page;