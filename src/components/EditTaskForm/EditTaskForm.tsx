'use client'

import { useState, useActionState } from 'react'
import { TaskDocument } from '@/models/task';
import { FormState, updateTask } from "@/actions/task"
import { useFormState, useFormStatus } from "react-dom"
import { TASK_STATUSES, TASK_STATUS_LABELS, TaskStatus } from "@/constants/taskStatus";
import { Task } from '@/types/task'


interface EditTaskFormProps {
    task: Task;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task }) => {
  const [ title, setTitle] = useState(task.title)
  const [ description, setDescription] = useState(task.description)
  const [ dueDate, setDueDate] = useState(task.dueDate);
  const [ status, setStatus] = useState(task.status);
  const [ isCompleted, setIsCompleted] = useState(task.isCompleted);

  const updateTaskWithId = updateTask.bind(null, task._id)
  const initialState: FormState = {error:''}
  const [state, formAction] = useActionState(updateTaskWithId, initialState)

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return(
        <button type="submit" disabled={pending} className='mt-8 py-2 w-full rounded-md text-white bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm disabled:bg-gray-400'>
            Edit
        </button>
    )
  }

    return (
    <div className='mt-10 mx-auto w-full max-w-sm'>
        <form action={formAction}>
            <div>
                <label htmlFor="title" className='block text-sm  font-medium'>Title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required 
                className='block mt-2  py-1.5 px-2 w-full rouded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'/>
            </div>
            <div className='mt-6'>
                <label htmlFor="description" className='block text-sm  font-medium'>Description</label>
                <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required 
                className='block mt-2  py-1.5 px-2 w-full rouded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'/>
            </div>
            <div className='mt-6'>
                <label htmlFor="dueDate" className='block text-sm  font-medium'>Due date</label>
                <input type="date" id="dueDate" name="dueDate" min="2020-01-01" max="2999-12-31" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required 
                className='block mt-2  py-1.5 px-2 w-full rouded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300'/>
            </div>
            <div className="mt-6">
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
                    >
                    {Object.values(TASK_STATUSES).map((statusKey) => (
                        <option key={statusKey} value={statusKey}>
                        {TASK_STATUS_LABELS[statusKey]}
                        </option>
                    ))}
                </select>
            </div>
            <div className='mt-6 flex items-center'>
                <input type="checkbox" id="isCompleted" name="isCompleted" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} className='mr-2 w-4 h-4'/>
                <label htmlFor='isCompleted' className='text-sm'>Complete this task</label>
            </div>
            <SubmitButton />
            { state.error !== '' && (
                <p className="mt-2 text-red-500 text-sm">
                    {state.error}
                </p>)}
        </form>
    </div>
  )
}

export default EditTaskForm