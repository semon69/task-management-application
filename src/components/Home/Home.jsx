import React from 'react';
import TaskApp from './TaskApp';
import TaskAssignmentWithTeams from './TaskAssignmentWithTeams';
import Dashborad from './Dashborad';

const Home = () => {

    return (
        <div className='mx-14'>
            <div className='flex gap-5'>
                <div className='w-1/4'>
                    <Dashborad></Dashborad>
                </div>
                <div className='w-3/4'>
                    <TaskApp></TaskApp>
                    <TaskAssignmentWithTeams></TaskAssignmentWithTeams>
                </div>
            </div>
        </div>
    );
};

export default Home;