import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

//React Icons
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import { BsFillCalendarPlusFill } from "react-icons/bs";

//date

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

  let date = new Date().toLocaleString();
  // console.log(todos)
  let todoForm = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    if (todoValue) {
      let todoObject = {
        id: uuid(),
        todoName: todoValue,
        todoCompleted: false,
        dateCreated: date,
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

  //Delete todo item
  function handleDelete(id) {
    console.log(id);
    //only show those todo's that has id not equall to the one clicked
    let removeTodo = todos.filter((todo) => todo.id !== id);
    console.log(removeTodo)
    setTodo(removeTodo);
  }

  //Edit Todo Function
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

    let editDate = date;
    todoItem.todoName = todoValue;
    todoItem.dateCreated = editDate;
    console.log(todoItem);
    setTodo(todoItems);
    setTodoValue(``);
    setEditForm(false);

  }

  //Checkbox Handler
  function handleComplete(todo, index) {
    setEditForm(false);
    let todoItems = [...todos];

    if (todo.todoCompleted === false) {
      todo.todoCompleted = true;

      // divChild.style.textDecoration='line-through'
    } else if (todo.todoCompleted === true) {

      todo.todoCompleted = false;
      // divChild.style.textDecoration='none'
    }
    setTodoValue(todo);
    setTodo(todoItems);
    setTodoValue(``);
  }

  return (
    <div className="container">
      <h1>Taskly</h1>
      <hr />
      {editForm === false && (
        <div className="form">
          <form ref={todoForm} className="taskForm">
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="Add Tasks"
                onChange={(event) => {
                  setTodoValue(event.target.value);
                }}
              />
              <button
                className="btn-common"
                onClick={handleSubmit}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}

      {editForm === true && (
        <div className="form">
          <form className="taskForm">
            <div>
              <input
                className="inputBox"
                type="text"
                placeholder="Add Tasks"
                onChange={(event) => {
                  setTodoValue(event.target.value);
                }}
                value={todoValue}
              />
              <button
                className="btn-common"
                onClick={handleEditSubmit}
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="todoList">
        {(() => {
          if (todos.length === 0) {
            return (
              <div className="empty">
                <BsFillCalendarPlusFill />
                <h3>No Tasks Yet? </h3>
                <h4>Start by Clicking On Add Button</h4>
              </div>
            );
          } else if (todos.length > 0) {
            return todos.map((todo, index) => (
              <div key={index}>
                {/* <button onClick={() => { handleEdit(todo.id) }}>Edit</button> */}

                <div className="todo">
                  <input
                    type="checkbox"
                    className="checkBox"
                    onChange={() => {
                      handleComplete(todo, index);
                    }}
                    checked={todo.todoCompleted}
                  />

                  <div className="todoInfo">
                    <p
                      style={
                        todo.todoCompleted === true
                          ? {
                            textDecoration: "line-through",
                            fontStyle: "italic",
                          }
                          : { textDecoration: "none" }
                      }
                    >
                      {todo.todoName}
                    </p>

                    <span>{todo.dateCreated}</span>
                  </div>
                </div>

                <div className="actions">
                  {/* <button
                    className="btn-common"
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    Delete
                  </button> */}
                  <AiFillDelete
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  />
                  <FaEdit
                    onClick={() => {
                      handleEdit(todo, index);
                    }}
                  />
                </div>
              </div>
            ));
          }
        })()}
      </div>
      <div className="social">
        <div className="icons">
          <a
            target="_blank"
            className="icon"
            href="https://www.linkedin.com/in/jshnsaini/"
          >
            <LinkedInIcon />
          </a>
          <a target="_blank" className="icon" href="https://github.com/jshn16">
            <GitHubIcon />
          </a>
          <a
            target="_blank"
            className="icon"
            href="https://www.instagram.com/jshnsaini/"
          >
            <InstagramIcon />
          </a>

          <a
            target="_blank"
            className="icon"
            href="https://www.jshnsaini.ca/"
          >
            <LanguageRoundedIcon />
          </a>
        </div>

        <div>
          <span>&copy; 2023 jshnsaini</span>
        </div>
      </div>
    </div>
  );
}

export default Form;
