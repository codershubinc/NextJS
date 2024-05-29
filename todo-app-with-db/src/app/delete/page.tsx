'use client';
import todoDBConfig from '@/config/todoDBConfig';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Page() {
    const navigator = useRouter();
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState<any>(null);
    const [id, setId] = useState<any>(null);

    const findTodo = async () => {
        if (!id) {
            console.log('No id found');
            setLoading(false);
            return;
        }

        try {
            const todo = await todoDBConfig.deleteTodo(id);
            console.log('todo deleted', todo);
            navigator.push('/');
        } catch (error: any) {
            console.error('Error fetching todo:', error);
        } finally {
            console.log('Finally');
            setLoading(false);

        }
    };

    useEffect(() => {
        if (id) {
            console.log('ID:', id);
            setLoading(false);

        } else {
            setId(new URLSearchParams(window.location.search).get('id'))
        }
    }, [id]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='flex flex-col gap-3 justify-center items-center mt-[40%] h-max'>
                    <Button
                        variant={'outline'}
                        className='w-40 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded'
                        onClick={findTodo}

                    >
                        Delete
                    </Button>
                    <Button
                        className='w-40 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'
                        variant={'outline'}
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>

                </div>
            )}
        </>
    );
}

export default Page;
