'use client'
import React from 'react'
import PageUi from '@/components/page/pageui'
import { useParams } from 'next/navigation'

function page() {

    const userId: any = useParams<{ userId: string }>()

        
    return (
        <PageUi
            className=' '
        >
            <p>
                Welcome to your dashboard {userId.Query}
            </p>

        </PageUi>
    )
}

export default page