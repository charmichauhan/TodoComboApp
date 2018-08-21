
export const addTodo = e => ({
	type: 'ADD_TODO',
	payload: ''
})

export const removeTodo = id => ({
	type: 'REMOVE_TODO',
	payload: id
})

export const editTodo = todo => ({
	type: 'EDIT_TODO',
	todo: todo
})

export const toggleTodo = id => ({
	type: 'TOGGLE_TODO',
	payload: id
})
