'use client'
import React, { useEffect, useState } from 'react';
import PageUi from '@/components/page/pageui';
import { useSearchParams } from 'next/navigation';
import cryptoUtil from '@/lib/util/CryptoUtil';
import authService from '@/config/auth/auth';
import { Button } from '@/components/ui/button';
import dbConfig from '@/config/dataBase/userPrefs/UserDBConfig';

const Page: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [userId, setUserId] = useState<string>('');
    const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const userIdParam = searchParams.get("userId");
        if (userIdParam) {
            const decryptedUserId = cryptoUtil.decryptString(userIdParam);
            setUserId(decryptedUserId);
        } else if (user) {
            setUserId(user.$id);
        }
    }, [searchParams, user]);

    useEffect(() => {
        if (userId && userId === user?.$id) {
            setIsAuthUser(true);
        }
    }, [userId, user]);
    if (isAuthUser) {

    }

    const createDoc = async () => {

        try {
            const userId = user?.$id
            if (userId) {
                const dU = await dbConfig.createDocument({
                    id: userId,
                    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
                    userName: 'test',
                    name: 'test',
                    email: 'test@test.com',
                    playList: [...['test']],
                })
                console.log(dU)
            }
        }

        catch (error) {
            console.log(error)
        }

    }
    const updateDoc = async () => {

        try {
            const userId = user?.$id
            if (userId) {
                const du = await dbConfig.updateDocument({
                    prefs: {
                        avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4545',
                        name: 'test two',
                    },
                    id: userId
                })
                console.log(du)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <PageUi className=''>
            <div className="flex gap-2">
                <p>Welcome to your dashboard</p>
                {isAuthUser && <p>{user?.name}</p>}
            </div>
            <Button
                variant='outline'
                onClick={createDoc}
            >
                Create Document
            </Button>
            <Button
                variant='outline'
                onClick={updateDoc}
            >
                Update Document
            </Button>
            <p>
                hi
            </p>
        </PageUi>
    );
};

export default Page;
