import { v4 as uuidv4 } from 'uuid'; // UUid Library

export default function TodosReducer(currentTodos, action) {
    
  switch(action.type) {
    
    case 'addTodo': {
      let newTodo = { id: uuidv4(), title: action.payload.titleInput, Details: "", isCompleted: false };
      localStorage.setItem("Todos", JSON.stringify([...currentTodos, newTodo]));
      return [...currentTodos, newTodo];
    };
    
    case 'deleteTodo': {
      let newTodo = currentTodos.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("Todos", JSON.stringify(newTodo));
      return newTodo;
    };
    
    case 'updateTodo': {
      let updatedTodos = currentTodos.map((t) => {
      if (t.id === action.payload.id) {
        return { ...t, title: action.payload.title, Details: action.payload.Details };
      } else { return t };
    });
    localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    return updatedTodos;
    };
      
    case 'get': {
      let StorageTodos = JSON.parse(localStorage.getItem("Todos")) ?? [];
      return StorageTodos;
    };
      
    case 'completed': {
      let updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) { return { ...t, isCompleted: !t.isCompleted } }
        return t;
      });  
      localStorage.setItem("Todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    };
    
    default:  throw Error("Unknown action" + action.type)
  }
}