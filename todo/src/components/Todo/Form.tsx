import { useState } from 'react'

interface FormProps {
	onAdd: (text: string) => void
}

function Form({ onAdd }: FormProps) {
	const [text, setText] = useState('')

	return (
		<form
			className="todo-form"
			onSubmit={(event) => {
				event.preventDefault()
				const trimmedText = text.trim()

				if (trimmedText) {
					onAdd(trimmedText)
					setText('')
				}
			}}
		>
			<input
				aria-label="New todo"
				onChange={(event) => setText(event.target.value)}
				placeholder="Add a todo"
				value={text}
			/>
			<button type="submit">Add</button>
		</form>
	)
}

export default Form
