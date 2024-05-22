'use client'
import React, { useState } from 'react';
import PageUi from '@/components/page/pageui';
import { Button } from "@/components/ui/button";
import Input from "@/components/input/Input";
import { useForm, SubmitHandler } from 'react-hook-form';
import authService from '@/config/auth/auth';
import { Loader2 } from "lucide-react";
import cryptoUtil from '@/lib/util/CryptoUtil';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
    email: string;
    password: string;
}

const Page: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const login: SubmitHandler<LoginFormInputs> = async (data) => {
        setLoading(true);
        try {
            await authService.login(data);
            const user = await authService.getCurrentUser();
            const userId = user?.$id ? cryptoUtil.encryptString(String(user.$id)) : '';
            router.push(`/userdashboard?userId=${userId}`);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await authService.logout();
    };

    return (
        <PageUi className='flex flex-col items-center justify-center'>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='w-max h-max'>
                <form
                    onSubmit={handleSubmit(login)}
                    className='flex flex-col items-center justify-center gap-3 text-center'
                >
                    <Input
                        placeholder="email"
                        className="w-full"
                        type="email"
                        label="Email"
                        required
                        id="email"
                        {...register("email")}
                    />
                    <Input
                        placeholder="password"
                        className="w-full"
                        type="password"
                        label="Password"
                        required
                        id="password"
                        {...register("password")}
                    />
                    {loading ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button variant="outline" type='submit'>
                            Login
                        </Button>
                    )}
                </form>
                <Button variant="outline" onClick={handleLogout}>
                    LogOut
                </Button>
            </div>
        </PageUi>
    );
};

export default Page;
