import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodo, removeTodo, editTodo, toggleTodo } from './actions';
import { bindActionCreators } from 'redux';

class TodoForm extends Component {
    onChange(e) {
        const { todo } = this.props;
        todo[e.target.name] = e.target.value
        this.setState({ todo })
    }
    render() {
        const { todo, addTodo } = this.props;
        return (
            <div>
                <input type='text' name="text" value={todo.text} onChange={(e) => this.onChange(e)} />
                {!todo.id ? <button onClick={addTodo}>Add</button> : <button onClick={addTodo}>Update</button>}
            </div>
        )
    }
}

class TodoList extends Component {

    render() {
        const { todos, removeTodo, editTodo, toggleTodo } = this.props;
        return (
            <div>
                {todos && todos.map(item => {
                    return <TodoItem key={item.id} item={item} removeTodo={removeTodo} editTodo={editTodo} toggleTodo={toggleTodo} />
                })}
                <br />
            </div>
        )
    }
}

class TodoItem extends Component {
    render() {
        let { item, removeTodo, editTodo, toggleTodo } = this.props;
        return <div>
            <li style={{ float: 'left' }} onClick={(e) => editTodo(item)}>
                <input
                    type="checkbox"
                    checked={item.finished}
                    onClick={() => toggleTodo(item.id)}
                />
                {item.text}{" "}{" "}
            </li>
            <button ostyle={{ float: 'center' }} onClick={() => removeTodo(item.id)}>Remove</button>
        </div>
    }
}

class TodoAppRedux extends Component {

    // the component is re-rendered only if the previous value is not equal to upcoming / new value. 
    // returns true if they are different, or false if they are the same.
    // shouldComponentUpdate(nextProps) {
    //     console.log(nextProps)
    //     return this.props.todos !== nextProps;
    // }

    unfinished() {
        return this.props.todos.filter(todo => !todo.finished).length;
    }

    render() {
        console.log('render-redux');
        const { todo, todos, addTodo, removeTodo, editTodo, toggleTodo } = this.props;
        return (
            <div>
                <h3>Todo App with Redux</h3>
                <TodoForm
                    todo={todo}
                    addTodo={addTodo}
                />
                <br />
                <TodoList
                    todos={todos}
                    removeTodo={(id) => removeTodo(id)}
                    editTodo={(todo) => editTodo(todo)}
                    toggleTodo={(id) => toggleTodo(id)}
                />
                <div>Pending tasks: {this.unfinished()}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos,
        todo: state.todo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTodo: addTodo,
        removeTodo: removeTodo,
        editTodo: editTodo,
        toggleTodo: toggleTodo,
    }, dispatch);
    // return { addTodo: todo => dispatch(addTodo(todo)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppRedux);
