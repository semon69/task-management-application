import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Dashborad = () => {
    const { user, } = useContext(AuthContext)
    const storedTask = JSON.parse(localStorage.getItem('tasks')) || [];
    const storedTeam = JSON.parse(localStorage.getItem('teams')) || [];
    const pendingTask = storedTask.filter(task => task.status == 'pending')
    const inProgressTask = storedTask.filter(task => task.status == 'in-progress')
    const completeTask = storedTask.filter(task => task.status == 'completed')

    return (
        <div className='mt-20'>
            <div className='border-2 p-2'>
                <h1>User: <span className='text-orange-400'> {user?.email}</span></h1>
                <img className='rounded-full h-52 w-52' src={user?.photoURL} alt="" />
                <h1>BIO: <span  className='text-orange-400'> {user?.displayName}</span> </h1>
            </div>
            <p className='border-2 p-2 text-2xl font-bold my-5 shadow-md shadow-white'>Total Task: {storedTask.length}</p>
            <p className='border-2 p-2 text-2xl font-bold shadow-md shadow-white'>Total Team: {storedTeam.length}</p>
            <p className='border-2 p-2 text-2xl font-bold my-5 shadow-md shadow-white'>Pending Task: {pendingTask.length}</p>
            <p className='border-2 p-2 text-2xl font-bold shadow-md shadow-white'>Task In Progress: {inProgressTask.length}</p>
            <p className='border-2 p-2 text-2xl font-bold my-5 shadow-md shadow-white'>Completed Task: {completeTask.length}</p>
        </div>
    );
};

export default Dashborad;