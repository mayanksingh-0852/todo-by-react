import React, { useState } from "react"
import { useTodo } from '../contexts/TodoContaxt'

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)

    const { updateTodo, deleteTodo, toggleComplete } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleComp = () => {
        toggleComplete(todo.id)
    }

    return (
        <div className={`flex border rounded-lg px-3 py-1.5 gap-x-3 shadow-sm duration-300 text-black ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}>
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleComp}
            />

            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />

            <button
                onClick={() => {
                    if (todo.completed) return
                    isTodoEditable ? editTodo() : setIsTodoEditable(prev => !prev)
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>

            <button onClick={() => deleteTodo(todo.id)}>
                ❌
            </button>
        </div>
    )
}

export default TodoItem