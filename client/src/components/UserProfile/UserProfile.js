import React from 'react';
import { Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const UserProfile = ({ user }) => {
    const { email, birthDate, createdAt, about } = user;
    return (
        <>
            <Row>
                <Col xs lg={{ span: 10, offset: 1 }} className='user-profile'>
                    <Card>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item variant='light'>
                                    email: {email}
                                </ListGroup.Item>
                                <ListGroup.Item variant='light'>
                                    Birth Date: {birthDate}
                                </ListGroup.Item>
                                <ListGroup.Item variant='light'>
                                    About: {about}
                                </ListGroup.Item>
                                <ListGroup.Item variant='light'>
                                    Created At: {createdAt}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default UserProfile;
