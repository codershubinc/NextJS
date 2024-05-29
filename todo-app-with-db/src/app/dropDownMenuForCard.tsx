'use client'
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import React from 'react'

function DropDownMenuForCard({ id }: any) {
    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0  right-0">Open</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent >

                <DropdownMenuItem>
                    <Link href={`/edit?id=${id}`}><Button variant="ghost" className='w-full' >Edit</Button></Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={`/delete?id=${id}`}><Button variant="ghost" className='w-max'  >Delete</Button></Link>
                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>

    )
}

export default DropDownMenuForCard