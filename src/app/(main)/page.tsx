import TaskCard from '@/components/TaskCard/TaskCard'
import Link from 'next/link'
import React from 'react'
import { MdAddTask } from 'react-icons/md'

const MainPage = () => {
  return (
    <div className='text-gray-800 p-8 h-full overflow-y-auto pb-24'>
      <header className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold flex items-conter'>All Tasks</h1>
        <Link href='/new' className='flex items-conter gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700'>
          <MdAddTask className='size-5' />
          <div>Add Task</div>
        </Link>
      </header>
      <div className='mt-8 flext flex-wrap gap-4'>
        <TaskCard/>
      </div>
    </div>
  )
}

export default MainPage 