'use client';

import { Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/data-table";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

import {  columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";


const Page = () => {
    const newCategory = useNewCategory();
    const categoriesQuery = useGetCategories();
    const deleteCategories= useBulkDeleteCategories();
    const categories = categoriesQuery.data || [];

    const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

    if (categoriesQuery.isLoading) {
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
                    Categories page
                  </CardTitle>
                  <Button size="sm" onClick={newCategory.onOpen}>
                      <Plus className="size-4 mr-2"/>
                      Add new
                  </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={categories}
                        filterKey="name"
                        onDelete={(row) => { 
                            const ids = row.map((r) => r.original.id);
                            deleteCategories.mutate({ ids });
                        }}
                        disabled={isDisabled}
                        tableName="categories"
                    />
                </CardContent>
          </Card>
    </div>
  )
}

export default Page;