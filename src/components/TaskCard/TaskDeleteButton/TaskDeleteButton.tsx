'use client'

import { useEffect, useActionState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useState } from 'react'
import { TaskDocument } from '@/models/task';
import { FormState, deleteTask } from "@/actions/task"
import { useFormState, useFormStatus } from "react-dom"


interface TaskDeleteButtonProps {
  id: string
}
const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({id}) => {
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = {error:''}
  const [state, formAction] = useActionState(deleteTaskWithId, initialState)

  useEffect(() => {
    if(state && state.error !== ''){
      alert(state.error);
    }
  },[state])

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return(
      <button type="submit" disabled={pending} className='hover:text-gray-700 text-lg cursor-pointer disabled:bg-gray-400'>
        <FaTrashAlt />
      </button>
    )
  }
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  )
}

export default TaskDeleteButton