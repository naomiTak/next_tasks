import { Droppable } from "@hello-pangea/dnd";
import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskDocument } from '@/models/task'
import { TASK_STATUSES, TASK_STATUS_LABELS, TaskStatus } from "@/constants/taskStatus";
import { Task } from '@/types/task'

interface ColumnProps {
    title: TaskStatus,
    tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  const columnTitle: string = TASK_STATUS_LABELS[title]

  return (
    <div className="w-1/3 bg-gray-100 p-2 rounded">
      <h2 className="font-bold">{columnTitle}</h2>
      <Droppable droppableId={title}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
            {tasks.map((task, index) => (
              <TaskCard key={String(task._id)} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;