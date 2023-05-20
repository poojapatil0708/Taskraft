import { useDispatch, useSelector } from 'react-redux'
import Input from './input';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { removeUser } from '../redux/user-reducer';

const ShowTask = ({ task, onDelete, editTask }) => {

    const { token } = useSelector(state => state.user);

    const deleteTask = () => {
        const APIURL = 'http://localhost:8000';
        axios({ method: 'delete', url: `${APIURL}/task/${task._id}`, headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                onDelete()
                toast.success('Taks Deleted!')
            })
            .catch(err => toast.error(err.response?.data?.message || 'Error deleting task'))
    }

    return (
        <div className='card d-flex flex-row mb-2 mt-2 col-sm-12 col-md-6 p-2 justify-content-between' >
            <div className='d-flex flex-column'>
                <span>{task.title}</span>
                <span>{task.description}</span>
            </div>
            <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} >
                <div className='m-3'>
                    <svg onClick={editTask} xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </div>
                <div>
                    <svg onClick={deleteTask} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

const Modal = ({ isVisible, setIsModalVisible, setTasks, task, taskToEdit }) => {

    const { user, token } = useSelector(state => state.user);

    const initialValues = {
        user: user._id,
        title: taskToEdit ? taskToEdit.title : '',
        description: taskToEdit ? taskToEdit.description : '',
        status: taskToEdit ? taskToEdit.status : 'pending'
    }

    const validationSchema = () => Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        description: Yup.string().required('description is Required'),
    })

    const onSubmit = (values) => {
        const APIURL = 'http://localhost:8000';
        if (taskToEdit) {
            axios({ method: 'put', url: `${APIURL}/task/${values._id}`, data: values, headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    toast.success('Task Updated')
                })
                .catch(err => toast.error(err.response?.data?.message || 'Error updating task'))
        } else {
            axios({ method: 'POST', url: `${APIURL}/task`, data: values, headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setTasks([...task, response.data]);
                    setIsModalVisible(false)
                    toast.success('Task added')
                })
                .catch(err => toast.error('Error adding task'))
        }

    }

    if (isVisible) {
        return (
            <div className='position-absolute d-flex w-100 h-100 justify-content-center align-items-center' style={{ zIndex: '2', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ values, setFieldValue, handleSubmit, errors }) => {
                        return (
                            <div className='d-flex align-items-center justify-content-center flex-column bg-white p-5 rounded shadow'>
                                <div className='d-flex justify-content-end w-100'>
                                    <svg onClick={() => setIsModalVisible(false)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </div>
                                <h3>{taskToEdit ? 'Edit Task' : 'Add Task'}</h3>
                                <Input type='text' placeholder='Title' onChange={(e) => setFieldValue('title', e)} value={values.title} error={errors.title} />
                                <Input type='text' placeholder='description' onChange={(e) => setFieldValue('description', e)} value={values.description} error={errors.description} />
                                <button className="btn btn-primary" onClick={handleSubmit} type='submit'>Create</button>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        );
    }
}

const Home = () => {

    const { token } = useSelector(state => state.user);
    const [task, setTasks] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const APIURL = 'http://localhost:8000';
        axios({ method: 'GET', url: `${APIURL}/tasks`, headers: { Authorization: `Bearer ${token}` } })
            .then(response => setTasks(response.data))
            .catch(err => toast.error('Error to get task'))
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Modal taskToEdit={taskToEdit} isVisible={isModalVisible} setTasks={setTasks} task={task} setIsModalVisible={setIsModalVisible} />
            <div style={{ position: 'absolute', right: 20, top: 20 }}>
                <svg onClick={() => dispatch(removeUser())} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1h-1z" />
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                </svg>
            </div>
            <div className='d-flex flex-column align-items-center mt-4 '>
                <h3>Your Tasks</h3>
                {task.map((item, index) => <ShowTask editTask={() => {
                    setIsModalVisible(true);
                    setTaskToEdit(item);
                }} task={item} onDelete={() => setTasks(task.filter((innrItem, innrIndex) => innrIndex !== index))} />)}
            </div>
            <div style={{ position: 'absolute', right: 20, bottom: 20 }} onClick={() => { setIsModalVisible(!isModalVisible); setTaskToEdit(null) }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
            </div>
        </div>

    );
}

export default Home;