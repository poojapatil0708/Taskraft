import axios from "axios";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import Input from "../components/input";
import { BackIcon } from "../components/icons";
import constants from "../constants";

const CreateUpdateTask = () => {

    const { user, token } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { state } = useLocation();

    const initialValues = {
        user: user._id,
        title: state ? state.title : '',
        description: state ? state.description : '',
        status: state ? state.status : 'pending'
    }

    const validationSchema = () => Yup.object().shape({
        title: Yup.string().required('Title is Required'),
        description: Yup.string().required('description is Required'),
    })

    const onSubmit = (values) => {
        const APIURL = constants.base_url_production;
        if (state) {
            axios({ method: 'put', url: `${APIURL}/task/${state._id}`, data: values, headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    navigate(-1)
                    toast.success('Task Updated')
                })
                .catch(err => toast.error(err.response?.data?.message || 'Error updating task'))
        } else {
            axios({ method: 'POST', url: `${APIURL}/task`, data: values, headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    navigate(-1)
                    toast.success('Task added')
                })
                .catch(err => toast.error('Error adding task'))
        }
    }

    return (
        <div className='position-absolute d-flex w-100 h-100 justify-content-center align-items-center'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ values, setFieldValue, handleSubmit, errors }) => {
                    return (
                        <div className='d-flex flex-column bg-white p-5 rounded shadow'>
                            <div className="d-flex align-items-center">
                                <BackIcon onClick={() => navigate(-1)} />
                                <h3 className="px-3">{state ? 'Edit Task' : 'Add Task'}</h3>
                            </div>
                            <Input type='text' placeholder='Title' onChange={(e) => setFieldValue('title', e)} value={values.title} error={errors.title} />
                            <Input type='text' placeholder='description' onChange={(e) => setFieldValue('description', e)} value={values.description} error={errors.description} />
                            <button className="btn btn-primary" onClick={handleSubmit} type='submit'>{state ? 'Update' : 'Create'}</button>
                        </div>
                    )
                }}
            </Formik>
        </div>
    );
}

export default CreateUpdateTask;