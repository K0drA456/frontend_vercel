import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;  // Usamos la variable de entorno

            const response = await fetch(`${backendURL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);  // Asumiendo que el userId también se devuelve
                alert('Inicio de sesión exitoso');
                navigate('/proyectosFron');
            } else {
                alert(data.mensaje || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>No tienes una cuenta? <Link to="/register" className="nav-link">Regístrate aquí</Link></p>
        </div>
    );
};

export default Login;
