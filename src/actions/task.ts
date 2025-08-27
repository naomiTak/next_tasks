'use server';

import { connectDb } from "@/utils/database";
import { Task, TaskModel } from "../models/task";
import { redirect } from "next/navigation";

export interface FormState {
    error: string
}

export const createTask = async(state: FormState, formData: FormData) => {
    const newTask: Task = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,        
        isCompleted: false,
        status: 'Todo'
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

export const updateTask = async(id: string, state: FormState, formData: FormData) => {
    const updateTask: Task = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        dueDate: formData.get("dueDate") as string,        
        isCompleted: Boolean(formData.get('isCompleted')),
        status: 'Todo'
        //後でバリデーションを追加
    }

    try{
        await connectDb();
        await TaskModel.updateOne({_id: id}, updateTask)
    }catch(error){
        state.error = "Unable to update the task."
        return state
    }
    redirect("/")
}

export const updateTaskStatus = async(id: string, taskStatus: string) => {
    try{
        await connectDb();
        await TaskModel.updateOne({_id: id}, {status: taskStatus})
    }catch(error){
        console.log(error)
    }
    redirect("/")
}

export const deleteTask = async(id: string, state: FormState) => {
    try{
        await connectDb();
        await TaskModel.deleteOne({_id: id})
    }catch(error){
        state.error = "Unable to delete the task."
        return state
    }
    redirect("/")
}