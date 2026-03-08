import { useState, useEffect } from 'react';
import { deleteApi, getApi, postApi } from "../../api/api.js"
import FormComponent from './FormComponent.jsx';
import TodosPending from './TodosPending.jsx';


function ListComponent() {
    const [toDo, setToDo] = useState([]);
    const userName = "BelkisAle"


    function createUser() {
        postApi(`https://playground.4geeks.com/todo/users/${userName}`)
    }

    function getUser() {
        getApi(`https://playground.4geeks.com/todo/users/${userName}`)
            .then((user) => {
                if (user.name) {
                    setToDo(user.todos)

                } else { createUser() }
            })
    }

    function getTodos() {
        getApi(`https://playground.4geeks.com/todo/users/${userName}`)
            .then((toDo) => {
                setToDo(toDo.todos)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUser();
    }, []);

    const eliminarTarea = (id) => {
        deleteApi(`https://playground.4geeks.com/todo/todos/${id}`).then(() => {
            getTodos();
        })
    }
    return (
        <div>
            <div className='row p-5'>
                <div className="card m-auto col-4">
                    <div className="card-header text-center">
                        TAREAS PENDIENTES
                    </div>
                    <FormComponent nombreDeUsuario={userName} getTodosProps={getTodos} />
                    <div className='lista-de-tareas'>
                        <ul className='lista-tareas'>

                            {toDo.map((toDo) => (
                                <li key={toDo.id} className="lista-tareas-item">
                                    <div className='d-flex justify-content-between'>
                                        {toDo.label}
                                        <button onClick={() => eliminarTarea(toDo.id)} className='boton-eliminar btn btn-outline-danger px-1 py-1 m-1' style={{ fontSize: '0.7rem', lineHeight: '1' }}>eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <TodosPending tareitas={toDo} eliminarTarea={eliminarTarea}/>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ListComponent
