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
import React from 'react'

function DropDownMenuForCard({ id }: any) {
    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0  right-0">
                    <img src="   https://cdn-icons-png.flaticon.com/512/15222/15222649.png " className='h-8 w-8' alt="" />
                </Button>
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