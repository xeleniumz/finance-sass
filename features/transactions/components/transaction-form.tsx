import { z } from 'zod';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';    

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { insertAccountSchema, insertTransactionSchema } from '@/db/schema';


import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Select } from '@/components/select';

const formSchema = z.object({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
});

const apiFormSchema = insertTransactionSchema.omit({
    id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.output<typeof apiFormSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountsOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountsOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });
    const handleSubmit = (values: FormValues) => {
        console.log({values});
    };
    const handleDelete = () => {
        onDelete?.();
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 pt-4"
            >
                <FormField
                    name="accountId"
                    control={form.control}
                    render={(({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder='Select an account'
                                    options={accountsOptions}
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled} 
                                />
                            </FormControl>
                        </FormItem>
                    ))}
                />
                <Button
                    className='w-full'
                    disabled={disabled}
                >
                    {id ? "Save changes" : "Create account"}
                </Button>
                {!!id &&
                    <Button
                        type='button'
                        className='w-full'
                        disabled={disabled}
                        onClick={handleDelete}
                        size="icon"
                        variant='outline'
                    >
                        <Trash className='size-4 mr-2' />
                        Delete Account
                    </Button>
                }
            </form>
        </Form>
    )
};