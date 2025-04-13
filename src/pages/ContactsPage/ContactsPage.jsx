import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import css from './ContactsPage.module.css';
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { SyncLoader } from "react-spinners";

export default function ContactsPage() {
    const dispatch = useDispatch();
    const isError = useSelector(selectError);
    const isLoadding = useSelector(selectLoading);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className={css.wrapper}>
            <ControlPanel />
            {isLoadding && <SyncLoader />}
            {isError ? <ErrorMessage/> : <ContactList />}
        </div>
    )
}