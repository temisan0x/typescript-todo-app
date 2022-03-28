import React, { Fragment, useState } from 'react';
import './App.css';


//form alias ~  type references another type 
type FormElem = React.FormEvent<HTMLFormElement> //generic alias for eventt

//interface creates a completely new type of form element
//NB. interface can be extended
interface ITodo {
  text: string
  complete: boolean
}

const App = (): JSX.Element => {
  //hooks
  const [value, setValue] = useState<string>(''); //passed in a "string" generic 
  const [todos, setTodos] = useState<ITodo[]>([]);  //passed ITodo interface as generic
  console.log(todos);
  
  //add new todo
  //& assigning ~ complete
  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { complete: false, text }]//passed empty todo array
    setTodos(newTodos); //whatever value passed from the todos array gets stored here.
  }

    //handle form submit
    const handleSubmit = (e: FormElem): void => {
      setValue('');
      addTodo(value) //value is added to our todos array.
      e.preventDefault();
    }
  

  //clone of the old todo
  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete //toggle value & pass it to setTodos
    setTodos(newTodos)
  }

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos] //mutate todo
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
        {/* loop */}
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
