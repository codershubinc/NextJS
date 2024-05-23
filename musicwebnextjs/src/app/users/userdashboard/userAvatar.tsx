'use client'
import ifNotUserAvatar from '@/config/dataBase/userPrefs/ifNotUserAvatar'
import userAvatarDBConfig from '@/config/dataBase/userPrefs/userAvatarDBConfig'
import React, { useEffect, useState } from 'react'

function UserAvatar({ user }: any) {
    const [userAvatar, setUserAvatar] = useState<any>()
    useEffect(() => {
        const getUserAvatar =  () => {
            if (user.avatar === !null) {
                const result = userAvatarDBConfig.getUserAvatarPreview(user.avatar)
                setUserAvatar(result)
            } else {
                const result = ifNotUserAvatar.getUserInitials()
                setUserAvatar(result)
            }

        }

        getUserAvatar()

    }, [user])

    return (
        <div>
            <img src={userAvatar} alt="" />
        </div>

    )
}

export default UserAvatar