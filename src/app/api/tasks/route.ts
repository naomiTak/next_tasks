import { connectDb } from "@/utils/database";
import { TaskDocument, TaskModel } from "../../../models/task";
import { NextResponse } from "next/server";

export const GET = async ()  => {
    try{
        await connectDb();
        const allTasks:TaskDocument[] = await TaskModel.find();
        return NextResponse.json({message: "success to get tasks", tasks: allTasks})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "failed to get tasks"}, {status:500})
    }
}

export const dynamic = 'force-dynamic'