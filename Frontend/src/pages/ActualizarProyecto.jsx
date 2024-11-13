import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Styles/ActualizarProyecto.css';

const ActualizarProyecto = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const navigate = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Definimos proyectoData solo con campos que tengan un valor
        const proyectoData = {};
        if (nombre) proyectoData.nombre = nombre;
        if (descripcion) proyectoData.descripcion = descripcion;
        if (fechaInicio) proyectoData.fechaInicio = fechaInicio;
        if (fechaFin) proyectoData.fechaFin = fechaFin;

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/proyectos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(proyectoData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el proyecto');
            }

            const data = await response.json();
            console.log('Proyecto actualizado:', data);
            navigate('/ProyectosFron'); // Nos redirigimos al portal de proyectos
        } catch (error) {
            alert(error.message);
            console.error('Error al actualizar el proyecto:', error);
        }
    };

    return (
        <div className="actualizar-proyecto-container">
            <h2>Actualizar Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="proyecto-input"
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    placeholder="Nombre del Proyecto" 
                    required
                />
                <textarea 
                    className="proyecto-textarea"
                    value={descripcion} 
                    onChange={(e) => setDescripcion(e.target.value)} 
                    placeholder="Descripción del Proyecto" 
                />
                <input 
                    type="date" 
                    className="proyecto-input" 
                    value={fechaInicio} 
                    onChange={(e) => setFechaInicio(e.target.value)} 
                />
                <input 
                    type="date" 
                    className="proyecto-input" 
                    value={fechaFin} 
                    onChange={(e) => setFechaFin(e.target.value)} 
                />
                <button type="submit" className="proyecto-boton">Actualizar Proyecto</button>
            </form>
        </div>
    );
};

export default ActualizarProyecto;
