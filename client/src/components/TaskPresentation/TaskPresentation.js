import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import './TaskPresentation.css';
const TaskPresentation = ({
    visible,
    onCloseModal,
    openEditModal,
    openConfModal,
    title,
    description,
    createdAt
}) => {
    return (
        <Modal
            size='xl'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={visible}
        >
            <Modal.Header closeButton onClick={onCloseModal}>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <Row style={{ minHeight: '50vh' }}>
                    <Col xs={{ span: 3 }}>
                        <h4 className='text-left'>description:</h4>
                    </Col>
                    <Col xs className='text-left'>
                        <p>{description}</p>
                    </Col>
                </Row>
                <Row>
                    <span>Created At: {createdAt}</span>
                </Row>
            </Modal.Body>
            <Modal.Footer className='text-muted d-flex justify-content-end'>
                <Button className='mr-2' variant='dark' onClick={onCloseModal}>
                    Close
                </Button>
                <Button className='mr-2' variant='info' onClick={openEditModal}>
                    Edit Task
                </Button>
                <Button
                    className='mr-2'
                    variant='danger'
                    onClick={openConfModal}
                >
                    Delete Task
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default TaskPresentation;
