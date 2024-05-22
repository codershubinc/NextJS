'use client'
import { cn } from '@/lib/utils'
import React from 'react'
import RightDropdownMenu from './RightDropdownMenu'
import { ModeToggle } from '@/components/ui/themeBtn'

function Navbar({ className }: { className: string }) {
    return (
        <header
            className='  dark:bg-black dark:text-white sticky top-0  '
        >
            <nav
                className={cn("flex items-center h-[45px] dark:bg-[#212121] justify-between p-4  mx-8 rounded-full mt-2", className)}
            >
                <h1>Navbar</h1>
                <div
                    className='flex items-center gap-4 '
                >
                    <ModeToggle />
                    <RightDropdownMenu />
                </div>
            </nav>
        </header>
    )
}

export default Navbar