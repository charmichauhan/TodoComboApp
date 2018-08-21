import React, { Component } from 'react'
import { view } from 'react-easy-state';

class TodoForm extends Component {

    render() {
        const { todo, addData, onChange } = this.props;
        return (
            <form onSubmit={addData}>
                <input value={todo.text} name="text" onChange={onChange} />
                {!todo.id ? <button>Add</button> : <button>Update</button>}
            </form>
        )
    }
}
export default view(TodoForm)