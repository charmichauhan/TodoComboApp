import React, { Component } from 'react';

class TodoForm extends Component {
    render() {
        const { todo, onChange, addTodo } = this.props;

        return (
            <form onSubmit={addTodo}>
                <input type="text" name="text" value={todo.text} onChange={onChange} />
                {!todo.id ? <button>Add</button> : <button>Update</button>}
            </form>
        )
    }
}

class TodoList extends Component {
    render() {
        const { todos, removeTodo, update } = this.props;

        return todos.map((item) => {
            return <TodoItem key={item.id} item={item} removeTodo={removeTodo} update={update} />
        })
    }
}

class TodoItem extends Component {
    render() {
        const { item, removeTodo, update } = this.props;

        return (
            <div>
                <li style={{ float: 'left' }} onClick={() => update(item)}>
                    <input type="checkbox" checked={item.finished} onChange={e => (item.finished = !item.finished)} />
                    {item.text}{" "}{" "}
                </li>
                <button style={{ float: 'center' }} onClick={() => removeTodo(item.id)}>Remove</button>
            </div>
        )
    }
}

let id = 1;
const defaultTodo = {
    text: '',
}

class TodoAppState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
                { id: ++id, text: 'abc', finished: false },
                { id: ++id, text: 'xyz', finished: false }
            ],
            todo: { ...defaultTodo }
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("this.state", this.state)
    //     console.log("next state", nextState)
    //     return this.state !== nextState
    // }

    onChange(e) {
        const { todo } = this.state;
        todo[e.target.name] = e.target.value
        this.setState({ todo })
    }

    addTodo(e) {
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
    }

    update(record) {
        this.setState({ todo: { ...record } })
    }

    removeTodo(id) {
        const { todos } = this.state;
        const findTodoIndex = this.findTodoIndexById(id);
        todos.splice(findTodoIndex, 1);
        this.setState({ todos: [...todos] });
    }

    findTodoIndexById(id) {
        return this.state.todos.findIndex(x => x.id === id);
    }

    unfinished() {
        return this.state.todos.filter(todo => !todo.finished).length;
    }

    render() {
        const { todo, todos } = this.state;
        console.log("render-setstate");

        return (
            <div>
                <h3>Todo App with setState</h3>
                <TodoForm
                    todo={todo}
                    onChange={(e) => this.onChange(e)}
                    addTodo={(e) => this.addTodo(e)}
                />
                <br />
                <TodoList
                    todos={todos}
                    removeTodo={(index) => this.removeTodo(index)}
                    update={(todo) => this.update(todo)}
                />
                <br />
                <div>Pending tasks: {this.unfinished()}</div>
            </div>
        )
    }
}

export default TodoAppState;    