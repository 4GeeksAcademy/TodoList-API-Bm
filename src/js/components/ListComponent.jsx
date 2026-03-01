import { useState, useEffect } from 'react';
import { deleteApi, getApi, postApi } from "../../api/api.js"
function ListComponent() {

    const [textoNuevo, setTextoNuevo] = useState("")
    const [toDo, setToDo] = useState([]);
    function getTodos() {
        getApi('https://playground.4geeks.com/todo/users/BelkisAle')
            .then((toDo) => {
                setToDo(toDo.todos)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getTodos();
    }, []);

    const agregarTareas = () => {
        if (textoNuevo.trim() === "") {
            alert("No puedes agregar una tarea vacia")
            return
        }
        postApi('https://playground.4geeks.com/todo/todos/BelkisAle', {

            "label": textoNuevo,
            "is_done": false
        })
            .then(() => getTodos())
            .catch((error) => console.log(error));
        setTextoNuevo("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarTareas();
    }
    const eliminarTarea = (id) => {
        deleteApi(`https://playground.4geeks.com/todo/todos/${id}`).then(() => {
            getTodos();
        })
    }

    const borrarTodo = () => {
        if(window.confirm("Estas seguro que deseas borrar todas tus tareas?")) {
        toDo.forEach((element) => eliminarTarea(element.id))}
    }


    return (
        <div>
            <div className='row p-5'>
                <div className="card m-auto col-4">
                    <div className="card-header text-center">
                        TAREAS PENDIENTES
                    </div>
                    <form onSubmit={handleSubmit} className="card-body d-flex justify-content=center align-item-center gap-4">
                        <blockquote className="blockquote">
                            <label htmlFor="list"></label>
                            <input onChange={(e) => setTextoNuevo(e.target.value)}
                                type="text"
                                value={textoNuevo}
                                name="listComponent"
                                placeholder="Agrega una tarea" />
                        </blockquote>
                        <button onClick={agregarTareas} type="button" className="btn btn-danger mb-4">agregar</button>
                    </form>
                    <div className='lista-de-tareas'>
                        <ul className='lista-tareas'>

                            {toDo.map((toDo) => (
                                <li key={toDo.id} className="lista-tareas-item">{toDo.label}
                                    <button onClick={() => eliminarTarea(toDo.id)} className='boton-eliminar btn btn-outline-secondary px-1 py-1 m-1' style={{ fontSize: '0.7rem', lineHeight: '1' }}>x</button>
                                </li>
                            ))}
                        </ul>
                        <p>{toDo.length === 0 ? "No tienes tareas pendientes" : `Tienes ${toDo.length} tareas pendientes`}</p>
                        <button onClick={() => borrarTodo()} className='btn btn-danger mb-4'>Borrar todo</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ListComponent
