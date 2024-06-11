/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import music from '@/config/dataBase/playListsDb/music';
import { useAuth } from '@/context/AuthContext';
import userAvatarDBConfig from '@/config/dataBase/userPrefs/userAvatarDBConfig';

interface Props {
    musicIds: string[];
    playMusicWithId: string;
    allMusicInfo: any;
}

const MusicPlayer: React.FC<Props> = ({ musicIds, playMusicWithId, allMusicInfo }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSongInfo, setCurrentSongInfo] = useState<any>();
    const { isSongPlaying } = useAuth(); 
    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            audioRef.current = new Audio();
        }

        const audio = audioRef.current;

        const handleAudioEnd = () => {
            console.log('Audio has ended');
            playNextTrack();
        };

        const handleTimeUpdate = () => {
            if (audio) setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            if (audio) setDuration(audio.duration);
        };

        if (audio) {
            audio.addEventListener('ended', handleAudioEnd);
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('ended', handleAudioEnd);
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);

    const playNextTrack = () => {
        setCurrentTrackIndex(prevIndex => prevIndex + 1)
        console.log('Playing next track:', currentTrackIndex + 1);
    };

    const playPreviousTrack = () => {
        setCurrentTrackIndex(prevIndex => {
            const previousIndex = prevIndex > 0 ? (prevIndex - 1) : (musicIds.length - 1);
            console.log('Playing previous track:', previousIndex);
            return previousIndex;
        });
    };

    const playMusic = (trackIndex: number) => {
        const audio = audioRef.current;
        if (trackIndex >= 0 && trackIndex < musicIds.length && audio) {

            setCurrentSongInfo(allMusicInfo[currentTrackIndex]);
            console.log('Current song info at play music func:', allMusicInfo[trackIndex]);

            const currentMusicId = (allMusicInfo[trackIndex].musicId ?
                String(music.getMusic(allMusicInfo[trackIndex].musicId)) :
                String(allMusicInfo[trackIndex].musicUri)
            );

            console.log('Playing music with ID:', currentMusicId);
            audio.src = currentMusicId;
            audio.play().catch(error => {
                console.error('Error playing music:', error);
            });
        } else if (trackIndex >= musicIds.length) {
            console.error('Track index out of bounds:', trackIndex);
            setCurrentTrackIndex(0);

        } else {
            console.error('Invalid track index:', trackIndex);
        }
    };

    useEffect(() => {
        if (playMusicWithId) {
            const trackIndex = musicIds.indexOf(playMusicWithId);

            if (trackIndex !== -1) {
                console.log('Setting initial track index:', trackIndex);
                setCurrentTrackIndex(trackIndex);
                setCurrentSongInfo(allMusicInfo[trackIndex]);
                console.log('Current song info:', currentSongInfo);
            } else {
                console.error('Track ID not found in musicIds:', playMusicWithId);
            }
        }
    }, [playMusicWithId, musicIds]);

    useEffect(() => {
        if (isSongPlaying && currentTrackIndex !== -1) {
            playMusic(currentTrackIndex);
            setCurrentSongInfo(allMusicInfo[currentTrackIndex]);
            console.log('Current song info:', currentSongInfo);

        }

    }, [isSongPlaying, currentTrackIndex]);

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        const newTime = parseFloat(event.target.value);
        if (audio) {
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    //display current playing music info in control center of device
    // {
    //     "musicName": "Deva Deva by ana jaiman",
    //     "musicAvatar": "6650e1550002df79ad8f",
    //     "singer": [
    //         "ana jaiman"
    //     ],
    //     "likeId": [],
    //     "like": 0,
    //     "hashTags": [
    //         "ana jaman"
    //     ],
    //     "musicId": "665106a7001e9d60a31d",
    //     "description": "ana jaiman",
    //     "language": "hi",
    //     "$id": "665106a7001e9d60a31d",
    //     "$createdAt": "2024-05-24T21:29:27.753+00:00",
    //     "$updatedAt": "2024-05-24T21:29:27.753+00:00",
    //     "$permissions": [
    //         "read(\"user:664f8d770018e5a137d7\")",
    //         "update(\"user:664f8d770018e5a137d7\")",
    //         "delete(\"user:664f8d770018e5a137d7\")"
    //     ],
    //     "$databaseId": "664cd502000af31ed320",
    //     "$collectionId": "664dee810029136d3a58"
    // }

    useEffect(() => {
        if (currentSongInfo === undefined) return console.log('currentSongInfo is undefined');

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'MediaTrackPrevious':
                    playPreviousTrack();
                    break;
                case 'MediaTrackNext':
                    playNextTrack();
                    break;
                // Add more cases for other media keys if needed
                default:
                    break;
            }
        };

        if ('mediaSession' in navigator) {
            const musicAvatarUrl =
                (
                    currentSongInfo?.musicAvatar ?
                        userAvatarDBConfig.getUserAvatarPreviewWithPrefs(currentSongInfo.musicAvatar, 500) :
                        currentSongInfo?.musicAvatarUrl
                )
            console.log('music avatar url', musicAvatarUrl.href);

            console.log('currentSongInfo', currentSongInfo);
            console.log('music avatar id', currentSongInfo?.musicAvatar);


            navigator.mediaSession.metadata = new MediaMetadata({

                title: currentSongInfo?.musicName || 'music',
                artist: currentSongInfo?.singer.map((singer: string) => singer.trim()).join(' , ') || 'Singer Name',
                album: 'Album Name',
                artwork: [
                    {
                        src: String(musicAvatarUrl),
                        sizes: '500x500',
                        type: 'image/png',
                    },
                ],
            })
            // Handling the previous track action here

            navigator.mediaSession.setActionHandler('previoustrack', () => {
                playPreviousTrack();
            })



            // Handling the next track action here

            navigator.mediaSession.setActionHandler('nexttrack', () => {
                playNextTrack();
            })
            // Adding keyboard event listeners
            document.addEventListener('keydown', handleKeyDown);

        }


        // Cleanup: remove event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [currentSongInfo]);


    return (
        <div className={` w-[97%]  mx-auto absolute  bottom-0 left-0 right-0 rounded-xl bg-gray-800 p-2 m-2`}>

            <button onClick={playPreviousTrack}>👈</button>
            <button onClick={playNextTrack}>⏭️</button>
            {/* Seek bar */}
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                style={{ width: '100%' }}
            />
            <div className="flex flex-row  gap-5">
                {currentSongInfo?.musicName || 'play your music'}
                <div>
                    {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} /
                    {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;