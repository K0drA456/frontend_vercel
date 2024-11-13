import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/TareasFron.css';

const TareasFron = () => {
    const { id } = useParams();
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    const cargarTareas = async () => {
        const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

        try {
            const response = await fetch(`${backendURL}/api/tareas/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar las tareas');
            }

            const data = await response.json();
            console.log('Tareas cargadas:', data);
            setTareas(data);
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    };

    useEffect(() => {
        cargarTareas();
    }, [id]);

    const handleDelete = async (tareaId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            try {
                const response = await fetch(`${backendURL}/api/tareas/${tareaId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar la tarea');
                }

                setTareas(tareas.filter(tarea => tarea._id !== tareaId));
                alert('Tarea eliminada con éxito');
            } catch (error) {
                alert(error.message);
                console.error('Error al eliminar la tarea:', error);
            }
        }
    };

    const handleEdit = (tarea) => {
        navigate(`/actualizar-tarea/${tarea._id}`, { state: { tarea } });
    };

    const handleCreateTask = () => {
        navigate(`/crear-tarea/${id}`); 
    };

    const handleBackToProjects = () => {
        navigate('/ProyectosFron'); // Redirigir a la lista de proyectos
    };

    return (
        <div className="tareas-container">
            <h2>Tareas del Proyecto</h2>
            
            <button 
                className="boton-crear" 
                onClick={handleCreateTask}
            >
                Crear Nueva Tarea
            </button>
            <button 
                className="boton-volver" 
                onClick={handleBackToProjects}
            >
                Volver a Proyectos
            </button>
            <ul className="tareas-list">
                {tareas.map((tarea) => (
                    <li key={tarea._id}>
                        <span>{tarea.titulo}</span>
                        <button onClick={() => handleEdit(tarea)}>Actualizar</button>
                        <button onClick={() => handleDelete(tarea._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TareasFron;
