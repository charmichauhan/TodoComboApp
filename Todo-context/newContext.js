import React, { Component } from "react";

const ToDoContext = React.createContext();

class TodoList extends Component {
    render() {
        return (
            <ToDoContext.Consumer>
                {({ todos, deleteTodo, updateTodo }) =>
                    todos.map(item => {
                        return <TodoItem key={item.id} item={item} deleteTodo={deleteTodo} updateTodo={updateTodo} />
                    })
                }
            </ToDoContext.Consumer>
        );
    }
}

class TodoItem extends Component {
    render() {
        const { item, deleteTodo, updateTodo } = this.props;
        return (
            <div>
                <li style={{float: 'left'}} onClick={e => updateTodo(item)}>
                    <input type="checkbox" checked={item.finished} onChange={e => (item.finished = !item.finished)} />
                    {item.text}{" "}{" "}
                </li>
                <button style={{float: 'center'}} onClick={e => deleteTodo(item.id)}>Remove</button>
            </div>
        )
    }
}

class TodoForm extends Component {
    render() {
        return (
            <ToDoContext.Consumer>
                {({ todo, addTodo, handleInput }) =>
                    <form onSubmit={addTodo}>
                        <input type="text" name="text" value={todo.text} onChange={handleInput} />
                        {!todo.id ? <button>Add</button> : <button>Update</button>}
                    </form>
                }
            </ToDoContext.Consumer>
        )
    }
}

let id = 0;
const defaultTodo = {
    text: ''
}

export default class ToDoContextApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { id: ++id, text: "abc", finished: false },
                { id: ++id, text: "xyz", finished: false }
            ],
            todo: { ...defaultTodo }
        };
    }

    addTodo = (e) => {
        e.preventDefault();
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
    };

    updateTodo = (record) => {
        this.setState({ todo: { ...record } })
    }

    findTodoIndexById(id) {
        return this.state.todos.findIndex(x => x.id === id);
    }

    deleteTodo = (id) => {
        const { todos } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        todos.splice(findTodoIndex, 1);
        this.setState({ todos: [...todos] });
    };

    unfinished() {
        return this.state.todos.filter(todo => !todo.finished).length;
    }

    handleInput = e => {
        const { todo } = this.state;
        todo[e.target.name] = e.target.value
        this.setState({ todo })
    };

    render() {
        const { todos, todo } = this.state;
        console.log('render-context');

        return (
            <div>
                <h3> Todo App with New React Context API </h3>
                <ToDoContext.Provider
                    value={{ todo, handleInput: this.handleInput, addTodo: this.addTodo, todos, deleteTodo: this.deleteTodo, updateTodo: this.updateTodo }}
                >
                    <TodoForm />
                    <br />
                    <TodoList />
                </ToDoContext.Provider>
                <br />
                <div>Pending tasks: {this.unfinished()}</div>
            </div>
        );
    }
}

// export function TodoContextApp() {
//     return (
//         <div className="App">
//             <ToDoContextApp>
//                 <ToDoItems />
//             </ToDoContextApp>
//         </div>
//     );
// }
