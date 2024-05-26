'use client'
import React from 'react'
import PageUi from '@/components/page/pageui'
import { useAuth } from '@/context/AuthContext'
import SignUpForm from './signUpForm'
// import Link from 'next/link'


const  Page:React.FC = () => {
    const { isUserLogin } = useAuth();

  
    return (
        <PageUi
            className=' flex  flex-col items-center justify-center'
        >
            <div>
                <SignUpForm />

            </div>
        </PageUi>
    )
}

export default Page