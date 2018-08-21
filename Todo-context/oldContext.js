import React from "react";
import PropTypes from "prop-types";

class TodoForm extends React.Component {
    render() {
        const { todo, handleInput, addTodo } = this.context
        return (
            <form onSubmit={addTodo}>
                <input type="text" name="text" value={todo.text} onChange={handleInput} />
                {!todo.id ? <button>Add</button> : <button>Update</button>}
            </form>
        )
    }
}
TodoForm.contextTypes = {
    todo: PropTypes.object,
    handleInput: PropTypes.func,
    addTodo: PropTypes.func
};

const TodoList = ({ }, { todos, removeTodo, updateTodo }) => (
    todos.map((todo, index) => {
        return <TodoItem key={index} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo} />
    })
)
TodoList.contextTypes = {
    todos: PropTypes.array,
    removeTodo: PropTypes.func,
    updateTodo: PropTypes.func
};

class TodoItem extends React.Component {
    render() {
        const { todo, removeTodo, updateTodo } = this.props;
        return (
            <div>
                <li style={{ float: 'left' }} onClick={e => updateTodo(todo)}>
                    <input type="checkbox" checked={todo.finished} onChange={e => (todo.finished = !todo.finished)} />
                    {todo.text}{" "}{" "}
                </li>
                <button style={{ float: 'center' }} onClick={e => removeTodo(todo.id)}>Remove</button>
            </div>
        )
    }
}

let id = 0;
const defaultTodo = {
    text: '',
    finished: false
}
export default class App extends React.Component {
    state = {
        todo: { ...defaultTodo },
        todos: [
            { id: ++id, text: 'abc', finished: false },
            { id: ++id, text: 'xyz', finished: false }
        ]
    };
    // getChildContext() function that returns the plain object containing the data we want to pass down.
    getChildContext() {
        return {
            todo: this.state.todo, todos: this.state.todos, handleInput: this.handleInput, addTodo: this.addTodo,
            removeTodo: this.removeTodo, updateTodo: this.updateTodo
        };
    }
    handleInput = e => {
        const { todo } = this.state;
        todo[e.target.name] = e.target.value
        this.setState({ todo })
    };
    unfinished() {
        return this.state.todos.filter(todo => !todo.finished).length
    }
    findTodoIndexById(id) {
        return this.state.todos.findIndex(x => x.id === id);
    }
    addTodo = (e) => {
        e.preventDefault()
        const { todo, todos } = this.state;
        if (todo.id) {
            const index = this.findTodoIndexById(todo.id)
            todos[index] = todo
        }
        else {
            todo.id = ++id;
            todos.push({ ...todo })
        }
        this.setState({ todos, todo: { ...defaultTodo } })
    }
    removeTodo = (id) => {
        const { todos } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        console.log('findindex', findTodoIndex)
        todos.splice(findTodoIndex, 1);
        this.setState({ todos: [...todos] });
    }
    updateTodo = (record) => {
        this.setState({ todo: { ...record } })
    }
    render() {
        console.log('render-oldcontext')
        return (
            <div>
                <h3>Todo App with Old context API</h3>
                <TodoForm />
                <br />
                <TodoList />
                <br />
                <div>Pending tasks: {this.unfinished()} </div>
            </div>
        );
    }
}
App.childContextTypes = {
    todo: PropTypes.object,
    todos: PropTypes.array,
    handleInput: PropTypes.func,
    addTodo: PropTypes.func,
    removeTodo: PropTypes.func,
    updateTodo: PropTypes.func
};
