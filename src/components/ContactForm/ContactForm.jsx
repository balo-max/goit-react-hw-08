import { Formik, Form, Field, ErrorMessage } from 'formik'
import { addContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import * as yup from 'yup';

import css from './ContactForm.module.css'


const initialValues = {
    name: "",
    number: ""
};
  
const validationSchema = yup.object().shape({
    name: yup.string().min(2, "Too Short!").max(30, "Too Long!").required("Required"),
    number: yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "Number format 111-11-11")
        .required("Required")
});

export default function ContactForm() {

    const dispatch = useDispatch();

    const formId = {
        nameId: useId(),
        numberId: useId()
    };

    const handleSubmit = (event, actions) => {
        dispatch(addContact({
            name: event.name,
            number: event.number,
        }))
        actions.resetForm();
    };
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form className={css.contactForm}>
                <label htmlFor={formId.nameId}>Name</label>
                <Field className={css.formInput} type="text" name="name" id={formId.nameId} />
                <ErrorMessage className={css.errorMessage} name="name" component="span"/>
                <label htmlFor={formId.numberId}>Number</label>
                <Field className={css.formInput} type="text" name="number" id={formId.numberId} />
                <ErrorMessage className={css.errorMessage} name="number" component="span"/>
                
                <button className={css.formBtn} type="submit">Add contact</button>
            </Form>
        </Formik>
    );
}