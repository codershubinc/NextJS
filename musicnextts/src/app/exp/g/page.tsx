'use client'
import React from 'react'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { Roboto, IBM_Plex_Mono } from 'next/font/google'

const roboto = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '700']
})
export default function page() {
    return (
        <div>
            <h1
                className={`text-3xl    text-center text-slate-600 font-[Cute_Font]   ` + roboto.className}
            >
                Page

            </h1>
            <h1
                className='text-3xl  mt-10 fixed bottom-0  text-center text-slate-600   md:   '
            >
                this is exp
            </h1>
            <BackgroundBeams />
            
        </div>
    )
}


