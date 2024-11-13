import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/ActualizarTarea.css';

const ActualizarTarea = () => {
    const { state } = useLocation();
    const [nombre, setNombre] = useState(state.tarea.titulo);
    const [descripcion, setDescripcion] = useState(state.tarea.descripcion || ''); 
    const [prioridad, setPrioridad] = useState(state.tarea.prioridad || 1);
    const [estado, setEstado] = useState(state.tarea.estado || 'pendiente');
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !state.tarea) {
            navigate(-1); 
        }
    }, [state, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/tareas/${state.tarea._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ 
                    titulo: nombre, 
                    descripcion, 
                    prioridad, 
                    estado 
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || 'Error desconocido');
            }

            alert('Tarea actualizada con éxito');
            navigate(`/proyecto/${state.tarea.proyecto}/tareas`); // Redirigir después de actualizar la tarea
        } catch (error) {
            alert(`Error al actualizar la tarea: ${error.message}`);
            console.error('Error al actualizar la tarea:', error);
        }
    };

    return (
        <div className="actualizar-tarea-container">
            <h2>Actualizar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Nombre de la Tarea" 
                    required
                />
                <textarea 
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    placeholder="Descripción de la Tarea"
                />
                <input 
                    type="number" 
                    value={prioridad} 
                    onChange={(e) => setPrioridad(e.target.value)} 
                    min="1" 
                    max="5" 
                    placeholder="Prioridad (1-5)" 
                    required
                />
                <select 
                    value={estado} 
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En Progreso</option>
                    <option value="completada">Completada</option>
                </select>
                <button type="submit">Actualizar Tarea</button>
            </form>
        </div>
    );
};

export default ActualizarTarea;
