import React from 'react'
import { useState} from 'react';
import {postApi } from "../../api/api.js"

function FormComponent({nombreDeUsuario, getTodosProps}) {
    const [textoNuevo, setTextoNuevo] = useState("")

    const agregarTareas = () => {
        if (textoNuevo.trim() === "") {
            alert("No puedes agregar una tarea vacia")
            return
        }
        postApi(`https://playground.4geeks.com/todo/todos/${nombreDeUsuario}`, {

            "label": textoNuevo,
            "is_done": false
        })
            .then(() => getTodosProps())
            .catch((error) => console.log(error));
        setTextoNuevo("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        agregarTareas();
    }

    return (
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
    )
}

export default FormComponent