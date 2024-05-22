'use client'
import React, { useState } from 'react'
import PageUi from '@/components/page/pageui'
import { Button } from "@/components/ui/button"
import Input from "@/components/input/Input"
import { useForm } from 'react-hook-form'
import authService from '@/config/auth/auth'
import { Loader2 } from "lucide-react"




function page() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const login = async (data: any) => {
        setLoading(true)
        try {

            await authService.login(data)
            setLoading(false)

        } catch (error: any) {

            setError(error.message)
            setLoading(false)

        }
    }

    return (
        <PageUi
            className=' flex flex-col items-center justify-center'
        >
            <p className='text-red-500' > {error} </p>
            <div
                className='w-max h-max'
            >
                <form
                    onSubmit={handleSubmit(login)}
                    className=' flex flex-col items-center justify-center gap-3 text-center '
                >

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
        </PageUi>
    )
}

export default page