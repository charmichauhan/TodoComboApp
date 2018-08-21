import { ADD_TODO, REMOVE_TODO, EDIT_TODO, TOGGLE_TODO } from "./constants";

let id = 0
const defaultTodo = { text: '' }
const initialState = {
  todos: [
    { id: ++id, text: 'abc', finished: false },
    { id: ++id, text: 'xyz', finished: false }
  ],
  todo: { ...defaultTodo }
};

export function todoReducer(state = initialState, action) {

  switch (action.type) {

    case ADD_TODO:
      const { todos, todo } = state;
      if (!todo.id) {
        todo.id = ++id;
        todos.push({ ...todo });
      } else {
        const index = todos.findIndex(record => record.id === todo.id);
        todos[index] = todo;
      }
      return {
        ...state,
        todos: [...state.todos],
        todo: { ...defaultTodo }
      };

    case EDIT_TODO:
      return { ...state, todo: { ...action.todo } };

    case REMOVE_TODO:
      return { ...state, todos: [...state.todos.filter(todo => todo.id !== action.payload)] }

    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo) => {
          return todo.id === action.payload ?
            Object.assign({}, todo, {
              finished: !
                todo.finished
            }) : todo
        })
      });

    default:
      return state; // Always return the state
  }
}
