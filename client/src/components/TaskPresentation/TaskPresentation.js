import React, { useState } from 'react';
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import './TaskPresentation.css';
const TaskPresentation = ({
    visible,
    onCloseModal,
    openConfModal,
    title,
    description,
    createdAt,
    editTask
}) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);

    const openEditMode = () => {
        setEditMode(true);
    };

    const closeEditMode = () => {
        setEditMode(false);
    };

    const handleTitleChange = event => {
        setNewTitle(event.target.value);
    };

    const handleDescriptionChange = event => {
        setNewDescription(event.target.value);
    };

    const beforeEditTask = () => {
        const updatedTask = {
            title: newTitle,
            description: newDescription
        };
        editTask(updatedTask);
        closeEditMode();
    };

    const stopEdit = () => {
        setNewDescription(description);
        setNewTitle(title);
        setEditMode(false);
    };

    return (
        <Modal
            size='xl'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={visible}
            className='presentation-modal'
        >
            <Modal.Header className='text-center justify-content-center'>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {editMode ? (
                        <Form.Control
                            className='mt-2'
                            as='input'
                            placeholder='title'
                            value={newTitle}
                            onChange={handleTitleChange}
                        />
                    ) : (
                        title
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <Row style={{ minHeight: '50vh' }}>
                    <Col xs={{ span: 3 }}>
                        <h4 className='text-left'>description:</h4>
                    </Col>
                    <Col xs className='text-left'>
                        {editMode ? (
                            <Form.Control
                                className='mt-2'
                                as='textarea'
                                rows='3'
                                placeholder='description'
                                value={newDescription}
                                onChange={handleDescriptionChange}
                            />
                        ) : (
                            <p>{description}</p>
                        )}
                    </Col>
                </Row>
                <Row>
                    <span>Created At: {createdAt}</span>
                </Row>
            </Modal.Body>
            <Modal.Footer className='text-muted d-flex justify-content-end'>
                {editMode ? (
                    <>
                        <Button
                            className='mr-2'
                            variant='danger'
                            onClick={stopEdit}
                        >
                            Stop Edit
                        </Button>
                        <Button
                            className='mr-2'
                            variant='info'
                            onClick={beforeEditTask}
                        >
                            Confirm change
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            className='mr-2'
                            variant='dark'
                            onClick={onCloseModal}
                        >
                            Close
                        </Button>
                        <Button
                            className='mr-2'
                            variant='info'
                            onClick={openEditMode}
                        >
                            Edit Task
                        </Button>
                        <Button
                            className='mr-2'
                            variant='danger'
                            onClick={openConfModal}
                        >
                            Delete Task
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    );
};
export default TaskPresentation;
