"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Column from "./Column";
import { TaskDocument } from '@/models/task'
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/constants/taskStatus";


interface BordProps {
    tasks: TaskDocument[];
}

const Board: React.FC<BordProps> = ({ tasks }) => {
  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <div className="flex gap-4">
        <Column title={TASK_STATUS_LABELS[TASK_STATUSES.TODO]} tasks={tasks.filter(t => t.status === TASK_STATUSES.TODO)} />
        <Column title={TASK_STATUS_LABELS[TASK_STATUSES.IN_PROGRESS]} tasks={tasks.filter(t => t.status === TASK_STATUSES.IN_PROGRESS)} />
        <Column title={TASK_STATUS_LABELS[TASK_STATUSES.DONE]} tasks={tasks.filter(t => t.status === TASK_STATUSES.DONE)} />
      </div>
    </DragDropContext>
  );
}

export default Board