import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProyectosFron from './pages/ProyectosFron';
import CrearProyecto from './pages/CrearProyecto';
import ActualizarProyecto from './pages/ActualizarProyecto';
import ActualizarTarea from './pages/ActualizarTarea';
import CrearTarea from './pages/CrearTarea';
import TareasFron from './pages/TareasFron';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/proyectosFron" element={<ProyectosFron />} />
                <Route path="/crear-proyecto" element={<CrearProyecto />} />
                <Route path="/actualizar-proyecto/:id" element={<ActualizarProyecto />} />
                <Route path="/proyecto/:id/tareas" element={<TareasFron />} />
                <Route path="/crear-tarea/:id" element={<CrearTarea />} />
                <Route path="/actualizar-tarea/:id" element={<ActualizarTarea />} />
            </Routes>
        </Router>
    );
};

export default App;


