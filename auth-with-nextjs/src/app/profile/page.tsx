"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState<any>()
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

    const getUserDetails = async () => {
        try {
            console.log("get user details");

            const res = await axios.get('/api/users/me')
            console.log(res.data);
            setData(res.data.data)
            console.log('data', res.data.data);

        } catch (error: any) {
            console.log(error.message);

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            {data?.isVerified ? `userVerified` : `not verified`}
            <h2
                className="p-1 rounded bg-green-500">
                {data?.username ? <Link href={`/profile/${data?.username}`}>{data?.username}</Link> : "Nothing"}

            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>


        </div>
    )
}