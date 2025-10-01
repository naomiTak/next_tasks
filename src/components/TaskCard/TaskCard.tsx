"use client";

import React from 'react'
import TaskEditButton from './TaskEditButton/TaskEditButton'
//import TaskDeleteButton from './TaskDeleteButton/TaskDeleteButton'
import NewDeleteButton from './TaskDeleteButton/NewDeleteButton'
import { Draggable } from "@hello-pangea/dnd";
import { Task } from '@/types/task'

interface TaskCardProps {
    task: Task;
    index: number;
}
const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-2 mx-auto my-4 rounded-xl shadow-md flex justify-center w-72 h-48 bg-gray-100"
        >
          {/* {task.title} */}
                   {/* <div className='w-64 h-52 p-4 bg-blue-100 rounded-md shadow-md flex flex-col justify-between'> */}
        <div className='w-full h-full p-4 flex flex-col justify-between'>
         <header>
             <h1 className='text-lg font-semibold'>{task.title}</h1>
             <div className='mt-1 text-sm line-clamp-3'>{task.description}</div>
         </header>
         <div>
             <div className='mt-1 text-sm'>{task.dueDate}</div>
             <div className='flex justify-between items-conter'>
                <div className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white rounded-full shacow-sm 
                    ${task.isCompleted ? 'bg-green-500' : 'bg-red-500'}  `}>{task.isCompleted ? 'Completed' : 'Incompleted'}</div>
                 <div className='flex gap-4'>
                     <TaskEditButton  id={task._id}/>
                     <NewDeleteButton id={task._id} />
                    {/* <TaskDeleteButton  id={task._id}/> */}
                </div>
            </div>
         </div>
     </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard