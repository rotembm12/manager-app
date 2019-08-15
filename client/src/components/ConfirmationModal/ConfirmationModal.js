import React from 'react';
import { Button, Modal } from 'react-bootstrap';
const ConfirmationModal = ({
    modalTitle,
    visible,
    onCloseConfModal,
    deleteTask
}) => {
    return (
        <Modal
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            show={visible}
        >
            <Modal.Header closeButton onClick={onCloseConfModal}>
                <Modal.Title id='contained-modal-title-vcenter'>
                    {modalTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>
                <p>Are you sure you want to delete the task?</p>
                <Button
                    onClick={deleteTask}
                    variant='outline-danger'
                    className='mr-4 mt-2'
                >
                    Yes
                </Button>
                <Button
                    onClick={onCloseConfModal}
                    variant='danger'
                    className='mt-2'
                >
                    No
                </Button>
            </Modal.Body>
        </Modal>
    );
};
export default ConfirmationModal;
