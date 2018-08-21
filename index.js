import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from './Todo-mobx/TodoApp';

import TodosApp from './Todo-react-easy-state/TodosApp';

import { todoReducer } from './Todo-redux/reducer';
import TodoAppRedux from './Todo-redux/TodoAppRedux';

import TodoAppState from './Todo-setstate/TodoApp';

// import Repositories from './demo';

import ToDoContextApp from './Todo-context/newContext'
import App from './Todo-context/oldContext';

import TodoAppLB from './Todo-Loopback/todo/client/src/App';

import TodoMongNode from './TodoMongoNode/components/App';

const store = createStore(todoReducer);

ReactDOM.render(
    <Provider store={store}>
        <div style={{ padding: 20 }}>
            <div style={{ paddingBottom: 50 }}>
                <TodoApp />
            </div>
            <div style={{ paddingBottom: 50 }}>
                <TodosApp />
            </div>
            <div style={{ paddingBottom: 50 }}>
                <TodoAppRedux />
            </div>
            <div style={{ paddingBottom: 50 }}>
                <TodoAppState />
            </div>
            <div style={{ paddingBottom: 50 }}>
                <ToDoContextApp />
                <App />
            </div>
            <div style={{ paddingBottom: 50 }}>
                <TodoAppLB />
            </div>
            <TodoMongNode />
        </div>
        {/* <Repositories user="sindresorhus"/> */}
    </Provider>,
    document.getElementById('root'));
