import React from 'react';
import TaskTable from './TaskTable';

const TaskList = ({ setStatusFilter, handleSortingChange, filteredTasks }) => {
    return (
        <div className='my-10 border-2 p-5'>
            <h2 className='text-center font-bold text-3xl text-orange-400 my-5'>Task List</h2>
            <div className='flex justify-center items-center gap-8 my-5 '>
                <div className='border-2 rounded p-2'>
                    <label>Status Filter:</label>
                    <select className='bg-indigo-950 text-white' onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="in progress">In Progress</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div className='border-2 rounded p-2'>
                    <select className='bg-indigo-950 text-white' onChange={(e) => handleSortingChange(e.target.value)}>
                        <option value="priority">Priority</option>
                        <option value="dueDate">Due Date</option>
                    </select>
                </div>
            </div>
            <ul>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='font-bold text-xl text-white'>
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

                                filteredTasks.map((task, index) => (
                                    <TaskTable key={index} task={task} index={index}></TaskTable>
                                ))

                            }

                        </tbody>
                    </table>
                </div>

            </ul>
        </div>
    );
};

export default TaskList;