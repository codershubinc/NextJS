'use client'
import React, { useState } from 'react';
import PageUi from '@/components/page/pageui';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AuthUser from './authUser';
import LogOutBtn from '@/components/Buttons/LogOutBtn';
import { useRouter } from 'next/navigation';
import UserAvatar from './userAvatar';

const Page: React.FC = () => {
    const [user, setUser] = useState<any>({});
    const navigate = useRouter()
    const { isUserLogin, currentUser, userPrefs } = useAuth()


    console.log('userPrefs', userPrefs);
    console.log(user);
    console.log(isUserLogin);




    return (
        <PageUi className=''>
            <UserAvatar user={userPrefs} />
            <>
                {
                    isUserLogin ?
                        <>
                            {userPrefs.userName + userPrefs.email + userPrefs.name}
                        </>
                        :
                        <></>}
                {
                    isUserLogin ?
                        <LogOutBtn
                            path='/users/userdashboard'
                            className=''

                        />
                        :
                        <>
                            <Button
                                onClick={() => navigate.push('/users/login')}
                                variant={'outline'}
                            >
                                Log In
                            </Button>

                        </>
                }
            </>


        </PageUi>
    );
};

export default Page;
