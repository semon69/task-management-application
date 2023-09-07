import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from "react-router-dom";
import TaskList from './TaskList';

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
    const handleSortingChange = (sortOption) => {
        let sortedTasks = [...tasks];

        if (sortOption === "priority") {
            // Sort by priority (low, medium, high)
            sortedTasks.sort((a, b) => {
                const priorityOrder = { low: 1, medium: 2, high: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (sortOption === "dueDate") {
            // Sort by due date
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }

        // Update state with sorted tasks
        setTasks(sortedTasks);
    };

    const [statusFilter, setStatusFilter] = useState('all');

    const filteredTasks = tasks.filter((task) => {
        if (statusFilter === 'all') {
            return true;
        }
        return task.status === statusFilter;
    });

    return (
        <div className=''>
            <h1 className='text-center font-bold text-3xl text-orange-400 my-6'>Create a Task</h1>
            <form className='border max-w-5xl mx-auto shadow-xl p-10 rounded space-y-5'>
                <div>
                    <label className='font-bold pr-5'>Title:</label>
                    <input
                        className="input input-bordered w-full max-w-xs text-black"
                        type="text"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex items-center'>
                    <label className='font-bold pr-5'>Description:</label>
                    <textarea
                        className='textarea textarea-bordered text-black'
                        name="description"
                        value={newTask.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='font-bold pr-5'>Due Date:</label>
                    <input
                        className='bg-indigo-950 text-white border-2 p-2 rounded'
                        type="date"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className='font-bold pr-5'>Priority:</label>
                    <select
                        className='bg-indigo-950 text-white border-2 p-2 rounded'
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
                        className="input input-bordered w-full max-w-xs text-black"
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
                        className='bg-indigo-950 text-white  border-2 p-2 rounded'
                        name="status"
                        value={newTask.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button onClick={handleSubmit} className='btn bg-orange-400 font-bold text-white' type="submit">Create Task</button>
            </form>
            <TaskList setStatusFilter={setStatusFilter} handleSortingChange={handleSortingChange} filteredTasks={filteredTasks}></TaskList>
        </div>
    );
}

export default TaskApp;
