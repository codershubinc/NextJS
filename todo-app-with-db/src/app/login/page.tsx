'use client'
import authService from '@/config/auth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';

function Page() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const router = useRouter()

    const login = async (data: any) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    console.log("userData", userData)
                    router.push("/")
                }
            }
        } catch (error: any) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex  min-h-screen  items-center justify-between p-24 bg-black text-white'
        >

            <div
                className="flex flex-col p-3 rounded-3xl  w-max  min-w-[350px] gap-1.5 justify-center items-center bg-slate-900 h-max mx-auto  shadow-md shadow-slate-500"
            >
                <p className='text-red-500 w-[300px]'> {error ? error : " "} </p>

                <form onSubmit={handleSubmit(login)} className='min-w-[90%] w-max mx-auto flex flex-col justify-center items-center'>
                    <h2 className='text-2xl text-center'>Login</h2>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                            htmlFor="email"
                        >
                            Email
                        </Label>
                        <Input
                            type="text"
                            id="todo title"
                            placeholder="Email"
                            required
                            {...register("email")}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">PassWord</Label>
                        <Input
                            type="text"
                            id="todo message"
                            placeholder="Enter password"
                            required
                            {...register("password")}
                        />
                    </div>
                    <Button variant="outline" type="submit" className='w-full mt-3'>
                        login
                    </Button>
                </form>
                <Button variant="outline" className='w-full mt-3' onClick={() => authService.logout()} >LogOut</Button>
            </div>
        </div>
    )
}

export default Page