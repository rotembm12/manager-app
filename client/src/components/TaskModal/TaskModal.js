import React from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
const TaskModal = ({
    modalTitle,
    visible,
    onCloseModal,
    title,
    handleTitleChange,
    description,
    handleDescriptionChange,
    wrapTask
}) => {
    return (
        <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={visible}
        >
            <Modal.Header closeButton onClick={onCloseModal}>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    className='mt-2'
                    as='input'
                    placeholder='title'
                    value={title}
                    onChange={handleTitleChange}
                />
                <Form.Label className='mt-4'>Description</Form.Label>
                <Form.Control
                    className='mt-2'
                    as='textarea'
                    rows='3'
                    placeholder='description'
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <Button
                    onClick={wrapTask}
                    variant='success'
                    className='mr-4 mt-2'
                >
                    Done
                </Button>
                <Button
                    onClick={onCloseModal}
                    variant='danger'
                    className='mt-2'
                >
                    Close
                </Button>
            </Modal.Body>
        </Modal>
    );
};
export default TaskModal;
