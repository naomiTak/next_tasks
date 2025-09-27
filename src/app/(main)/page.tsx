import TaskCard from '@/components/TaskCard/TaskCard'
import { TaskDocument } from '../../models/task'
import Link from 'next/link'
import React from 'react'
import { MdAddTask } from 'react-icons/md'
import  Board  from '@/components/board/Board'
import { Task } from '@/types/task'

const getAllTasks = async():Promise<Task[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks`,{
    cache: 'no-store',
  });

  if(response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.tasks as Task[];
};

export default async function MainPage() {
  const allTasks = await getAllTasks();
  return (
    <div className='text-gray-800 p-8 h-full  flex flex-col overflow-y-auto pb-24 bg-gray-100'>
      <header className='flex justify-between items-center my-4'>
        <h1 className='text-2xl font-bold flex items-conter'>All Tasks</h1>
        <Link href='/new' className='flex items-conter gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
          <MdAddTask className='size-5' />
          <div>Add Task</div>
        </Link>
      </header>
      <div className='flex-1'>
         <Board tasks={allTasks}/>
      </div>
    </div>
  )
}
