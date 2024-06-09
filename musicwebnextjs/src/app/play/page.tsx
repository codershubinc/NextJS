'use client';
import React, { useEffect, useState } from 'react';
import musicConfig from '@/config/dataBase/playListsDb/musicConfig';
import musicPlayList from '@/config/dataBase/playListsDb/musicPlayList';
import cryptoUtil from '@/lib/util/CryptoUtil';
import MusicPlayer from './musicPlayer';
import { useAuth } from '@/context/AuthContext';
import PageUi from '@/components/page/pageui';

function Page() {
    const [playListId, setPlayListId] = useState<string>('');
    const [musicDetails, setMusicDetails] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setIsSongPlaying, isUserLogin } = useAuth();
    const [id, setId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const encryptedId = params.get('id');
        if (encryptedId) {
            const playListId = cryptoUtil.decryptString(encryptedId);
            setPlayListId(playListId);
        }
    }, []);

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
    };

    console.log('isUserLogin', isUserLogin);

    const musicIds = musicDetails.map((music: any) => music.$id);

    return (
        <PageUi className='h-[95vh] w-full lg:pt-10'>

            <h1 className="text-2xl font-bold mb-4 text-center">Playlist Details</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : musicDetails.length <= 0 ? (
                <p>No songs found in this playlist</p>
            ) : !isUserLogin ? (
                <div className="grid grid-cols-1 w-max mx-auto gap-4">
                    Please login to play music
                </div>
            ) : (
                <div className='w-[]    justify-around items-center '>
                    <div 
                    className="flex flex-col w-max mx-auto h-[75vh] bg-slate-900   overflow-auto gap-4 p-2 rounded-3xl  shadow-2xl"

                    >
                        {musicDetails.map((music: any) => (
                            <div
                                key={music.$id}
                                id={music.$id}
                                onClick={() => playMusic(music.$id)}
                                className="p-4 flex gap-2 border rounded-xl shadow  bg-white dark:bg-gray-800"
                            >
                                <h2 className="text-lg font-semibold">{music.musicName}</h2>
                            </div>
                        ))}
                    </div>
                    <MusicPlayer musicIds={musicIds} playMusicWithId={id} allMusicInfo={musicDetails} />
                </div>
            )}

        </PageUi>
    );
}

export default Page;
