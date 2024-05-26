'use client';
import React, { useEffect, useState } from 'react';
import PageUi from '@/components/page/pageui';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import LogOutBtn from '@/components/Buttons/LogOutBtn';
import UserAvatar from './userAvatar';
import cryptoUtil from '@/lib/util/CryptoUtil';
import dbConfig from '@/config/dataBase/userPrefs/UserDBConfig';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CopyButton from '@/components/Buttons/CopyBtn';
import AvatarChange from './AvatarChange';

const UserDashboard: React.FC = () => {
    const [currentUserPrefs, setCurrentUserPrefs] = useState<any>({});
    const [isMyDashboard, setIsMyDashboard] = useState(true);
    const router = useRouter();
    const { isUserLogin, currentUser, userPrefs } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const encryptedUserId = params.get('userId');
        const IdInUrl = encryptedUserId ? cryptoUtil.decryptString(encryptedUserId) : '';

        const fetchUser = async () => {
            try {
                if (IdInUrl === currentUser?.$id || IdInUrl === '') {
                    setCurrentUserPrefs(userPrefs);
                    setIsMyDashboard(true);
                } else {
                    const user = await dbConfig.getDocument(IdInUrl);
                    setCurrentUserPrefs(user);
                    setIsMyDashboard(false);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [currentUser, userPrefs]);

    const userDashboardUrl = `/users/userdashboard?userId=${cryptoUtil.encryptString(currentUser?.$id)}`;

    return (
        <PageUi>
            {!isMyDashboard && (
                <Link
                    href={userDashboardUrl}
                    className='fixed top-[50px] right-5'
                >
                    Visit Your Dashboard
                </Link>
            )}
            <div className='flex flex-col items-center justify-center w-max'>
                <UserAvatar />
                {isUserLogin ? (
                    <>
                        <Card className='w-full flex flex-col items-center justify-center mx-auto'>
                            <CardHeader>
                                <CardTitle>Name: {currentUserPrefs.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardTitle>UserName: {currentUserPrefs.userName}</CardTitle>
                                <CardDescription>Email: {currentUserPrefs.email}</CardDescription>
                            </CardContent>
                            <CardFooter>
                                <div className='flex gap-2'>
                                    {isMyDashboard && <LogOutBtn path='/users/login' className='' />}
                                    <CopyButton textToCopy={window.location.href} />
                                </div>
                            </CardFooter>
                        </Card>
                        <AvatarChange />
                    </>
                ) : (
                    <Button onClick={() => router.push('/users/login')} variant='outline'>
                        Log In
                    </Button>
                )}
            </div>
        </PageUi>
    );
};

export default UserDashboard;
