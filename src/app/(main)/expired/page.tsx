import TaskCard from '@/components/TaskCard/TaskCard'
import React from 'react'
import Link from 'next/link'
import { MdAddTask } from 'react-icons/md'
import  Board  from '@/components/board/Board'
import { Task } from '@/types/task'

const getExpiredTasks = async():Promise<Task[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks/expired`,{
    cache: 'no-store',
  });

  if(response.status !== 200) {
    throw new Error();
  }
  const data = await response.json();
  return data.tasks as Task[];
};

const ExpiredTaskPage = async() => {
  const expiredTasks = await getExpiredTasks();
    return (
       <div className='text-gray-800 p-8 h-full  flex flex-col overflow-y-auto pb-24 bg-gray-100'>
      <header className='flex justify-between items-center my-4'>
        <h1 className='text-2xl font-bold flex items-conter'>Expired Tasks</h1>
        <Link href='/new' className='flex items-conter gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
          <MdAddTask className='size-5' />
          <div>Add Task</div>
        </Link>
      </header>
      <div className='flex-1'>
         <Board tasks={expiredTasks}/>
      </div>
    </div>
      )
}

export default ExpiredTaskPage