import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import TaskPresentation from '../TaskPresentation/TaskPresentation';
import './Task.css';
import { create } from 'domain';

const Task = ({ task, afterDeletingTask, updateTaskLocally }) => {
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

    const editTask = task => {
        if (task.title === title && task.description === description) {
            return console.log('values aint changed');
        }
        createOrEditTask(task);
    };

    const createOrEditTask = async task => {
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
                setTitle(task.title);
                setDescription(task.description);
                updateTaskLocally(task);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const wrapTask = () => {
        if (title === '' || description === '') {
            return alert('please fill all fields');
        }
        const task = {
            title,
            description
        };
        createOrEditTask(task);
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
            <div className='card task-cards'>
                <div className='card-body elegant-color white-text rounded-bottom'>
                    <a href='' className='activator waves-effect mr-4'>
                        <i className='fas fa-share-alt white-text' />
                    </a>
                    <h4 className='card-title'>{title}</h4>
                    <hr className='hr-light' />
                    <p className='card-text white-text mb-4'>{description}</p>
                    <a
                        href='#!'
                        className='white-text d-flex justify-content-end mr-4'
                        onClick={toggleTaskPreview}
                    >
                        <h5>Read more...</h5>
                    </a>
                </div>
            </div>

            <TaskPresentation
                visible={taskPreview}
                title={title}
                description={description}
                createdAt={createdAt}
                onCloseModal={toggleTaskPreview}
                openConfModal={openConfModal}
                editTask={editTask}
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
