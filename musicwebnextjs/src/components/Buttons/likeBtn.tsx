/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import dbConfig from '@/config/dataBase/userPrefs/UserDBConfig'
import { useAuth } from '@/context/AuthContext'
import React, { useEffect, useState } from 'react'

function LikeBtn({ musicId }: { musicId: string }) {
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(true)
    const { currentUser, userPrefs, setUserPrefs } = useAuth()
    let likedSongIdList = userPrefs?.likedSongIdList || []

    useEffect(() => {
        console.log('likedSongIdList', likedSongIdList);

        if (!currentUser || !musicId) return

        setLiked(likedSongIdList.includes(musicId))
        setLoading(false)
    }, [currentUser, musicId, likedSongIdList])

    const handleLike = async () => {
        if (loading || !userPrefs || liked) return

        setLoading(true)
        try {
            const updatedPrefs = await dbConfig.updateDocument(
                userPrefs.$id,
                {
                    likedSongIdList: [...likedSongIdList, musicId]
                }
            )
            if (updatedPrefs) {
                setLiked(true)
                console.log('Liked:', updatedPrefs)
                setUserPrefs(updatedPrefs)

            }
        } catch (error) {
            console.error('Error liking the song:', error)
        } finally {
            setLoading(false)
        }
    }

    if (!musicId) return null

    return (
        <div>
            <img
                src={
                    liked ?
                        'https://cdn4.iconfinder.com/data/icons/set-1/32/__1-64.png'
                        :
                        "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/like-64.png"
                }
                alt="Like button"
                className={`w-8 cursor-pointer invert ${loading ? 'opacity-50' : ''}`}
                onClick={handleLike}
            />
        </div>
    )
}

export default LikeBtn
