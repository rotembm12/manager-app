import React, { useState } from 'react';
import Signup from '../Signup/Signup';
import { userLogin, setAuthorizationToken } from '../hooks/Authentication';
import { Row, Col, Button, Form, Modal } from 'react-bootstrap';
import './Login.css';

const Login = ({ onUserLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleClose = () => setShowErrorModal(false);

    const showSignupComponent = event => {
        event.preventDefault();
        setShowSignup(true);
    };

    const afterSignup = email => {
        setShowSignup(false);
        setEmail(email);
    };

    const handleLoginSubmit = async event => {
        event.preventDefault();
        if (email === '' || password === '') {
            setErrorMessage('Please fill all fields');
            setShowErrorModal(true);
            return;
        }

        try {
            const { token, user } = await userLogin(email, password); //return user and token
            setAuthorizationToken(token); //insert token to localstorage
            const name = user.name;
            onUserLogin({ email, password, name }); //from app component -> starts the session
        } catch (e) {
            setErrorMessage('Couldnt login to user');
            setPassword('');
            setShowErrorModal(true);
            console.error(`Error from handleLoginSubmit: ${e}`);
        }
    };

    return (
        <div className='Login'>
            {!showSignup ? (
                <Row>
                    <Col xs lg={{ span: 4, offest: 4 }} className='login-form'>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    value={email}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    value={password}
                                />
                            </Form.Group>
                            <Button
                                className='m-1'
                                variant='primary'
                                type='submit'
                                onClick={handleLoginSubmit}
                            >
                                Login
                            </Button>
                            <Button
                                className='m-1'
                                variant='secondary'
                                type='submit'
                                onClick={showSignupComponent}
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <Signup
                    afterSignup={afterSignup}
                    setShowSignup={setShowSignup}
                    setShowErrorModal={setShowErrorModal}
                />
            )}

            <Modal show={showErrorModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Something went wrong...</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default Login;
