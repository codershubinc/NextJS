'use client';
import React, { useEffect, useState } from 'react';
import PageUi from './pageui';
import musicPlayList from '@/config/dataBase/playListsDb/musicPlayList';
import Link from 'next/link';
import cryptoUtil from '@/lib/util/CryptoUtil';

interface Playlists {
    name: string;
    $id: string;
    musicContains: string[];
    // Add more properties here
}

function ViewAllPlayListsPage() {
    const [playLists, setPlayLists] = useState<Playlists[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const findAllPlayLists = async () => {

        try {
            const allPlayLists = await musicPlayList.getMusicPlayListAllWoQuery();
            if (allPlayLists.documents) {
                setPlayLists(allPlayLists.documents);
            } else {
                setPlayLists([]);
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
            setError('Error fetching playlists');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        findAllPlayLists();
    }, []);

    return (
        <PageUi>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">All Playlists</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : playLists.length === 0 ? (
                    <p>No playlists found</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {playLists.map((playlist) => (
                            <Link href={`/play?id=${cryptoUtil.encryptString(playlist.$id)}`} key={playlist.$id}>
                                <div key={playlist.$id} className="p-4 border rounded shadow bg-white dark:bg-gray-800">
                                    <h2 className="text-lg font-semibold">{playlist.name}</h2>
                                    <h2 className="text-sm text-gray-500">{playlist.$id}</h2>
                                    <ul className="list-disc list-inside">
                                        {playlist.musicContains.map((music) => (
                                            <li key={music} className="text-sm text-gray-700">{music}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PageUi>
    );
}

export default ViewAllPlayListsPage;
