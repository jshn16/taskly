import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

//using local storage to fetch data
function todoData() {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

function Form() {
  

  const [todoValue, setTodoValue] = useState("");

  const [todos, setTodo] = useState(todoData());
  // console.log(todos)
  let todoForm = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    if (todoValue) {
      let todoObject = {
        id: uuid(),
        todoName: todoValue,
        todoCompleted: false,
      };

      setTodo([...todos, todoObject]);

      setTodoValue(todoValue);
      // console.log(todoObject)
      // console.log(`${todoValue} Saved To localStorage`)
      setTodoValue("");
      todoForm.current.reset();
    } else {
      alert("please add task");
    }
  }

  //storing data in localStorage

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  //handleDelete
  function handleDelete(id) {
    console.log(id);
    //only show those todo's that has id not equall to the one clicked
    let removeTodo = todos.filter((todo) => todo.id !== id);
    setTodo(removeTodo);
  }

  const [editForm, setEditForm] = useState(false);
  const [id, setId] = useState();

  function handleEdit(todo, index) {
    console.log(index);
    console.log(todo.todoName);
    setEditForm(true);
    setId(index);
    setTodoValue(todo.todoName);
  }

  function handleEditSubmit(event) {
    event.preventDefault();
    let todoItems = [...todos];
    console.log(todoItems);
    let todoItem = todoItems[id];

    todoItem.todoName = todoValue;

    console.log(todoItem);
    setTodo(todoItems);
    setTodoValue(``);
    setEditForm(false);
  }

  //Checkbox Handler
  function handleComplete(todo, index) {
    let todoItems = [...todos];

    if (todo.todoCompleted === false) {
      todo.todoCompleted = true;

      // spanChild.style.textDecoration='line-through'
    } else if (todo.todoCompleted === true) {
      todo.todoCompleted = false;
      // spanChild.style.textDecoration='none'
    }
    setTodoValue(todo);

    setTodo(todoItems);
  }

  return (
    <div className="container">
      <h1>Taskly</h1>
      <hr />
      {editForm === false && (
        <div>
          <form ref={todoForm} className="taskForm">
            <div>
              <input
                type="text"
                placeholder="Add Tasks"
                onChange={(event) => {
                  setTodoValue(event.target.value);
                }}
              />
              <button onClick={handleSubmit} type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {editForm === true && (
        <div>
          <form className="taskForm">
            <div>
              <input
                type="text"
                placeholder="Add Tasks"
                onChange={(event) => {
                  setTodoValue(event.target.value);
                }}
                value={todoValue}
              />
              <button onClick={handleEditSubmit} type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="todoList">
        {todos.length > 0 &&
          todos.map((todo, index) => (
            <span key={index}>
              {/* <button onClick={() => { handleEdit(todo.id) }}>Edit</button> */}
              <input
                type="checkbox"
                onChange={() => {
                  handleComplete(todo, index);
                }}
                checked={todo.todoCompleted}
              />
              <p
                style={
                  todo.todoCompleted === true
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }
                }
              >
                {todo.todoName}
              </p>
              <button
                onClick={() => {
                  handleDelete(todo.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleEdit(todo, index);
                }}
                type="submit"
              >
                Edit
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Form;
