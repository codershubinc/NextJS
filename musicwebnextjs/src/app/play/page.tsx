'use client';
import music from '@/config/dataBase/playListsDb/music';
import musicConfig from '@/config/dataBase/playListsDb/musicConfig';
import musicPlayList from '@/config/dataBase/playListsDb/musicPlayList';
import cryptoUtil from '@/lib/util/CryptoUtil';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MusicPlayer from './musicPlayer';
import userAvatarDBConfig from '@/config/dataBase/userPrefs/userAvatarDBConfig';
import { useAuth } from '@/context/AuthContext';
import PageUi from '@/components/page/pageui';



function Page() {
    const urlParams = useSearchParams();
    const playListId = cryptoUtil.decryptString(urlParams.get('id')!);
    const [musicDetails, setMusicDetails] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [audio] = useState(new Audio());
    const { setIsSongPlaying } = useAuth()
    const [id, setId] = useState('');

    useEffect(() => {
        const getSongsFromPlayList = async () => {
            try {
                console.log('Fetching playlist with ID:', playListId);
                const playlist = await musicPlayList.getMusicPlayListOne(playListId);
                if (playlist) {
                    console.log('Fetched playlist:', playlist);
                    const avatarId = playlist.musicPlayListAvatar;
                    const musicDocsResponse = await musicConfig.getMusicConfig(avatarId);
                    const musicDocs = musicDocsResponse.documents;
                    console.log('Fetched music documents:', musicDocs);
                    setMusicDetails(musicDocs);
                } else {
                    setMusicDetails([]);
                }
            } catch (error) {
                console.error('Error fetching playlist:', error);
                setError('Error fetching playlist');
            } finally {
                setLoading(false);
            }
        };

        if (playListId) {
            getSongsFromPlayList();
        }
    }, [playListId]);
    const playMusic = (mId: string) => {
        setId(mId);
        setIsSongPlaying(true);

    }


    const musicIds = musicDetails.map((music: any) => music.$id);


    return (
        <PageUi>
            <div>
                <h1 className="text-2xl font-bold mb-4">Playlist Details</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : musicDetails.length === 0 ? (
                    <p>No songs found in this playlist</p>
                ) : (
                    <div className="grid grid-cols-1 w-max mx-auto gap-4">
                        {musicDetails.map((music: any) => (
                            <div
                                key={music.$id}
                                id={music.$id}
                                onClick={() => playMusic(music.$id)}
                                className="p-4 flex gap-2 border rounded-xl shadow bg-white dark:bg-gray-800"
                            >
                                <h2 className="text-lg font-semibold">{music.musicName}</h2>
                            </div>
                        ))}
                    </div>
                )}
                <MusicPlayer musicIds={musicIds} playMusicWithId={id} />
            </div>
        </PageUi>
    );
}

export default Page;
