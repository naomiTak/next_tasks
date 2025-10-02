import { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa'
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useActionState } from "react";
import { deleteTask, FormState } from "@/actions/task";

interface TaskDeleteButtonProps {
  id: string;
  title: string;
}

const NewDeleteButton: React.FC<TaskDeleteButtonProps> = ({ id, title }) => {
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = { error: "" };
  const [state, formAction] = useActionState(deleteTaskWithId, initialState);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      if(state && state.error !== ''){
        alert(state.error);
      }
    },[state])

  return (
    <>
      {/* 削除ボタン */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hover:text-gray-700 text-lg cursor-pointer"
      >
        <FaTrashAlt />
      </button>

      {/* モーダル */}
      <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form action={formAction}>
          <p className="mb-4">本当に削除しますか？</p>
          <div className="m-4"><strong className="text-xl">{title}</strong></div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              削除する
            </button>
          </div>
        </form>
      </ConfirmModal>
    </>
  );
};

export default NewDeleteButton;