'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'

function Page() {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [user, setUser] = React.useState({
        email: "",
 

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSend = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/verifyemaillinksend", user);
            setMessage("Email sent");
            console.log("email sent", response.data);
            setLoading(false);

        } catch (error: any) {
            console.log('error', error);
            setError(error.response.data.error);
            setLoading(false);

        }

    }
    return (
        <div className='flex flex-col justify-center items-center my-auto h-max'>
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <p className=' text-red-500'>
                {error ? error : ``}
            </p>
            <p>
                {message && message}
            </p>
            <button
                onClick={onSend}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >{loading ? "Processing" : ' Send Verification Link To Your Email'}</button>

        </div>
    )
}

export default Page