'use client';

import { useState } from "react";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { Button } from '@/components/ui/button';
import NavButton from '@/components/NavButton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


const routs = [
    {
        href: '/',
        label: 'Overview'
    },
    {
        href: '/transactions',
        label: 'Transactions'
    },
    {
        href: '/accounts',
        label: 'Accounts'
    }, {
        href: '/categories',
        label: 'Categories'
    }, {
        href: '/settings',
        label: 'Settings'
    }
]


const Navigation = () => {
    const [isOpened, setIsOpened] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia('(max-width: 1024px)', false);
    const onClick = (href: string) => {
        router.push(href);
        setIsOpened(false);
    };

    if (isMobile) {
        return (
            <Sheet open={isOpened} onOpenChange={setIsOpened}>
                <SheetTrigger>
                    <Button
                        variant='outline'
                        size='sm'
                        className='font-normal bg-white/10 
                        hover:bg-white/20 hover:text-white border-none
                        focus-visible:ring-offset-0 
                        focus-visible:ring-offset-transparent outline-none 
                        text-white focus:bg-white/30 transition
                        '
                    >
                        <Menu
                            className='size-4'
                        />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className='px-4'>
                    <nav className='flex flex-col gap-y-2 pt-6'>
                        {routs.map((route, index) => (
                            <Button
                                variant={route.href === pathname ? 'secondary' : 'ghost'}
                                key={index}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
            {routs.map((route, index) => (
                <NavButton
                    key={index}
                    href={route.href}
                    label={route.label}
                    isActive={pathname === route.href}
                />
            ))}
        </nav>
    )
}

export default Navigation