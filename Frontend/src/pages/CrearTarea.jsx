import React, { useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/CrearTarea.css';

const CrearTarea = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState(''); 
    const [prioridad, setPrioridad] = useState(1); 
    const [estado, setEstado] = useState('pendiente');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/tareas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ 
                    titulo: nombre, 
                    descripcion, 
                    proyecto: id,
                    prioridad, 
                    estado
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensaje || 'Error desconocido');
            }

            alert('Tarea creada con éxito');
            navigate(`/proyecto/${id}/tareas`); 
        } catch (error) {
            alert(`Error al crear la tarea: ${error.message}`);
            console.error('Error al crear la tarea:', error);
        }
    };

    return (
        <div className="crear-tarea-container">
            <h2>Crear Nueva Tarea</h2>
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
                <button type="submit">Crear Tarea</button>
            </form>
        </div>
    );
};

export default CrearTarea;
