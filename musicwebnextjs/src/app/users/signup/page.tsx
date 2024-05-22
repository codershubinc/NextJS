'use client'
import React, { useState } from 'react'
import PageUi from '@/components/page/pageui'
import { Button } from "@/components/ui/button"
import Input from "@/components/input/Input"
import { useForm } from 'react-hook-form'
import authService from '@/config/auth/auth'
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"

function page() {
    const { register, handleSubmit } = useForm()
    const navigate: any = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const signUp = async (data: any) => {
        setLoading(true)
        console.log(data)

        try {
            const userAccount = await authService.createAccount(data)
            setLoading(false)
            if (userAccount) {
                const user = await authService.getCurrentUser()
                const userId = user?.$id
                navigate.push(`/userdashboard/${userId}`)
            }

        } catch (error: any) {
            setError(error.message)
            setLoading(false)

        }
    }
    return (
        <PageUi
            className=' flex  flex-col items-center justify-center'
        >
            <p className='text-red-500' > {error} </p>
            <div
                className='w-max h-max'
            >
                <form
                    onSubmit={handleSubmit(signUp)}
                    className=' flex flex-col items-center justify-center gap-3 text-center '
                >
                    <Input
                        placeholder="name"
                        className="w-full "
                        type="text"
                        label="name"
                        required={true}
                        id="name"
                        {...register("name")}

                    />

                    <Input
                        placeholder="email"
                        className="w-full "
                        type="email"
                        label="Email"
                        required={true}
                        id="email"
                        {...register("email")}

                    />

                    <Input
                        placeholder="password"
                        className="w-full "
                        type="password"
                        label="Password"
                        required={true}
                        id="password"
                        {...register("password")}

                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Accept terms and conditions
                        </label>
                    </div>


                    {
                        loading
                            ?
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                            :
                            <Button
                                variant="outline"
                                type='submit'
                            >Login</Button>
                    }
                </form>
            </div>
            <Button
                variant="outline"
                onClick={() => navigate.push('/users/login')}
            >Login</Button>

            <Button
                variant="outline"
                onClick={async () => await authService.logout()}
            >logOut</Button>

        </PageUi>
    )
}

export default page