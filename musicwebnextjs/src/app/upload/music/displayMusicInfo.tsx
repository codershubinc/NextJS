'use client'
import { cn } from '@/lib/utils';
import React from 'react';

interface DisplayMusicInfoProps {
    data: {
        musicName?: string;
        musicAvatar?: any;
        singer?: string;
        description?: string;
        hashTags?: string;
    }, className?: string
}

const DisplayMusicInfo: React.FC<DisplayMusicInfoProps> = ({ data, className }) => {
    return (
        <div className={cn("p-4 border rounded", className)}>
            <h3 className="text-xl font-bold mb-4">Music Information</h3>
            <p><strong>Music Name:</strong> {data.musicName}</p> 
            <p><strong>Singers:</strong> {data.singer}</p>
            <p><strong>Description:</strong> {data.description}</p>
            <p><strong>HashTags:</strong> {data.hashTags}</p>
            <div>
                <img
                    src={data.musicAvatar}
                    className='w-[300px] h-[300px] rounded'
                    alt="" />
            </div>
        </div>
    );
};

export default DisplayMusicInfo;
