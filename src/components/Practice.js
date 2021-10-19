import { useState } from 'react'

function Practice() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Selectus aut autem', completed: false },
    { id: 2, title: 'Luis ut nam facilis et officia qui', completed: false },
    { id: 3, title: 'Fugiat veniam minus', completed: false },
    { id: 4, title: 'Aet porro tempora', completed: true },
    { id: 5, title: 'Laboriosam mollitia et enim quasi', completed: false },
  ])

  const changeInput = (e) => {
    todos.map(
      (items) =>
        items.id === parseInt(e.target.value) &&
        (items.completed = e.target.checked)
    )
    setTodos([...todos], todos)
  }
  return (
    <div className='container'>
      {todos.map((items) => {
        return (
          <div key={items.id}>
            <label>
              <input
                type='checkbox'
                onChange={changeInput}
                value={items.id}
                checked={items.completed}
              />
              &nbsp; {items.title}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default Practice
