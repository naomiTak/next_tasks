"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Column from "./Column";
import { TaskDocument } from '@/models/task'
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/constants/taskStatus";
import { updateTaskStatus } from "@/actions/task"
import { DropResult } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Task } from '@/types/task'


interface BordProps {
    tasks: Task[];
}

const Board: React.FC<BordProps> = ({ tasks }) => {
   const [taskList, setTaskList] = useState(tasks);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
    ) {
      console.log(source)
    console.log(destination)
      return;
    }

  //  setState
  const newTasks = taskList.map(task =>
    task._id === draggableId ? { ...task, status: destination.droppableId } : task
  );

  setTaskList(newTasks);

    // サーバー更新
    //await updateTaskStatus(draggableId, destination.droppableId);
  };

  return (
    // <DragDropContext onDragEnd={handleDragEnd}>
    //<DragDropContext onDragEnd={(result) => console.log(result)}>
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4">
        <Column title={TASK_STATUSES.TODO} tasks={taskList.filter(t => t.status === TASK_STATUSES.TODO)} />
        <Column title={TASK_STATUSES.IN_PROGRESS} tasks={taskList.filter(t => t.status === TASK_STATUSES.IN_PROGRESS)} />
        <Column title={TASK_STATUSES.DONE} tasks={taskList.filter(t => t.status === TASK_STATUSES.DONE)} />
      </div>
    </DragDropContext>
  );
}

export default Board