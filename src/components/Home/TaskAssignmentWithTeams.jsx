import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import TaskTable from './TaskTable';
import TeamTable from './TeamTable';

const TaskAssignmentWithTeams = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const users = [
    { id: 'user1', name: 'Alice' },
    { id: 'user2', name: 'Bob' },
    { id: 'user3', name: 'Charlie' },
    { id: 'user4', name: 'Abul' },
    { id: 'user5', name: 'Kabir' },
  ];

  const [selectedMembers, setSelectedMembers] = useState([]);
  const stored = JSON.parse(localStorage.getItem('teams')) || [];
  const [teams, setTeams] = useState(stored);
  const [newTeams, setNewteams] = useState({
    team: '',
    title: '',
    description: '',
    member: [selectedMembers],
    dueDate: '',
    priority: 'low',
    status: 'pending',
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('teams')) || [];
    console.log('data', storedTasks);
    setTeams(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewteams({
      ...newTeams,
      [name]: value,
    });
  };

  const toggleMemberSelection = (memberId) => {
    // Toggle member selection
    setSelectedMembers((prevSelectedMembers) => {
      if (prevSelectedMembers.includes(memberId)) {
        return prevSelectedMembers.filter((id) => id !== memberId);
      }
      return [...prevSelectedMembers, memberId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire('Please Login First')
      navigate('/login')
    } else {
      if (!newTeams.title || !newTeams.description || !newTeams.dueDate) {
        Swal.fire('Please fill in all required fields')
        return;
      }

      setTeams([...teams, newTeams]);
      setNewteams({
        team: '',
        title: '',
        description: '',
        member: [selectedMembers],
        dueDate: '',
        priority: 'low',
        status: 'pending',
      });
    }
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-center text-3xl font-bold text-orange-400 mt-12 mb-6'>Create Team</h1>
      <form className='border  shadow-xl p-10 rounded space-y-5'>
        <div className='flex items-center'>
          <label className='font-bold pr-5'>Team Name</label>
          <input
            className="input input-bordered w-full text-black"
            placeholder='team'
            type="text"
            name="team"
            value={newTeams.team}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center'>
          <label className='font-bold pr-5'>Title:</label>
          <input
            className="input input-bordered w-full text-black"
            placeholder='title'
            type="text"
            name="title"
            value={newTeams.title}
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center'>
          <label className='font-bold pr-5'>Description:</label>
          <textarea
            className='textarea textarea-bordered text-black w-full'
            placeholder='description'
            name="description"
            value={newTeams.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <h3>Select Team Members</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <label>
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={selectedMembers.includes(user.id)}
                    onChange={() => toggleMemberSelection(user.id)}
                  />
                  {user.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex justify-evenly items-center'>
          <div>
            <label className='font-bold pr-5'>Due Date:</label>
            <input
              className='bg-indigo-950 text-white border-2 p-2 rounded'
              type="date"
              name="dueDate"
              value={newTeams.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='font-bold pr-5'>Priority:</label>
            <select
              className='bg-indigo-950 text-white border-2 p-2 rounded'
              name="priority"
              value={newTeams.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button onClick={handleSubmit} className='btn bg-orange-400 font-bold text-white' type="submit">Create Team</button>
      </form>
      <div className='border-2 p-5 mt-10'>
        <h1 className='text-center text-3xl font-bold text-orange-400'>Team List</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className='font-bold text-xl text-white'>
                <th></th>
                <th>Team</th>
                <th>Task</th>
                <th>Description</th>
                <th>Members</th>
                <th>Due Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {

                teams.map((task, index) => (
                  <TeamTable key={index} task={task} index={index}></TeamTable>
                ))

              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignmentWithTeams;