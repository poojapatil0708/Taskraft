import { useSelector } from 'react-redux'
import Input from './input';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const ShowTask = ({ task }) => {
    return (
        <div className='card d-flex flex-row mb-2 mt-2 col-sm-12 col-md-6 p-2' >
            <div className='d-flex flex-column'>
                <span>{task.title}</span>
                <span>{task.description}</span>
            </div>
            <div className='d-flex align-items-center justify-content-end'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
        </div>
    );
}

const Home = () => {

    const { user, token } = useSelector(state => state.user);
    const [task, setTasks] = useState([])

    useEffect(() => {
        const APIURL = 'http://localhost:8000';
        axios({ method: 'GET', url: `${APIURL}/tasks`, headers: { Authorization: `Bearer ${token}` } })
            .then(response => setTasks(response.data))
            .catch(err => toast.error('Error to get task'))
    }, [])

    const initialValues = {
        user: user._id,
        title: '',
        description: '',
        status: 'pending'
    }

    const validationSchema = () => Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        description: Yup.string().required('description is Required'),
    })

    const onSubmit = (values) => {
        const APIURL = 'http://localhost:8000';
        axios({ method: 'POST', url: `${APIURL}/task`, data: values, headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                setTasks([...task, response.data])
                toast.success('Task added')
            })
            .catch(err => toast.error('Error adding task'))
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, setFieldValue, handleSubmit, errors }) => {
                    return (
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <h3>Add Task</h3>
                            <Input type='text' placeholder='Title' onChange={(e) => setFieldValue('title', e)} value={values.title} error={errors.title} />
                            <Input type='text' placeholder='description' onChange={(e) => setFieldValue('description', e)} value={values.description} error={errors.description} />
                            <button className="btn btn-primary" onClick={handleSubmit} type='submit'>Create</button>
                        </div>
                    )
                }}
            </Formik>
            <div className='d-flex flex-column align-items-center'>
                {task.map((item) => <ShowTask task={item} />)}
            </div>
        </div>
    );
}

export default Home;