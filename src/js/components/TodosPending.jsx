import React from 'react'
import { useState } from 'react';

function TodosPending({tareitas, eliminarTarea}) {
    
    const borrarTodo = () => {
        if (window.confirm("Estas seguro que deseas borrar todas tus tareas?")) {
            tareitas.forEach((element) => eliminarTarea(element.id))
        }
    }

    return (
        <div>
            <p>{tareitas.length === 0 ? "No tienes tareas pendientes" : `Tienes ${tareitas.length} tareas pendientes`}</p>
            <button onClick={() => borrarTodo()} className='btn btn-danger mb-4'>Borrar todo</button>
        </div>
    )
}

export default TodosPending