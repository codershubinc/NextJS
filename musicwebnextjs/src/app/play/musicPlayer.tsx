
'use client';
import React, { useEffect, useRef, useState } from 'react';
import music from '@/config/dataBase/playListsDb/music';
import { useAuth } from '@/context/AuthContext';

interface Props {
    musicIds: string[];
    playMusicWithId: string;
}

const MusicPlayer: React.FC<Props> = ({ musicIds, playMusicWithId }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef(new Audio());
    const { isSongPlaying } = useAuth();

    useEffect(() => {
        const audio = audioRef.current;

        const handleAudioEnd = () => {
            console.log('Audio has ended');
            setCurrentTrackIndex(prevIndex => (prevIndex + 1));
        };


        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('ended', handleAudioEnd);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, []);

    const playNextTrack = () => {
        setCurrentTrackIndex(prevIndex => {
            const nextIndex = prevIndex >= 0 ? (prevIndex + 1) % musicIds.length : 0;
            console.log('Playing next track:', nextIndex);
            return nextIndex;
        });
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
        if (trackIndex >= 0 && trackIndex < musicIds.length) {
            const currentMusicId = musicIds[trackIndex];
            console.log('current index:', currentTrackIndex);

            console.log('Playing music with ID:', currentMusicId);
            audio.src = String(music.getMusic(currentMusicId));
            audio.play().catch(error => {
                console.error('Error playing music:', error);
            });
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
            } else {
                console.error('Track ID not found in musicIds:', playMusicWithId);
            }
        }
    }, [playMusicWithId, musicIds]);

    useEffect(() => {
        if (isSongPlaying && currentTrackIndex !== -1) {
            playMusic(currentTrackIndex);
        } if (currentTrackIndex === 12) {
            console.log('Current track index:', currentTrackIndex);
            console.log('now setting current track index to 0');

            setCurrentTrackIndex(0)
            console.log('Current track index:', currentTrackIndex);


        }
    }, [isSongPlaying, currentTrackIndex]);

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        const newTime = parseFloat(event.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div>
            <h1>Music Player</h1>
            <button onClick={playPreviousTrack}>Previous</button>
            <button onClick={playNextTrack}>Next</button>
            {/* Seek bar */}
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                style={{ width: '100%' }}
            />
            <div>
                {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} /
                {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
            </div>
        </div>
    );
};

export default MusicPlayer;
