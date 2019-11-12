/** ==========================================
 *  여러 TodoItem들을 랜더링 해줌.
 ========================================== */
import React from 'react';
import TodoItem from './TodoItem';
import { useTodosState } from '../contexts/TodosContext';

// ===== 컴포넌트
function TodoList() {
  const todos = useTodosState();

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}

export default TodoList;