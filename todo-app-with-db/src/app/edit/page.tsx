'use client';
import todoDBConfig from '@/config/todoDBConfig';
import React, { useEffect, useState } from 'react';
import CreateTodo from '../CreateTodo';

function Page() {
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
            const todo = await todoDBConfig.getTodoById(id);
            console.log('todo', todo);
            setTodo(todo);
        } catch (error: any) {
            console.error('Error fetching todo:', error);
        } finally {
            console.log('Finally');
            setLoading(false);

        }
    };

    useEffect(() => {
        if (id) {
            findTodo();
        } else {
            setId(new URLSearchParams(window.location.search).get('id'))
}
    }, [id]);

return (
    <>
        {loading ? (
            <div>Loading...</div>
        ) : (
            <CreateTodo todo={todo} display={true} />
        )}
    </>
);
}

export default Page;
