import { createContext, useReducer, useContext } from "react";
import TodosReducer from "../reducers/TodosReducer";

export const TodosContext = createContext([]);

const TodosContextProvider = ( {children} ) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);

  return (
    <TodosContext.Provider value={{todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export default TodosContextProvider;

export const useTodos = () => {
    return useContext(TodosContext);
};