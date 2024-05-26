'use client';
import UserAvatar from '@/app/users/userdashboard/userAvatar';
import PageUi from '@/components/page/pageui';
import music from '@/config/dataBase/playListsDb/music';
import musicConfig from '@/config/dataBase/playListsDb/musicConfig';
import userAvatarDBConfig from '@/config/dataBase/userPrefs/userAvatarDBConfig';
import cryptoUtil from '@/lib/util/CryptoUtil';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
    const searchParams = useSearchParams();
    const musicId = searchParams.get('musicId') || '';
    const [musicInfo, setMusicInfo] = useState<any>({});
    const [musicUrl, setMusicUrl] = useState<string | null>(null);
    const [newMusic] = useState(new Audio());

    useEffect(() => {
        const getMusicInfo = async () => {
            console.log('Fetching music info...');
            try {
                const result = await musicConfig.getMusicConfig(musicId);
                if (result) {
                    setMusicInfo(result);
                } else {
                    console.error('Music not found');
                }
            } catch (error) {
                console.error('Error fetching music info:', error);
            }
        };
        if (musicId) {
            getMusicInfo();
        }
    }, [musicId]);

    useEffect(() => {
        const fetchMusicPreview = async () => {
            console.log('Fetching music preview...');
            try {
                if (musicInfo.musicId) {
                    const previewUrl = music.getMusic(musicInfo.musicId);
                    setMusicUrl(previewUrl.href);
                    handlePlayMusic(previewUrl.href);
                }
            } catch (error) {
                console.error('Error fetching music preview:', error);
            }
        };
        if (musicInfo.musicId) {
            fetchMusicPreview();
        }
    }, [musicInfo]);

    const handlePlayMusic = (url?: string) => {
        const playUrl = url || musicUrl;
        if (playUrl) {
            console.log('Playing music URL:', playUrl);
            newMusic.src = playUrl;
            newMusic.play().catch((error) => {
                console.error('Error playing music:', error);
            });
        } else {
            console.error('Music URL is not available');
        }
    };

    return (
        <PageUi>
            <div className="flex flex-col items-center justify-center p-4">
                <button
                    onClick={() => handlePlayMusic()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
                >
                    Play
                </button>
                {musicInfo.musicAvatar && (
                    <img
                        className="w-20 h-20 rounded-full"
                        src={String(userAvatarDBConfig.getUserAvatarPreview(musicInfo.musicAvatar))}
                        alt="Music Avatar"
                    />
                )}
            </div>
        </PageUi>
    );
}

export default Page;
