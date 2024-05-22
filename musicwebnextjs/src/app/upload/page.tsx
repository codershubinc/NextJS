'use client'
import PageUi from "@/components/page/pageui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import music from "@/config/dataBase/playListsDb/music"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"

function page() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const upload = async (data: any) => {
        try {
            const uploadedMusic = data.music[0] ? await music.uploadMusic(data.music[0]) : null

            console.log(uploadedMusic)

        } catch (error: any) {
            setError(error.message)
        }
    }


    return (
        <PageUi
            className="grid h-screen place-items-center"
        >
            <form
                onSubmit={handleSubmit(upload)}
            >
                <p
                    className="text-red-500"
                >
                    {error}
                </p>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="music">music</Label>
                    <Input
                        id="music"
                        type="file"
                        accept="audio/*"
                        {...register("music")}
                    />

                    <Button
                        type="submit"
                    >
                        Upload
                    </Button>
                </div>
            </form>
        </PageUi>
    )
}

export default page