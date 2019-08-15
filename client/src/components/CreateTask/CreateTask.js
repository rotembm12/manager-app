import React, { useState } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';

const CreateTask = ({
    createNewTask,
    showCreateTasksModal,
    setShowCreateTasksModal
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = event => setTitle(event.target.value);

    const handleDescriptionChange = event => setDescription(event.target.value);

    const wrapTask = async () => {
        if (title === '' || description === '') {
            return alert('please fill all fields');
        }
        const task = {
            title,
            description
        };
        await createNewTask(task); //From UserTasks component.
        onCloseModal();
    };

    const onCloseModal = () => {
        setShowCreateTasksModal(false);
        setTitle('');
        setDescription('');
    };

    return (
        <>
            <TaskModal
                modalTitle='Create new task'
                visible={showCreateTasksModal}
                onCloseModal={onCloseModal}
                title={title}
                handleTitleChange={handleTitleChange}
                description={description}
                handleDescriptionChange={handleDescriptionChange}
                wrapTask={wrapTask}
            />
        </>
    );
};
export default CreateTask;
