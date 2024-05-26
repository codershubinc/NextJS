'use client'
import React from 'react'
import PageUi from '@/components/page/pageui'
import { useAuth } from '@/context/AuthContext'
import SignUpForm from './signUpForm'
import Link from 'next/link'

function page() {
    const { isUserLogin } = useAuth();

    return (
        <PageUi>
            {isUserLogin ? (<Link href="/users/userdashboard">Go to Dashboard</Link>) : (<SignUpForm />)}
        </PageUi>
    )

}

export default page