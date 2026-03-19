import { useState , useEffect } from 'react'
import { Todoprovider } from "./contexts/TodoContaxt.js"
import TodoItem from './components/TodoItem.jsx'
import TodoForm from "./components/TodoForm.jsx"
import './App.css'

function App() {
  const [todos,setTodos] = useState ([])

  const addTodo =(todo) => {
    setTodos((oldTodo) =>[...oldTodo ,{id:Date.now(), ...todo}])
  }

  const updateTodo = (id , todo) => {
    setTodos((oldTodo) => oldTodo.map((oldTodoTodo)=> (oldTodoTodo.id === id ?todo : oldTodoTodo )))
  }

  const deleteTodo =(id) => {
    setTodos((oldTodo)=> oldTodo.filter((todo)=> todo.id !== id))
  }

  const toggleComplete =(id) => {
    setTodos((oldTodo)=> 
      oldTodo.map((oldTodoTodo)=> 
        oldTodoTodo.id === id ? {...oldTodoTodo,
           completed: !oldTodoTodo.completed} : oldTodoTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  },[])


  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  return (
    <Todoprovider value={{todos,addTodo,deleteTodo,toggleComplete,updateTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'> 
                              <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
