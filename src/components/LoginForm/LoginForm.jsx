import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import * as yup from 'yup';
import css from './LoginForm.module.css';
import { useId } from 'react';

const validationSchema = yup.object({
    email: yup.string()
        .email('Incorrect email')
        .required('Required'),
    password: yup.string()
        .min(8, 'Too Short!')
        .required('Required'),
});

const initialValues = {
    email: '',
    password: ''
}

export default function LoginForm() {
    const dispatch = useDispatch();

    const handleSubmit = (event, actions) => {
        dispatch(loginUser({
            email: event.email,
            password: event.password,
        }));
        actions.resetForm();
    };

    const formId = {
        email: useId(),
        password: useId(),
    }

    return (
        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={css.loginForm}>
                <label htmlFor={formId.email}>E-mail</label>
                <Field type='email' name='email' autoComplete='email' id={formId.email} />
                <ErrorMessage name='email'/>
                
                <label htmlFor={formId.password}>Password</label>
                <Field type='password' name='password' autoComplete='current-password' id={formId.password} />
                <ErrorMessage name='password'/>
                
                <button type='submit'>Login</button>
            </Form>
        </Formik>
    )
};