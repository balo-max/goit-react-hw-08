import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registrationUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import * as yup from 'yup';
import css from './RegistrationForm.module.css'
import toast, { Toaster } from 'react-hot-toast';

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

    const handleSumit = (values, actions) => {
        dispatch(registrationUser({
            name: values.name,
            email: values.email,
            password: values.password,
        })).unwrap().then(() => {
            toast.success('Registration successful.', {
                duration: 2000,
            })
            actions.resetForm();
        }).catch(() => {
            toast.error('Registration failed. Please try again.', {
                duration: 2000,
            })
        });
    };

    const formId = {
        name: useId(),
        email: useId(),
        password: useId(),
        confirmPassword: useId(),
    };


    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSumit}>
                <Form className={css.regForm}>
                    <label className={css.regLabel} htmlFor={formId.name}>Name</label>
                    <Field className={css.regInput} type='text' name='name' id={formId.name} />
                    <ErrorMessage className={css.error} name='name' component="span" />
                
                    <label className={css.regLabel} htmlFor={formId.email}>Email</label>
                    <Field className={css.regInput} type='email' name='email' id={formId.email} />
                    <ErrorMessage className={css.error} name='email' component="span" />

                    <label className={css.regLabel} htmlFor={formId.password}>Password</label>
                    <Field className={css.regInput} type='password' name='password' autoComplete='newPassword' id={formId.password} />
                    <ErrorMessage className={css.error} name='password' component="span" />

                    <label className={css.regLabel} htmlFor={formId.confirmPassword}>Confirm password</label>
                    <Field className={css.regInput} type='password' name='confirmPassword' autoComplete='confirmPassword' id={formId.confirmPassword} />
                    <ErrorMessage className={css.error} name='confirmPassword' component="span" />

                    <button className={css.regBtn} type='submit'>Registration</button>
                </Form>
            </Formik>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    );
};