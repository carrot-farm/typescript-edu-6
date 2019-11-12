/** ==========================================
 *  할 일에 대한 정보를 보여줌.
 ========================================== */
import React from 'react';
import './TodoItem.css';
import { useTodosDispatch, Todo } from '../contexts/TodosContext';

// ===== props 타입 정의
export type TodoItemProps = {
  todo: Todo
};

// ===== 컴포넌트
function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useTodosDispatch();

  // # toggle
  const onToggle = () => {
    dispatch({
      type: 'TOGGLE',
      id: todo.id
    })
  }

  // # 삭제
  const onRemove = () => {
    dispatch({
      type: 'REMOVE',
      id: todo.id
    })
  };

  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text" onClick={onToggle}>{todo.text}</span>
      <span className="remove" onClick={onRemove}>(X)</span>
    </li>
  )
}

export default TodoItem;