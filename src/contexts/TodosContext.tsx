/** ======================================
 *  컨텍스트 정의
 * . 2개의 컨텍스트 정의
 * . action type 정의
 * . dispatch 정의
 * . provider 정의
 ====================================== */
import React, { createContext, Dispatch, useReducer, useContext } from 'react';

// ===== todo type 정의
// 다른 컴포넌트에서 사용 가능하도록 export
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

// ===== TodoList 배열 타입 정의
type TodosState = Todo[];

// ===== 상태전용 컨텍스트
const TodosStateContext = createContext<TodosState | undefined>(undefined);

// ===== action type 정의
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

// ===== dispatch 정의
type TodoDispatch = Dispatch<Action>;

// ===== todo용 컨텍스트
const TodosDispatchContext = createContext<TodoDispatch | undefined>(undefined);

// ===== todo 리듀서
function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE':
      const nextid = Math.max(...state.map(todo => todo.id)) + 1;
      return state.concat({
        id: nextid,
        text: action.text,
        done: false,
      });
    case 'TOGGLE':
      return state.map(todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo)
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
}

// ===== provider
export function TodosContextProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true
    }, {
      id: 2,
      text: 'Typescript 배우기',
      done: true
    }, {
      id: 3,
      text: 'Typescript 와 Context API 함께 배우기',
      done: false
    }
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  )
}

// ===== 커스텀 Hooks
// # state를 사용할 때 prodivder가 없다면 에러가 난다.
export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) { throw new Error('TodosProvider not founct'); }
  return state;
}
// # dispatch 사용 시 prodivder가 없다면 에러가 난다.
export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) { throw new Error('TodosProvider not found'); }
  return dispatch;
}