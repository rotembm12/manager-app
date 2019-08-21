import React, { useState, useEffect } from 'react';
import Task from '../Task/Task';
import { Row, Col, Button } from 'react-bootstrap';
import CreateTask from '../CreateTask/CreateTask';

const UserTasks = () => {
    const [tasks, setTasks] = useState();
    const [showCreateTasksModal, setShowCreateTasksModal] = useState(false);

    const updateTaskLocally = updatedTask => {
        const updatedTasksList = tasks.map(task => {
            if (updatedTask._id === task._id) {
                task = updatedTask;
            }
            return task;
        });
        setTasks(updatedTasksList);
    };

    const readTasks = async () => {
        const token = `Bearer ${localStorage['authorization']}`;
        try {
            const response = await fetch('/api/tasks', {
                headers: {
                    authorization: token,
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            });
            const userTasks = await response.json();
            setTasks(userTasks);
        } catch (e) {
            console.error(e);
        }
    };

    const createNewTask = async task => {
        if (localStorage['authorization'] && task) {
            const token = `Bearer ${localStorage['authorization']}`;
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Accept: 'application/json',
                        authorization: token
                    },
                    body: JSON.stringify(task)
                });
                const newTask = await response.json();
                setTasks([...tasks, newTask]);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const afterDeletingTask = deletedTask => {
        const filteredTasks = tasks.filter(task => {
            return task._id !== deletedTask._id;
        });
        setTasks(filteredTasks);
    };

    const openCreateNewTaskModal = () => {
        setShowCreateTasksModal(true);
    };

    useEffect(() => {
        if (!tasks) {
            readTasks();
        }
    });

    return (
        <Row>
            <Col xs={{ span: 10, offset: 1 }}>
                <Row className='justify-content-center'>
                    <Button
                        variant='success'
                        className='btn purple-gradient'
                        onClick={openCreateNewTaskModal}
                    >
                        Create new Task
                    </Button>
                </Row>
                <CreateTask
                    createNewTask={createNewTask}
                    showCreateTasksModal={showCreateTasksModal}
                    setShowCreateTasksModal={setShowCreateTasksModal}
                />
            </Col>
            <Col xs lg={{ span: 10, offset: 1 }}>
                <Row>
                    {tasks
                        ? tasks.map(task => (
                              <Col
                                  xs={{ span: 10, offset: 1 }}
                                  lg={{ span: 3, offset: 0 }}
                              >
                                  <Task
                                      className='mt-4'
                                      key={task._id}
                                      task={task}
                                      afterDeletingTask={afterDeletingTask}
                                      updateTaskLocally={updateTaskLocally}
                                  />
                              </Col>
                          ))
                        : ''}
                </Row>
            </Col>
        </Row>
    );
};
export default UserTasks;
