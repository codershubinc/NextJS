"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <nav
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50  ", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem
                    item="Home"
                    active={active}
                    setActive={setActive}
                >
                    <div
                        className="flex flex-col"
                    >
                        <HoveredLink href="/">Home</HoveredLink>
                        <HoveredLink href="/about">About</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem
                    item="About"
                    active={active}
                    setActive={setActive}
                >
                    <HoveredLink href="/about">About</HoveredLink>
                </MenuItem>
            </Menu>
        </ nav>
    )
}

export default Navbar
