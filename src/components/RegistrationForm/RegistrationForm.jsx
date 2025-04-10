import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registrationUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import * as yup from 'yup';
import css from './RegistrationForm.module.css'

const validationSchema = yup.object({
    name: yup.string()
        .min(2, "Too Short!")
        .max(30, "Too Long!")
        .required("Required"),
    email: yup.string()
        .email('Incorrect email')
        .required('Required'),
    password: yup.string()
        .min(8, 'Too Short!')
        .required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match.')
        .required('Required'),
});
  
const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

export default function RegistrationForm() {
    const dispatch = useDispatch();

    const handleSumit = (event, actions) => {
        dispatch(registrationUser({
            name: event.name,
            email: event.email,
            password: event.password,
        }));
        actions.resetForm();
    };

    const formId = {
        name: useId(),
        email: useId(),
        password: useId(),
        confirmPassword: useId(),
    };


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSumit}>
            <Form className={css.regForm}>
                <label htmlFor={formId.name}>Name</label>
                <Field type='text' name='name' id={formId.name} />
                <ErrorMessage name='name' />
                
                <label htmlFor={formId.email}>Email</label>
                <Field type='email' name='email' id={formId.email} />
                <ErrorMessage name='email'/>

                <label htmlFor={formId.password}>Password</label>
                <Field type='password' name='password' autoComplete='newPassword' id={formId.password} />
                <ErrorMessage name='password'/>

                <label htmlFor={formId.confirmPassword}>Confirm password</label>
                <Field type='password' name='confirmPassword' autoComplete='confirmPassword' id={formId.confirmPassword} />
                <ErrorMessage name='confirmPassword'/>

                <button type='submit'>Registration</button>
            </Form>
        </Formik>
    )
};