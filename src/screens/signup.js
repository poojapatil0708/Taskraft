import axios from "axios";
import Input from "../components/input";
import { Formik } from "formik"
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { toast } from "react-toastify";
import constants from "../constants";

const SignUp = () => {

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
        const APIURL = constants.base_url_production;
        axios({ method:'POST', url: `${APIURL}/signup`, data:values })
        .then(response => {
            toast.success('Account created')
        })
        .catch(err=> {
            toast.error(err.response?.data?.message || 'Something went wrong')
        })
    }

    const validationSchema = () => Yup.object().shape({
        first_name: Yup.string().required("Please enter your first name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        last_name: Yup.string().required("Please enter your last name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        email: Yup.string().email('Email is invalid').required('Please enter your email'),
        password: Yup.string().required('Please enter password')
    })

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ touched, values, setFieldTouched, setFieldValue, handleSubmit, errors, isValid, dirty }) => {
                    return (
                        <div className="card p-4 col-md-5 col-11">
                            <h2 className="text-center"><b>SignUp</b></h2>
                            <Input error={touched.first_name && errors.first_name ? errors.first_name : null} id='first_name' name='first_name' type='text' placeholder='Enter First name' label='First Name :' onChange={(val) => { setFieldValue('first_name', val); setFieldTouched('first_name') }} vallue={values.first_name} />
                            <Input error={touched.last_name && errors.last_name ? errors.last_name : null} id='last_name' name='last_name' type='text' placeholder='Enter Last name' label='Last Name :' onChange={(val) => { setFieldValue('last_name', val); setFieldTouched('last_name') }} value={values.last_name} />
                            <Input error={touched.email && errors.email ? errors.email : null} id='email' name='email' type='email' placeholder='Enter Email Id' label='Email Id :' onChange={(val) => { setFieldValue('email', val); setFieldTouched('email') }} value={values.email} />
                            <Input error={touched.password && errors.password ? errors.password : null} id='password' name='password' type='password' placeholder='Enter Password' label='Password :' onChange={(val) => { setFieldValue('password', val); setFieldTouched('password') }} value={values.password} />
                            <button disabled={!(isValid && dirty)} onClick={handleSubmit} className="btn btn-primary" type="submit">SignUp</button>
                </div>
                    );
                }}
            </Formik>
            <div className="d-flex mt-2 align-items-center">
                <div className="mx-1">Already have an account? </div>
                <Link className="text-primary" style={{ textDecoration: 'none' }} to='/login'>Login</Link>
            </div>
        </div>
    );
}

export default SignUp;