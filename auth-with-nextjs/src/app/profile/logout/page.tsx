'use client'
import axios from 'axios';
import router from 'next/router';
import React from 'react'
import toast from 'react-hot-toast';

function Page() {
    const logout = async () => {

        try {
            console.log("logging out");
            const response = await axios.get('/api/users/logout')
            toast.success('Logout successful' + response.data.message)
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (

        <button onClick={logout}>Logout</button>

    )
}

export default Page