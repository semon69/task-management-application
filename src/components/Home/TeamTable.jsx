import React from 'react';

const TeamTable = ({index, task}) => {
    return (
        <tr key={index}>
            <th>{index + 1}</th>
            <td>{task.team}</td>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
                {
                    task?.member.map(mm => <span className='mr-2' key={mm}>{mm},</span>)
                }
            </td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
        </tr>
    );
};

export default TeamTable;