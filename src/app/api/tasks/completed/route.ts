import { connectDb } from "@/utils/database";
import { TaskDocument, TaskModel } from "@/models/task";
import { NextResponse } from "next/server";

export const GET = async ()  => {
    try{
        await connectDb();
        const completedTasks:TaskDocument[] = await TaskModel.find({isCompleted:true});
        return NextResponse.json({message: "success to get completed tasks", tasks: completedTasks})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: "failed to get completed tasks"}, {status:500})
    }
}

export const dynamic = 'force-dynamic'