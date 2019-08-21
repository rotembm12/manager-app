import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './Signup.css';

const Signup = ({ afterSignup, setShowSignup, setShowErrorModal }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const createUser = async user => {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        try {
            const userData = await response.json();
            return userData; //return { user: {}, token: <token data> } or null
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            setShowErrorModal(true);
            return;
        }

        const user = {
            name,
            email,
            password,
            birthDate
        };

        const createdUser = await createUser(user);
        if (!createdUser) {
            return console.error('Couldnt create the user');
        }
        afterSignup(email);
        clearFields();
    };

    const clearFields = () => {
        setName('');
        setPassword('');
        setEmail('');
        setBirthDate('');
    };

    return (
        <Row>
            <Col xs lg={{ span: 4, offest: 4 }} className='signup-form'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor='name'>Name: </Form.Label>
                        <Form.Control
                            type='text'
                            id='name'
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='email'>Email: </Form.Label>
                        <Form.Control
                            type='email'
                            id='email'
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                        />
                        <Form.Text className='text-muted'>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='password'>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            id='password'
                            onChange={event => setPassword(event.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='birthDate'>Birth Date:</Form.Label>
                        <Form.Control
                            type='date'
                            id='birthDate'
                            onChange={event => setBirthDate(event.target.value)}
                            value={birthDate}
                        />
                    </Form.Group>
                    <Button
                        className='m-1'
                        variant='success'
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Button
                        className='m-1'
                        variant='warning'
                        onClick={() => setShowSignup(false)}
                    >
                        Back to login
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default Signup;
