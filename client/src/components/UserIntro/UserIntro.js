import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Navbar, Nav, Form } from 'react-bootstrap';
import axios from 'axios';
import './UserIntro.css';
const UserIntro = props => {
    const {
        user,
        showProfile,
        showProfileData,
        showUserTasksData,
        showUserTasks,
        setUserAvatar
    } = props;

    const [filename, setFilename] = useState('Choose profile image');
    const [file, setFile] = useState();
    const [uploadedFile, setUploadedFile] = useState({});
    const [avatar, setAvatar] = useState('');
    const [shouldRender, setShouldRender] = useState(true);
    const onChange = event => {
        try {
            setFile(event.target.files[0]);
            setFilename(event.target.files[0].name);
            console.log('changed input file');
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file);
        try {
            await fetch('/api/users/me/avatar', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage['authorization']}`
                },
                body: formData
            });
            setShouldRender(true);
            setFile();
        } catch (err) {
            console.log(err);
        }
    };

    const getAvatar = async () => {
        try {
            if (shouldRender) {
                const response = await fetch(
                    `/api/users/${user._id}/avatar/${Date.now()}`
                );
                if (response.status !== 404) {
                    setAvatar(response.url);
                    setShouldRender(false);
                    setUploadedFile(
                        `The profile pic has been changed to ${filename}`
                    );
                    return;
                } else {
                    return setAvatar(
                        'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiyuKru3f3jAhXOaVAKHW6TBZEQjRx6BAgBEAQ&url=https%3A%2F%2Fthenounproject.com%2Fterm%2Funknown%2F770826%2F&psig=AOvVaw1FGDvOs3lJHd9mB_5AjF1M&ust=1565713071009105'
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAvatar();
    });

    return (
        <Row className='justify-content-center'>
            <Col xs lg={{ span: 11 }} className=' user-intro '>
                <Card>
                    <Form id='file-form'>
                        <Row>
                            <Col>
                                <Form.Control
                                    type='file'
                                    onChange={onChange}
                                    className='custom-file-form'
                                    id='customFile'
                                />
                                <Form.Label
                                    className='custom-file-label'
                                    htmlFor='customFile'
                                >
                                    {filename}
                                </Form.Label>
                            </Col>
                            {file ? (
                                <Col xs={{ span: 3 }}>
                                    <Form.Control
                                        type='submit'
                                        value='Upload image'
                                        className='btn btn-success btn-block mb-2'
                                        onClick={onSubmit}
                                    />
                                </Col>
                            ) : (
                                ''
                            )}
                        </Row>
                    </Form>
                    <Row className='d-flex justify-content-end'>
                        <Col
                            xs={{ span: 4 }}
                            className='d-flex align-items-end'
                        >
                            <Card.Img variant='top' src={avatar} />
                        </Col>
                    </Row>

                    <Card.Body>
                        <Navbar bg='dark' variant='dark'>
                            <Navbar.Brand>{user.name}</Navbar.Brand>
                            <Nav className='mr-auto'>
                                <Nav.Link
                                    onClick={showProfileData}
                                    active={showProfile}
                                >
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    onClick={showUserTasksData}
                                    active={showUserTasks}
                                >
                                    Tasks
                                </Nav.Link>
                                <Nav.Link>Friends</Nav.Link>
                            </Nav>
                        </Navbar>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};
export default UserIntro;
