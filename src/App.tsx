import React, { Fragment, useState } from 'react';
import './App.css';

//interface creates a completely new type of form element
interface ITodo {
  text: string
  complete: boolean
}

//form alias ~  type references another type 
type FormElem = React.FormEvent<HTMLFormElement>

const App = () => {

  const [value, setValue] = useState<string>('');

  //handle form submit
  const handleSubmit = (e: FormElem): void => {
    setValue('');
    addTodo(value) //value is added to our Todo array.
    e.preventDefault();
  }

  const [todos, setTodos] = useState<ITodo[]>([]);

  //add new todo
  //& assigning ~ complete
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos,
    {
      complete: false,
      text
    }]
    setTodos(newTodos);
  }

  //clone of the old todo
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }


  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setValue(e.target.value)}
          value={value}
        />
        <button
          type="submit">
          Add Todo
        </button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => {
          return (
            <Fragment key={index}>
              <div style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
                {todo.text}
              </div>
              <button
                type="button"
                onClick={() => completeTodo(index)
                }
              >
                {todo.complete ? 'incomplete' : 'complete'}{'  '}
              </button>
              <button
                type="button"
                onClick={() => deleteTodo(index)}
              >
                &times;
              </button>
            </Fragment>
          )
        })}
      </section>
    </Fragment>
  );
}

export default App;
