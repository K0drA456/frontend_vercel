// const API_URL = 'http://localhost:3000/api';

// export const fetchTasks = async (projectId) => {
//     const response = await fetch(`${API_URL}/proyectos/${projectId}/tareas`, {
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//     });
//     return response.json();
// };

// export const createTask = async (projectId, task) => {
//     const response = await fetch(`${API_URL}/proyectos/${projectId}/tareas`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(task),
//     });
//     return response.json();
// };

// export const updateTask = async (taskId, updatedTask) => {
//     const response = await fetch(`${API_URL}/tareas/${taskId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(updatedTask),
//     });
//     return response.json();
// };

// export const deleteTask = async (taskId) => {
//     await fetch(`${API_URL}/tareas/${taskId}`, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//     });
// };

