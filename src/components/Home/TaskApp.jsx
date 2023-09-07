import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";

function TaskApp() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    const [tasks, setTasks] = useState(stored);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
        assignedTo: '', // Assuming user IDs for assignment
        status: 'pending',
    });

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('data', storedTasks);
        setTasks(storedTasks);
    }, []);

    // Save tasks to local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login')
        } else {
            if (!newTask.title || !newTask.description || !newTask.dueDate) {
                alert('Please fill in all required fields.');
                return;
            }

            setTasks([...tasks, newTask]);
            setNewTask({
                title: '',
                description: '',
                dueDate: '',
                priority: 'low',
                assignedTo: '',
                status: 'pending',
            });
        }


    };

    return (
        <div>
            <h1 className='text-center font-bold text-3xl'>Create a Task</h1>
            <form className='border max-w-5xl mx-auto shadow-xl p-10 rounded space-y-5'>
                <div>
                    <label className='font-bold pr-5'>Title:</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex items-center'>
                    <label className='font-bold pr-5'>Description:</label>
                    <textarea
                        className='textarea textarea-bordered'
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='font-bold pr-5'>Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='font-bold pr-5'>Priority:</label>
                    <select
                        name="priority"
                        value={newTask.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label className='font-bold pr-5'>Assign To:</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="text"
                        name="assignedTo"
                        placeholder='User Name'
                        value={newTask.assignedTo}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='font-bold pr-5'>Status:</label>
                    <select
                        name="status"
                        value={newTask.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className='btn' type="submit">Create Task</button>
            </form>
            <h2>Task List</h2>
            <ul>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='font-bold text-black'>
                                <th></th>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                <th>Assigned To</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                tasks.map((task, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{task.dueDate}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.assignedTo}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))

                            }

                        </tbody>
                    </table>
                </div>

            </ul>
        </div>
    );
}

export default TaskApp;
