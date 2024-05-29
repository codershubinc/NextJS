'use client';
import authService from '@/config/auth';
import todoDBConfig from '@/config/todoDBConfig';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CreateTodoProps {
    todo: any;
    display: boolean;
}

function CreateTodo({ todo, display }: CreateTodoProps) {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            todoTitle: todo?.todoTitle || '',
            todoMessage: todo?.todoMessage || '',
            todoByUser: todo?.todoByUser || '',
            isTodoCompleted: todo?.isTodoCompleted || false
        },
    });

    const [isDisplay, setIsDisplay] = useState(display);
    const [loading, setLoading] = useState(false);
    const navigate = useRouter()

    useEffect(() => {
        setIsDisplay(display);
    }, [display]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const user = await authService.getCurrentUser();
            console.log('user', user);

            if (todo) {
                console.log('todo', todo);
                console.log('data', data);
                const updateTodo = await todoDBConfig.updateTodo(todo.$id, {
                    ...data,
                    todoByUser: user.$id
                })
                if (updateTodo) {
                    console.log('updateTodo', updateTodo);
                    navigate.push('/')
                }


                // Update existing todo logic here
            } else {
                console.log('data', data);

                const newTodo = await todoDBConfig.createTodo({
                    ...data,
                    todoByUser: user.$id
                });
                console.log('todo', newTodo);

                setLoading(false);
                navigate.push('/')
            }
        } catch (error: any) {
            console.error('Error creating/updating todo:', error);
            setLoading(false);
        }
    };

    return (
        <div
            className={isDisplay ? 'flex flex-col p-3 rounded-3xl w-[30%] min-w-[350px] gap-1.5 justify-center items-center bg-slate-900 h-max shadow-md shadow-slate-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'hidden'}
        >

            <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] mx-auto'>
                <h2 className='text-2xl text-center'>{todo ? 'Update Todo' : 'Create Todo'}</h2>
                {/* //cancel button for update */}
                {todo ? <Link href='/'>
                        <Button variant="outline" className=' absolute right-0 top-0  mt-3'>
                            ❌
                        </Button>
                    </Link>
                    : ''}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="todoTitle">Todo Title</Label>
                    <Input
                        type="text"
                        id="todoTitle"
                        placeholder="Todo Title"
                        required
                        {...register("todoTitle")}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="todoMessage">Todo Message</Label>
                    <Textarea
                        id="todoMessage"
                        placeholder="Todo Message"
                        className='h-32'
                        required
                        {...register("todoMessage")}
                    />
                </div>
                <Button variant="outline" type="submit" className='w-full mt-3' disabled={loading}>
                    {todo ? 'Update Todo' : 'Create Todo'}
                </Button>
            </form>
        </div>
    );
}

export default CreateTodo;
