import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Styles/CrearProyecto.css';

const CrearProyecto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const proyectoData = {
            usuario: localStorage.getItem('userId'),
            nombre,
            descripcion,
            fechaInicio, 
            fechaFin
        };

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/proyectos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(proyectoData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'La fecha de inicio no puede ser mayor que la fecha de fin');
            }

            const data = await response.json();
            console.log('Proyecto creado:', data);
            navigate('/ProyectosFron'); 
        } catch (error) {
            alert(error.message);
            console.error('Error al crear el proyecto:', error);
        }
    };

    return (
        <div className="crear-proyecto-container">
            <h2>Crear Nuevo Proyecto</h2>
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
                <button type="submit" className="proyecto-boton">Crear Proyecto</button>
            </form>
        </div>
    );
};

export default CrearProyecto;
