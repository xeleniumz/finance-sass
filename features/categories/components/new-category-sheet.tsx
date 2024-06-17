import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({
    name: true,
});
type FormValues = z.input<typeof formSchema>;

export const NewSheetCategory = () => {

    const { isOpen, onClose } = useNewCategory();
    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>Create a new category</SheetTitle>
                    <SheetDescription>
                        Category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    defaultValues={{
                        name: "",
                    }}
                />
            </SheetContent>
        </Sheet>
    )
}