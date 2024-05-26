'use client'
import ifNotUserAvatar from '@/config/dataBase/userPrefs/ifNotUserAvatar'
import userAvatarDBConfig from '@/config/dataBase/userPrefs/userAvatarDBConfig'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'

function UserAvatar(  ) {
    const [userAvatar, setUserAvatar] = useState<any>()
    const {userPrefs} = useAuth()
    useEffect(() => {
        const getUserAvatar = () => {
            if (userPrefs.avatar ) {
                const result = userAvatarDBConfig.getUserAvatarPreview(userPrefs.avatar)
                setUserAvatar(result)
            } else {
                const result = ifNotUserAvatar.getUserInitials()
                setUserAvatar(result)
            }

        }

        getUserAvatar()

    }, [userPrefs])

    return (
        <div>
            <img
                src={userAvatar}
                alt=""
                className='w-96 h-96 rounded-full object-cover m-2 border-white border-2 border-solid'
            />
        </div>

    )
}

export default UserAvatar