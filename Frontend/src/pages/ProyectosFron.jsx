import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/ProyectosFron.css';

const ProyectosFron = () => {
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();

    const cargarProyectos = async () => {
        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/proyectos`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            setProyectos(data);
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
        }
    };

    useEffect(() => {
        cargarProyectos();
    }, []);

    const handleDeleteProject = async (projectId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este proyecto y todas sus tareas?')) {
            try {
                const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

                const response = await fetch(`${backendURL}/api/proyectos/${projectId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Error al eliminar el proyecto');
                }
    
                setProyectos(proyectos.filter(proyecto => proyecto._id !== projectId));
                alert('Proyecto y tareas eliminados con éxito');
            } catch (error) {
                alert(error.message);
                console.error('Error al eliminar el proyecto:', error);
            }
        }
    };

    const handleEdit = (proyecto) => {
        navigate(`/actualizar-proyecto/${proyecto._id}`); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        localStorage.removeItem('userId'); 
        navigate('/login'); 
    };

    const handleNavigateToTasks = (id) => {
        navigate(`/proyecto/${id}/tareas`); 
    };

    return (
        <div className="proyectos-container">
            <h2>Mis Proyectos</h2>
            <button 
                className="boton-crear" 
                onClick={() => navigate('/crear-proyecto')}
            >
                Crear Nuevo Proyecto
            </button>
            <button 
                className="boton-logout" 
                onClick={handleLogout}
            >
                Cerrar Sesión
            </button>
            <ul className="proyectos-list">
                {proyectos.map((proyecto) => (
                    <li className="proyecto-item" key={proyecto._id}>
                        <a 
                            href="#" 
                            className="proyecto-link"
                            onClick={() => handleNavigateToTasks(proyecto._id)}
                        >
                            {proyecto.nombre}
                        </a>
                        <button onClick={() => handleEdit(proyecto)}>Actualizar</button>
                        <button onClick={() => handleDeleteProject(proyecto._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProyectosFron;
