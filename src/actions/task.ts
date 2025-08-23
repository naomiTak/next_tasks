'use server';

import { connectDb } from "@/utils/database";
import { Task, TaskModel } from "@/utils/models/task";
import { redirect } from "next/navigation";

export interface FormState {
    error: string
}

export const createTask = async(state: FormState, formData: FormData) => {
    const newTask: Task = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,        
        isCompleted: false
        //後でバリデーションを追加
    }

    try{
        await connectDb();
        await TaskModel.create(newTask)
    }catch(error){
        state.error = "Unable to creat new task."
        return state
    }
    redirect("/")
}