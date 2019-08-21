import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Navbar, Nav, Form } from 'react-bootstrap';
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

    const [filename, setFilename] = useState('Choose avatar image');
    const [file, setFile] = useState();
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
                const res = await response.json();

                if (res.error) {
                    throw new Error();
                }
                console.log(res);
                const src = `data:image/png;base64, ${res.avatar}`;
                setAvatar(src);
                setShouldRender(false);
                return;
            }
        } catch (err) {
            setAvatar('https://static.thenounproject.com/png/770826-200.png');
            setShouldRender(false);
            return console.log('avatar not found');
        }
    };

    const deleteAvatar = async () => {
        const response = await fetch('/api/users/me/avatar', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage['authorization']}`
            }
        });
        console.log(response);
        const res = await response.json();
        if (res.error) {
            return console.log(res);
        }
        if (res.message) {
            console.log('avatar deleted');
            setAvatar('https://static.thenounproject.com/png/770826-200.png');
            setFilename('choose avatar');
        }
    };

    useEffect(() => {
        getAvatar();
    });

    return (
        <Row className='justify-content-center user-intro-wrapper'>
            <Col xs lg={{ span: 11 }} className=' user-intro '>
                <Card>
                    <Row className='d-flex justify-content-end user-intro-bg'>
                        <Col xs={{ span: 4 }} style={{ height: '100%' }}>
                            <Card.Img
                                variant='top'
                                src={avatar}
                                style={{ margin: 'auto auto' }}
                            />
                            <Form id='file-form'>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type='file'
                                            onChange={onChange}
                                            className='custom-file-form'
                                            id='customFile'
                                            style={{ height: '30px' }}
                                        />
                                        <Form.Label
                                            className='custom-file-label'
                                            htmlFor='customFile'
                                        >
                                            {filename}
                                        </Form.Label>
                                    </Col>
                                    {file ? (
                                        <Col xs={{ span: 5 }}>
                                            <Form.Control
                                                type='submit'
                                                value='Upload'
                                                className='btn btn-success btn-block mb-2 text-center'
                                                onClick={onSubmit}
                                            />
                                        </Col>
                                    ) : (
                                        ''
                                    )}
                                </Row>
                            </Form>
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
                                <Nav.Link onClick={deleteAvatar}>
                                    Delete avatar
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
