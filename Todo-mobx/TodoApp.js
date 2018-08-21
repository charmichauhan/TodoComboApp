import React, { Component } from "react";
import { decorate, observable, computed, action } from "mobx";
import { observer } from "mobx-react";

class Todo {
  id = Math.random();
  title = "";
  finished = false;
  constructor(title) {
    this.title = title;
  }
}

decorate(Todo, {
  title: observable,
  finished: observable,
});

class TodoStore {
  todos = [
    { id: '1', title: 'abc', finished: false },
    { id: '2', title: 'xyz', finished: false },
  ];
  todo = {
    title: "",
  };
  add(title) {
    this.todos.push(new Todo(title));
  }
  get unfinished() {
    return this.todos.filter(todo => !todo.finished).length;
  }
  remove(index) {
    this.todos.splice(index, 1)
    // this.todos.filter(todo => todo.id !== index);
  }
}

decorate(TodoStore, {
  todos: observable,
  todo: observable,
  add: action,
  remove: action,
  unfinished: computed,
});

const TodoItem = observer(({ todo, index }) => (
  <div>
    <li style={{ float: 'left' }} onClick={e => (store.todo = todo)}>
      <input
        type="checkbox"
        checked={todo.finished}
        onChange={e => (todo.finished = !todo.finished)}
      />
      {todo.title}{" "}{" "}
    </li>
    <button style={{ float: 'center' }} onClick={() => store.remove(index)}>Remove</button>
  </div>
));

const TodoEditor = observer(({ store }) => {
  let input;
  let todo = store.todo;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!store.todo.id) {
          store.add(input.value);
        }
        store.todo = { title: "" };
        input.focus();
      }}>
      <input
        type="text"
        ref={node => (input = node)}
        value={todo.title}
        onChange={e => (todo.title = e.target.value)}
      />
      {todo.id ? <button>Update</button> : <button>Add</button>}
    </form>
  );
});

const TodoList = observer(({ store }) => (
  <div>
    <h3>Todo App with Mobx</h3>
    <TodoEditor store={store} />
    <ul>{store.todos.map((todo, index) => <TodoItem key={todo.id} todo={todo} index={index} />)}</ul>
    <div>Pending tasks: {store.unfinished}</div>
  </div>
));

const store = new TodoStore();

class TodoApp extends Component {
  render() {
    console.log('render-mobx')
    return <TodoList store={store} />;
  }
}

export default TodoApp;
