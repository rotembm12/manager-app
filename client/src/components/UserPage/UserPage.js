import React, { useState } from 'react';
import UserProfile from '../UserProfile/UserProfile';
import UserIntro from '../UserIntro/UserIntro';
import UserTasks from '../UserTasks/UserTasks';
import './UserPage.css';

const UserPage = ({ loggedUser }) => {
    const [showProfile, setShowProfile] = useState(true);
    const [showUserTasks, setShowUserTasks] = useState(false);
    const [userAvatar, setUserAvatar] = useState('');
    const showProfileData = () => {
        setShowProfile(true);
        setShowUserTasks(false);
    };

    const showUserTasksData = () => {
        setShowUserTasks(true);
        setShowProfile(false);
    };

    return (
        <>
            <UserIntro
                user={loggedUser}
                showProfileData={showProfileData}
                showProfile={showProfile}
                showUserTasksData={showUserTasksData}
                showUserTasks={showUserTasks}
                setUserAvatar={setUserAvatar}
            />
            {showProfile ? <UserProfile user={loggedUser} /> : ''}
            {showUserTasks ? <UserTasks /> : ''}
        </>
    );
};
export default UserPage;
