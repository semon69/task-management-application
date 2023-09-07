import React from 'react';
import TaskTable from './TaskTable';

const TaskList = ({ setStatusFilter, handleSortingChange, filteredTasks }) => {
    return (
        <div>
            <h2>Task List</h2>
            <div>
                <label>Status Filter:</label>
                <select onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
            <div>
                <select onChange={(e) => handleSortingChange(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                </select>
            </div>
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