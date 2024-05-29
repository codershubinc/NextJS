'use client';
import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo";
import todoDBConfig from "@/config/todoDBConfig";
import authService from "@/config/auth";
import { Button } from "@/components/ui/button";
import CardComp from "./CardComp";
import Link from "next/link";

export default function Home() {
  const [allTodoDocs, setAllTodoDocs] = useState<any[]>([]);
  const [addTodo, setAddTodo] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all todos for the current user
  useEffect(() => {
    setLoading(true);
    const fetchTodoDocs = async () => {
      try {
        const user = await authService.getCurrentUser();
        console.log('user', user);

        if (user) {
          const todoDocsResult = await todoDBConfig.listAllTodos(user.$id);
          setAllTodoDocs(todoDocsResult.documents);
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodoDocs();
  }, []);

  // Log the todo titles whenever allTodoDocs changes
  useEffect(() => {
    console.log('allTodoDocs', allTodoDocs.map((todo: any) => todo.todoTitle));
  }, [allTodoDocs]);

  if (loading) {
    return <Button
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      variant={'secondary'}
    >
      Loading ........
    </Button>;
  }


  return (
    <div className="flex min-h-screen items-center justify-between bg-black text-white">
      <div className="w-full h-screen bg-gray-900 p-4">
        <div className="flex  fixed top-0 left-0  bg-black h-[30px] w-full">
          <h1 className="text-2xl">All Todos</h1>
          <Link href="/createtodo">
            ➕
          </Link>
        </div>
        <div>
          <div
            className="flex flex-wrap gap-1  mt-9 px-1 overflow-y-auto items-center  h-[90vh] lg:h-full  "
          >
            {allTodoDocs.length > 0 ? (
              allTodoDocs.map((todo) => (
                <CardComp
                  key={todo.$id}
                  todoTitle={todo.todoTitle}
                  todoMessage={todo.todoMessage}
                  todoDate={todo.$createdAt.split('T')[0].split('-').reverse().join('/')}
                  todoCompleted={todo.$id}
                />
              ))
            ) : (
              <p>No todos available</p>
            )}

          </div>
        </div>
      </div>
      {addTodo && <CreateTodo todo={null} display={addTodo} />}
    </div>
  );
}
