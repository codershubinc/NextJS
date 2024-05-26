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
    const [isPlaying, setIsPlaying] = useState(false);
    const [newMusic] = useState(new Audio());

    useEffect(() => {
        const getMusicInfo = async () => {
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
            try {
                if (musicInfo.musicId) {
                    const previewUrl = music.getMusic(musicInfo.musicId);
                    setMusicUrl(previewUrl.href);
                }
            } catch (error) {
                console.error('Error fetching music preview:', error);
            }
        };
        if (musicInfo.musicId) {
            fetchMusicPreview();
        }
    }, [musicInfo]);

    useEffect(() => {
        if (isPlaying) {
            handlePlayMusic();
        } else {
            newMusic.pause();
            newMusic.currentTime = 0;
        }
        // Cleanup
        return () => {
            newMusic.pause();
            newMusic.currentTime = 0;
        };
    }, [isPlaying]);

    const handlePlayMusic = () => {
        if (musicUrl) {
            newMusic.src = musicUrl;
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
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2 bg-${isPlaying ? 'red' : 'blue'}-500 text-white rounded hover:bg-${isPlaying ? 'red' : 'blue'}-600 mb-4`}
                >
                    {isPlaying ? 'Stop' : 'Play'}
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
