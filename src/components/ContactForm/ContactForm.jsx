import { Formik, Form, Field, ErrorMessage } from 'formik'
import { addContact, updateContact } from '../../redux/contacts/operations';
import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import * as yup from 'yup';

import css from './ContactForm.module.css'
import toast from 'react-hot-toast';
import { selectCurrentContact } from '../../redux/contacts/selectors';
  
const validationSchema = yup.object().shape({
    name: yup.string().min(2, "Too Short!").max(30, "Too Long!").required("Required"),
    number: yup.string()
        .matches(/^[0-9()\-+/\s]+$/, 'Only numbers and symbols ( ) - +')
        .required("Required")
});

export default function ContactForm({ onCloseModal }) {
    const currentContact = useSelector(selectCurrentContact);

    const initialValues = {
        name: currentContact.name,
        number: currentContact.number,
    };

    const dispatch = useDispatch();

    const formId = {
        nameId: useId(),
        numberId: useId()
    };

    const handleSubmit = (event, actions) => {
        if ((!currentContact || Object.values(currentContact).every(val => val === ''))) {
            dispatch(addContact({
                name: event.name,
                number: event.number,
            })).unwrap().then(() => {
                toast.success(`${event.name} created successfully.`, {
                    duration: 2000,
                })
            });
            onCloseModal();
            actions.resetForm();
            return;
        }
        dispatch(updateContact({ id: currentContact.id, name: event.name, number: event.number })).unwrap().then(() => {
                toast.success(`${event.name} updated successfully.`, {
                    duration: 2000,
                })
            });
        onCloseModal();
        actions.resetForm();
    };
    
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            <Form className={css.contactForm}>
                <label htmlFor={formId.nameId}>Name</label>
                <Field className={css.formInput} type="text" name="name" id={formId.nameId} />
                <ErrorMessage className={css.errorMessage} name="name" component="span" />
                <label htmlFor={formId.numberId}>Number</label>
                <Field className={css.formInput} type="text" name="number" id={formId.numberId} />
                <ErrorMessage className={css.errorMessage} name="number" component="span" />
                
                {(!currentContact || Object.values(currentContact).every(val => val === ''))
                    ?
                    <div className={css.editBtn}>
                        <button className={css.formBtn} type="submit">Add contact</button>
                        <button className={css.formBtn} type='button' onClick={onCloseModal}>Cancel</button>
                    </div>
                    :
                    <div className={css.editBtn}>
                        <button className={css.formBtn} type="submit">Update</button>
                        <button className={css.formBtn} type='button' onClick={onCloseModal}>Cancel</button>
                    </div>}
            </Form>
        </Formik>
    );
}