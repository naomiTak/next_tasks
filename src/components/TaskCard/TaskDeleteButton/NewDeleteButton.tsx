import { useState } from "react";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { deleteTask } from "@/actions/task";
import { FaTrashAlt } from 'react-icons/fa'

interface TaskDeleteButtonProps {
  id: string;
}

const TaskDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='hover:text-gray-700 text-lg cursor-pointer disabled:bg-gray-400'
      >
         <FaTrashAlt />
      </button>

      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          title="タスクを削除しますか？"
          message="この操作は取り消せません。"
          onConfirm={() => {
            // フォーム送信用の hidden form を submit
            const form = document.getElementById(
              `delete-form-${id}`
            ) as HTMLFormElement;
            form?.requestSubmit();
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}

      {/* サーバーアクション呼び出し用のフォーム（非表示） */}
      <form id={`delete-form-${id}`} action={async (formData) => {
      
        await deleteTask(id, {} as any);
      }} />
    </>
  );
};

export default TaskDeleteButton;