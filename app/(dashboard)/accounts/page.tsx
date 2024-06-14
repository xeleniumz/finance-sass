'use client';

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Payment, columns } from "./columns";


const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
     {
        id: "728ed52f",
        amount: 100,
        status: "success",
        email: "b@example.com",
    },
        {
        id: "728ed52f",
        amount: 100,
        status: "failed",
        email: "c@example.com",
    },
];
 
const Page = () => {
    const newAccount = useNewAccount();
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
                        data={data}
                        filterKey="email"
                        onDelete={() => { }}
                        disabled={false}
                    />
                </CardContent>
          </Card>
    </div>
  )
}

export default Page;