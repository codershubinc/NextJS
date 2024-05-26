import React, { useEffect, useRef, useState } from 'react';
import music from '@/config/dataBase/playListsDb/music';
import { useAuth } from '@/context/AuthContext';

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
    const [currentSongInfo, setCurrentSongInfo] = useState<any>({});
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
            const currentMusicId = musicIds[trackIndex];
            setCurrentSongInfo(allMusicInfo[currentTrackIndex]);
            console.log('Current song info:', currentSongInfo);
            console.log('Playing music with ID:', currentMusicId);
            audio.src = String(music.getMusic(currentMusicId));
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
            {currentSongInfo?.musicName}
            <div>
                {Math.floor(currentTime / 60)}:{('0' + Math.floor(currentTime % 60)).slice(-2)} /
                {Math.floor(duration / 60)}:{('0' + Math.floor(duration % 60)).slice(-2)}
            </div>
        </div>
    );
};

export default MusicPlayer;
