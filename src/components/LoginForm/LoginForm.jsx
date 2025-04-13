import { Field, Form, Formik, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import { useId } from 'react';
import * as yup from 'yup';
import css from './LoginForm.module.css';
import toast, { Toaster } from 'react-hot-toast';

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
        })).unwrap().then((data) => {
            toast.success(`Hello, ${data.user.name}`, {
                duration: 2000,
            }) 
            
        }).catch(() => {
            toast.error('Incorrect email or password.', {
                duration: 2000,
            }) 
        });
        actions.resetForm();
    };

    const formId = {
        email: useId(),
        password: useId(),
    }

    return (
        <>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className={css.loginForm}>
                    <label className={css.loginLabel} htmlFor={formId.email}>E-mail<span className={css.spanRequired}>*</span></label>
                    <Field className={css.loginInput} type='email' name='email' autoComplete='email' id={formId.email} />
                    <ErrorMessage className={css.error} name='email' component="span" />
                
                    <label className={css.loginLabel} htmlFor={formId.password}>Password<span className={css.spanRequired}>*</span></label>
                    <Field className={css.loginInput} type='password' name='password' autoComplete='current-password' id={formId.password} />
                    <ErrorMessage className={css.error} name='password' component="span" />
                
                    <button className={css.loginBtn} type='submit'>Login</button>
                </Form>
            </Formik>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
};