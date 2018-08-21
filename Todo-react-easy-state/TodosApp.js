import React, { Component } from 'react';
import { view, store } from 'react-easy-state';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

let id = 1;

const defaultTodo = {
    text: '',
};

// store() wraps your objects with transparent, reactive proxies
export const todoStore = store({

    todo: { ...defaultTodo },
    todos: [
        { id: id, text: 'abc', finished: false },
        { id: ++id, text: 'xyz', finished: false },
    ],
    addData(e) {
        let { todo, todos } = todoStore;
        e.preventDefault();
        if (!todo.id) {
            //add
            todo.id = ++id;
            todos.push(todo);
        }
        todoStore.todo = { ...defaultTodo }
    },
    removeData(index) {
        todoStore.todos.splice(index, 1);
    },
    unfinished() {
        return todoStore.todos.filter(todo => !todo.finished).length;
    },
    onChange(e) {
        const { todo } = todoStore;
        todo[e.target.name] = e.target.value
    }
});

class TodosApp extends Component {

    render() {
        console.log('render-easy')
        let { todo, todos, addData, removeData, onChange } = todoStore;

        return (
            <div>
                <h3>Todo App with React-easy-state</h3>
                <TodoForm
                    todo={todo}
                    addData={addData}
                    onChange={onChange}
                />
                <br />
                <TodoList
                    todos={todos}
                    removeData={removeData}
                />
                <br />
                <div>Pending tasks: {todoStore.unfinished()}</div>
            </div>
        );
    }
}

// view() makes your components reactive, by re-rendering them on store mutations

export default view(TodosApp);
