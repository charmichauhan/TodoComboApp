import React, { Component } from 'react'
import { view } from 'react-easy-state';
import { todoStore } from './TodosApp';

const TodoItem = view(({ todo, index, removeData }) => (
    <div>
        <li style={{float: 'left'}} onClick={e => (todoStore.todo = todo)}>
            <input
                type="checkbox"
                checked={todo.finished}
                onChange={e => (todo.finished = !todo.finished)}
            />
            {todo.text}{" "}{" "}
        </li>
        <button style={{float: 'center'}} onClick={() => removeData(index)}>Remove</button>
    </div>
))

class TodoList extends Component {

    render() {
        let { todos, removeData } = this.props;
        return todos.map((todo, index) => {
            return <TodoItem key={todo.id} todo={todo} index={index} removeData={removeData} />
        })
    }
}

export default view(TodoList)
