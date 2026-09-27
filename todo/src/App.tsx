import { useEffect, useState } from 'react'
import Form from './components/Todo/Form'
import List, { type Todo } from './components/Todo/List'
import './App.css'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem('todos')
      return savedTodos
        ? (JSON.parse(savedTodos) as Todo[]).map(({ id, text }) => ({ id, text }))
        : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(text: string) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: Date.now(), text },
    ])
  }

  function updateTodo(id: number, text: string) {
    const trimmedText = text.trim()
    if (!trimmedText) return

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    )
  }

  function deleteTodo(id: number) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="todo-app">
      <h1>Todo List</h1>
      <Form onAdd={addTodo} />
      <List
        todos={todos}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </main>
  )
}

export default App
