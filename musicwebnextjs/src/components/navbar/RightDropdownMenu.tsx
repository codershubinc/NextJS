'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  


function RightDropdownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>open</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Section</DropdownMenuLabel>
                <DropdownMenuItem>Submenu item 1</DropdownMenuItem>
                <DropdownMenuItem>Submenu item 2</DropdownMenuItem> 
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default RightDropdownMenu