import React, { useState, useEffect } from 'react';
import Login from './Login/Login';
import Header from './Header/Header';
import UserPage from './UserPage/UserPage';
import { userLogout, continueSession } from './hooks/Authentication';
import { Container } from 'react-bootstrap';
import './App.css';
function App() {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(false);

    const onUserLogin = user => {
        setUser(user);
    };

    const onUserLogout = () => {
        userLogout(() => {
            setUser(null);
            setSession(false);
        });
    };

    useEffect(() => {
        checkExistingToken();
    });
    const checkExistingToken = async () => {
        try {
            if (
                localStorage['authorization'] &&
                localStorage['authorization'] !== 'undefined' &&
                !session
            ) {
                const user = await continueSession(
                    `Bearer ${localStorage['authorization']}`
                );
                setUser(user);
                setSession(true);
                return user;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='App'>
            <Header user={user} onUserLogout={onUserLogout} />
            <Container
                fluid='true'
                className='justify-content-center text-center'
            >
                {!user ? (
                    <Login onUserLogin={onUserLogin} />
                ) : (
                    <UserPage loggedUser={user} />
                )}
            </Container>
        </div>
    );
}

export default App;
