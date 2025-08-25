import { TaskModel } from '@/models/task'
import { connectDb } from '@/utils/database'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try{
        await connectDb();
        const { id } = await params;
        const task = await TaskModel.findById(id);

        if (!task){
            return NextResponse.json(
                { message: 'no task exit...'},
                { status: 404}
            );
        }

        return NextResponse.json(
            { message: 'successed to fetch the task.', task},
        )

    }catch(error){
        console.log(error)
        return NextResponse.json(
            { message: 'failed to fetch the task...'},
            { status: 500}
        )
    }
}

export const dynamic = 'force-dynamic'