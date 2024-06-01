'use client'
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

function DropDownMenuForCard({ id }: any) {
    const router = useRouter()
    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0  right-0">
                    <img src="   https://cdn-icons-png.flaticon.com/512/15222/15222649.png " className='h-8 w-8' alt="" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
                <DropdownMenuItem>

                    <Button variant="ghost" className='w-full' onClick={() => router.push(`/edit?id=${id}`)} >Edit</Button>

                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>

                    <Button variant="ghost" className='w-full' onClick={() => router.push(`/delete?id=${id}`)} >Delete</Button>

                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>

    )
}

export default DropDownMenuForCard