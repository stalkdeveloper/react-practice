import { useState } from 'react'

export interface Todo {
	id: number
	text: string
}

interface ListProps {
	todos: Todo[]
	onUpdate: (id: number, text: string) => void
	onDelete: (id: number) => void
}

function List({ todos, onUpdate, onDelete }: ListProps) {
	const [editingId, setEditingId] = useState<number | null>(null)
	const [editText, setEditText] = useState('')
	const [viewingTodo, setViewingTodo] = useState<Todo | null>(null)

	if (todos.length === 0) {
		return <p className="empty-message">No todos yet.</p>
	}

	return (
		<>
			<ul className="todo-list">
				{todos.map((todo) => (
					<li key={todo.id}>
						{editingId === todo.id ? (
							<>
								<input
									aria-label="Edit todo"
									className="todo-edit-input"
									onChange={(event) => setEditText(event.target.value)}
									value={editText}
								/>
								<button
									type="button"
									onClick={() => {
										onUpdate(todo.id, editText)
										setEditingId(null)
									}}
								>
									Save
								</button>
								<button type="button" onClick={() => setEditingId(null)}>
									Cancel
								</button>
							</>
						) : (
							<>
								<span className="todo-text">{todo.text}</span>
								<div>
									<button type="button" onClick={() => setViewingTodo(todo)}>
										View
									</button>
									<button
										type="button"
										onClick={() => {
											setEditingId(todo.id)
											setEditText(todo.text)
											setViewingTodo(null)
										}}
									>
										Edit
									</button>
									<button
										aria-label={`Delete ${todo.text}`}
										onClick={() => {
											onDelete(todo.id)
											if (viewingTodo?.id === todo.id) setViewingTodo(null)
										}}
										type="button"
									>
										Delete
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
			{viewingTodo && (
				<section className="todo-details">
					<h2>Todo details</h2>
					<p>{viewingTodo.text}</p>
					<button type="button" onClick={() => setViewingTodo(null)}>
						Close
					</button>
				</section>
			)}
		</>
	)
}

export default List