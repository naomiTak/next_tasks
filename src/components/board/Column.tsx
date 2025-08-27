import { Droppable } from "@hello-pangea/dnd";
import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskDocument } from '@/models/task'

interface ColumnProps {
    title: string,
    tasks: TaskDocument[];
}
const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-2 rounded">
      <h2 className="font-bold">{title}</h2>
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