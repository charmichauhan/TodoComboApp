import React, { Component } from 'react';

class TodoForm extends Component {
    render() {
        const { todo, onChangeTodo, addTodo } = this.props;
        return (
            <form onSubmit={addTodo}>
                <input type="text" name="text" value={todo.text} onChange={onChangeTodo} />
                {!todo._id ? <button>Add</button> : <button>Update</button>}
            </form>
        )
    }
}

class TodoList extends Component {
    render() {
        const { todos, removeTodo, updateTodo, toggleTodo } = this.props;

        return todos && todos.map((item) => {
            return <TodoItem key={item._id} item={item} removeTodo={removeTodo} updateTodo={updateTodo} toggleTodo={toggleTodo} />
        })
    }
}

class TodoItem extends Component {
    render() {
        const { item, removeTodo, updateTodo, toggleTodo } = this.props;

        return (
            <div>
                <li style={{ float: 'left' }}>
                    <input type="checkbox" checked={item.finished} onChange={() => toggleTodo(item)} />
                    <span onClick={() => updateTodo(item)}>{item.text}{" "}{" "}</span>
                </li>
                <button style={{ float: 'center' }} onClick={() => removeTodo(item._id)}>Remove</button>
            </div>
        )
    }
}

const defaultTodo = {
    text: '',
};

class TodoMongNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: { ...defaultTodo },
            todos: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/todo/')
            .then((res) => res.json())
            .then(result => {
                console.log('result', result)
                this.setState({ todos: result });
            })
    }

    findTodoIndexById(_id) {
        return this.state.todos && this.state.todos.findIndex(x => x._id === _id);
    }

    onChangeTodo(e) {
        const { todo } = this.state;
        todo[e.target.name] = e.target.value
        this.setState({ todo })
    }

    addTodo(e) {
        e.preventDefault();
        const { todo, todos } = this.state;
        if (todo._id) {
            //edit
            const findTodoIndex = this.findTodoIndexById(todo._id);
            todos[findTodoIndex] = todo;
            fetch('http://localhost:5000/todo/' + todo._id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todos[findTodoIndex])
            }).then((res) => res.json())
                .then((result) => {
                    this.setState({ todos: [...todos], todo: { ...defaultTodo } });
                })
        }
        else {
            //add
            fetch('http://localhost:5000/todo/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: todo.text,
                    finished: false
                })
            }).then((res) => res.json())
                .then((result) => {
                    this.setState({ todos: [...todos, result], todo: { ...defaultTodo } })
                })
        }
    }

    updateTodo(record) {
        this.setState({ todo: { ...record } })
    }

    removeTodo(_id) {
        const { todos } = this.state;
        const findTodoIndex = this.findTodoIndexById(_id);
        fetch('http://localhost:5000/todo/' + _id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
            .then((result) => {
                todos.splice(findTodoIndex, 1);
                this.setState({ todos: [...todos] })
            })
    }

    toggleTodo(todo) {
        const { todos } = this.state;
        const findTodoIndex = this.findTodoIndexById(todo._id);
        console.log('findTodoIndex todo._id', findTodoIndex, todo._id)
        todos[findTodoIndex].finished = !todos[findTodoIndex].finished;
        console.log('data', todos[findTodoIndex].finished)
        fetch('http://localhost:5000/toggle-todo/' + todo._id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: todos[findTodoIndex].text, finished: todos[findTodoIndex].finished})
        }).then((res) => res.json())
            .then((result) => {
                console.log('toggle-res', result);
                this.setState({ todos: [...todos], todo: { ...defaultTodo } });
            })
    }

    unfinished() {
        return this.state.todos.filter(todo => !todo.finished).length
    }

    render() {
        const { todo, todos } = this.state;
        console.log('render-node', todos);

        return (
            <div>
                <h3> Todo Application with Nodejs and Mongodb </h3>
                <TodoForm
                    todo={todo}
                    onChangeTodo={(e) => this.onChangeTodo(e)}
                    addTodo={(e) => this.addTodo(e)}
                />
                <br />
                <TodoList
                    todos={todos}
                    updateTodo={(todo) => this.updateTodo(todo)}
                    removeTodo={(id) => this.removeTodo(id)}
                    toggleTodo={(todo) => this.toggleTodo(todo)}
                />
                <br />
                <div>Pending Tasks: {this.unfinished()}</div>
            </div>
        );
    }
}

export default TodoMongNode;
