import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bienvenido a la Aplicación</h1>
            <p>
                <Link className="nav-link" to="/register">Registrarse</Link> | 
                <Link className="nav-link" to="/login"> Iniciar Sesión</Link>
            </p>
        </div>
    );
};

export default Home;
