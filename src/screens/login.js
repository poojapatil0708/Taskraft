import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Input from "../components/input";
import * as Yup from 'yup';
import axios from "axios";
import { Link } from "react-router-dom";
import { setUser } from "../redux/user-reducer";
import { toast } from "react-toastify";
import constants from "../constants";
import { useState } from "react";
import Loader from "../components/loader";
import { Helmet, HelmetData } from "react-helmet-async";

const helmetData = new HelmetData({});

const LogIn = () => {

    const initialValues = { email: '', password: '' }
    const [isLoading, setIsLoding] = useState(false)
    const dispatch = useDispatch();

    const validationSchema = () => Yup.object().shape({
        email: Yup.string().email('Invalid Email').required('Email is required'),
        password: Yup.string().required('password is required').min(4, 'Password should be min 4 characters').max(16, 'Password should be max 16 characters')
    })

    const onSubmit = (values) => {
        setIsLoding(true)
        axios({ method: 'POST', url: `${constants.base_url_production}/login`, data: values })
            .then(response => {
                setIsLoding(false);
                dispatch(setUser(response.data))
            })
            .catch(err => {
                setIsLoding(false);
                toast.error(err.response?.data?.message || 'Somthing went wrong')
            })
    }

    return (
        <div>
            <Helmet helmetData={helmetData}>
                <title>My Page Title</title>
                <meta name="description" content="This is a description of my page" />
                <meta name="keywords" content="react, meta tags, seo" />
                <meta name="author" content="Kapil Whaval" />
                <meta property="og:title" content="My Page Title" />
                <meta property="og:description" content="This is a description of my page" />
                <meta property="og:image" content="https://picsum.photos/200" />
                <meta property="og:url" content="https://example.com/my-page" />
                <meta name="twitter:title" content="My Page Title" />
                <meta name="twitter:description" content="This is a description of my page" />
                <meta name="twitter:image" content="https://picsum.photos/200" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
                {({ values, setFieldValue, handleSubmit, errors }) => {
                    return (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <div className="card shadow-lg border-0 p-4 col-md-5 col-11">
                                <h3>Login</h3>
                                    <Input type='text' placeholder='Enter Email Id' error={errors.email} onChange={(e) => setFieldValue('email', e)} value={values.email} />
                                    <Input error={errors.password} type='password' placeholder='Password' onChange={(e) => setFieldValue('password', e)} value={values.password} />
                                    {!isLoading ?
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
                                        :
                                        <Loader />}
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <div className="mx-1 text-dark">Dont have account?</div>
                                <Link className="text-primary" style={{ textDecoration: 'none' }} to='/signup'>Create account</Link>
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </div>
    );
}

export default LogIn;