import Input from "./input";
import { Formik } from "formik"
import * as Yup from 'yup'

const SignUp = () => {


    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    const validationSchema = () => Yup.object().shape({
        first_name: Yup.string().required("Please enter your first name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        last_name: Yup.string().required("Please enter your last name").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
        email: Yup.string().email('Email is invalid').required('Please enter your email'),
        password: Yup.string().required('Please enter password')
    })

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ touched, values, setFieldTouched, setFieldValue, handleSubmit, errors, isValid, dirty }) => {
                    return (
                        <div className="d-flex flex-column justyfy-content-center w-50 ">
                            <h2 className="text-center"><b>SignUp</b></h2>
                            <Input error={touched.first_name && errors.first_name ? errors.first_name : null} id='first_name' name='first_name' type='text' placeholder='Enter First name' label='First Name :' onChange={(val) => { setFieldValue('first_name', val); setFieldTouched('first_name') }} vallue={values.first_name} />
                            <Input error={touched.last_name && errors.last_name ? errors.last_name : null} id='last_name' name='last_name' type='text' placeholder='Enter Last name' label='Last Name :' onChange={(val) => { setFieldValue('last_name', val); setFieldTouched('last_name') }} value={values.last_name} />
                            <Input error={touched.email && errors.email ? errors.email : null} id='email' name='email' type='email' placeholder='Enter Email Id' label='Email Id :' onChange={(val) => { setFieldValue('email', val); setFieldTouched('email') }} value={values.email} />
                            <Input error={touched.password && errors.password ? errors.password : null} id='password' name='password' type='passworrd' placeholder='Enter Password' label='Password :' onChange={(val) => { setFieldValue('password', val); setFieldTouched('password') }} value={values.password} />
                            <button disabled={!(isValid && dirty)} onClick={handleSubmit} className="btn btn-primary">SignUp</button>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
}

export default SignUp;