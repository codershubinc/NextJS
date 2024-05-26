'use client'
import React, { useState } from 'react'
import PageUi from '@/components/page/pageui'
import { useAuth } from '@/context/AuthContext'
import SignUpForm from './signUpForm'
import Link from 'next/link'

const { isUserLogin } = useAuth()
function page() {

    if (isUserLogin) {
        return <PageUi
            className=' '
        >
            <h1
                className='text-3xl font-bold  '
            >
                You are already logged in
            </h1>
            <Link href={'/users/userdashboard'}>
                <h1
                    className='text-3xl font-bold  '
                >
                    Click here to go to dashboard
                </h1>
            </Link>
        </PageUi>

    }
    return (
        <PageUi
            className=' flex  flex-col items-center justify-center'
        >
            <SignUpForm />
        </PageUi>
    )
}

export default page