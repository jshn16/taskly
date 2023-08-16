import React from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";

//using local storage to fetch data
function todoData(){
    const data= localStorage.getItem('Todos')
    if(data){
        return(JSON.parse(data))
    }
    else{
        return([])
    }
}


function Form(){

    const[todoValue, setTodoValue]=useState("");

    const[todos, setTodo]=useState(todoData())
    // console.log(todos)
    

    function handleSubmit(event){
        
        event.preventDefault();

        let todoObject={
            id: uuid(),
            todoName:todoValue,
            todoCompleted:false
        }

            setTodo([...todos, todoObject])

            
        setTodoValue(todoValue);
        // console.log(todoObject)
        // console.log(`${todoValue} Saved To localStorage`)
        setTodoValue("")
    }

    //storing data in localStorage 

    useEffect(()=>{
        localStorage.setItem('Todos', JSON.stringify(todos))
        
    })
    return(
        <div className='container'>
            <form className='taskForm'>
                <div>
                    <input type='text' placeholder='Add Tasks' onChange={(event)=>{setTodoValue(event.target.value)}} value={todoValue}/>
                    <button onClick={handleSubmit} type='submit'>Add</button>
                </div>
            </form>

            <div className='todoList'>
                
                 {todos.length>0 &&(
                    todos.map((todo,index)=>(
                        <span key={index}>
                            <p>{todo.todoName}</p>
                        </span>
                        
                    ))
                 )}

                
                
            </div>
        </div>
    )
}

export default Form