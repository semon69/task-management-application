import React from 'react';

const TaskTable = ({task, index}) => {
    return (
        <tr key={index}>
            <th>{index + 1}</th>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>{task.assignedTo}</td>
            <td>{task.status}</td>
        </tr>
    );
};

export default TaskTable;