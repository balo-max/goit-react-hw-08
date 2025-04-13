import css from './ContactList.module.css'

import Contact from '../Contact/Contact'
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';
import { useState } from 'react';
import { setCurrentContact } from '../../redux/contacts/actions';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import FormModal from '../FormModal/FormModal';
import { selectNameFilter } from '../../redux/filters/selectors';

export default function ContactList() {
    const contacts = useSelector(selectFilteredContacts);
    const filterSearch = useSelector(selectNameFilter);

     const dispatch = useDispatch();
        const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
        const [deleteContact, setDeleteContact] = useState(null);
        const [isOpenUpdtModal, setisUpdtOpenModal] = useState(false);
    
        const handleOpenUpdtModal = (value) => {
            setisUpdtOpenModal(true);
            dispatch(setCurrentContact(value));
        }
    
        const handleCloseUpdtModal = () => {
            setisUpdtOpenModal(false);
        }
        
        const handleOpenConfirmModal = (contact) => {
            setIsOpenConfirmModal(true);
            setDeleteContact(contact);
        }
        
        const handleCloseConfirmModal = () => {
            setIsOpenConfirmModal(false);
            setDeleteContact(null);
        }
    
    return contacts.length === 0
        ?
        (!filterSearch ? <p>Contacts book is empty</p> : <p>Contact is not found</p>)
        : (
            <div className={css.listWrapper}>
                <ul className={css.contactList}>
                    {contacts.map(contact =>
                        <li className={css.contactItem} key={contact.id}>
                            <Contact contact={contact} onEdit={handleOpenUpdtModal} onDelete={handleOpenConfirmModal} />
                        </li>
                    )}
                </ul>
                <ConfirmModal isOpen={isOpenConfirmModal} onCloseModal={handleCloseConfirmModal} contact={deleteContact} />
                <FormModal isOpen={isOpenUpdtModal} onCloseModal={handleCloseUpdtModal}/>
            </div>
        );
}