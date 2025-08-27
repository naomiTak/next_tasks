"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type Task = {
  id: string;
  content: string;
};

type ColumnType = "todo" | "inprogress" | "done";

const initialTasks: Record<ColumnType, Task[]> = {
  todo: [
    { id: "1", content: "Task 1" },
    { id: "2", content: "Task 2" },
  ],
  inprogress: [{ id: "3", content: "Task 3" }],
  done: [{ id: "4", content: "Task 4" }],
};

export default function HomePage() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // 移動元と移動先が同じなら何もしない
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId as ColumnType;
    const destColumn = destination.droppableId as ColumnType;

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const [removed] = sourceTasks.splice(source.index, 1);

    const destTasks = Array.from(tasks[destColumn]);
    destTasks.splice(destination.index, 0, removed);

    setTasks({
      ...tasks,
      [sourceColumn]: sourceTasks,
      [destColumn]: destTasks,
    });
  };

  return (
    <div className="p-8 bg-red-100">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-6 bg-blue-100">
          {(["todo", "inprogress", "done"] as ColumnType[]).map((columnId) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 rounded-xl p-4 min-h-[300px] shadow"
                >
                  <h2 className="font-bold mb-4 capitalize">{columnId}</h2>
                  {tasks[columnId].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 mb-3 rounded-lg bg-green-100 shadow ${
                            snapshot.isDragging ? "bg-orange-100" : ""
                          }`}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
