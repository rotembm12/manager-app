import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import './Task.css';

const Task = ({ task, afterDeletingTask }) => {
    const { completed, createdAt, _id } = task; //also have title and description

    //State hooks
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [showEditModal, setShowEditModal] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [taskPreview, setTaskPreview] = useState(false);
    const [showConfModal, setShowConfModal] = useState(false);
    //state change effects
    useEffect(() => {
        if (isEdited === true) {
            onCloseModal();
            setIsEdited(false);
        }
    });
    //Handlers
    const handleTitleChange = event => setTitle(event.target.value);

    const handleDescriptionChange = event => setDescription(event.target.value);

    const openConfModal = () => {
        setShowConfModal(true);
    };

    const onCloseConfModal = () => {
        setShowConfModal(false);
    };

    const openEditModal = () => {
        setShowEditModal(true);
    };

    const toggleTaskPreview = () => {
        setTaskPreview(!taskPreview);
    };

    const onCloseModal = () => {
        setShowEditModal(false);
        if (isEdited === false) {
            setTitle(task.title);
            setDescription(task.description);
        }
    };

    const editTask = async task => {
        if (localStorage['authorization'] && task) {
            const token = `Bearer ${localStorage['authorization']}`;
            try {
                await fetch(`/api/tasks/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                        authorization: token
                    },
                    body: JSON.stringify(task)
                });
                setIsEdited(true);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const wrapTask = async () => {
        if (title === '' || description === '') {
            return alert('please fill all fields');
        }
        const task = {
            title,
            description
        };
        await editTask(task);
    };

    const deleteTask = async () => {
        try {
            const response = await fetch(`/api/tasks/${_id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage['authorization']}`
                }
            });
            const deletedTask = await response.json();
            afterDeletingTask(deletedTask);
        } catch (e) {
            console.log('operation failed', e);
        }
    };

    return (
        <>
            {!taskPreview ? (
                <>
                    <div className='card'>
                        <div className='view overlay'>
                            <img
                                src='https://mdbootstrap.com/img/Photos/Horizontal/Work/4-col/img%20%2821%29.jpg'
                                alt='some pic'
                                className='card-img-top'
                            />
                            <a>
                                <div className='mask rgba-white-slight' />
                            </a>
                        </div>
                        <div className='card-body elegant-color white-text rounded-bottom'>
                            <a href='' className='activator waves-effect mr-4'>
                                <i className='fas fa-share-alt white-text' />
                            </a>
                            <h4 className='card-title'>{title}</h4>
                            <hr className='hr-light' />
                            <p className='card-text white-text mb-4'>
                                {description}
                            </p>
                            <a
                                href='#!'
                                className='white-text d-flex justify-content-end mr-4'
                                onClick={toggleTaskPreview}
                            >
                                <h5>
                                    Read more
                                    <i className='fas fa-angle-double-right' />
                                </h5>
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <Card className='m-3'>
                    <Card.Header className='d-flex justify-content-between'>
                        <Card.Title>
                            <span>Title: {title}</span>
                        </Card.Title>
                        <span>
                            <p>Created At: {createdAt}</p>
                        </span>
                    </Card.Header>
                    <Card.Body>
                        <h6 className='text-center'>Description</h6>
                        <Card.Text>{description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className='text-muted d-flex justify-content-end'>
                        <Button
                            className='mr-2'
                            variant='dark'
                            onClick={toggleTaskPreview}
                        >
                            Hide task
                        </Button>
                        <Button
                            className='mr-2'
                            variant='info'
                            onClick={openEditModal}
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
                    </Card.Footer>
                </Card>
            )}

            <TaskModal
                modalTitle='Edit task'
                visible={showEditModal}
                onCloseModal={onCloseModal}
                title={title}
                handleTitleChange={handleTitleChange}
                description={description}
                handleDescriptionChange={handleDescriptionChange}
                wrapTask={wrapTask}
            />
            <ConfirmationModal
                modalTitle='Delete Task'
                visible={showConfModal}
                onCloseConfModal={onCloseConfModal}
                deleteTask={deleteTask}
            />
        </>
    );
};
export default Task;
