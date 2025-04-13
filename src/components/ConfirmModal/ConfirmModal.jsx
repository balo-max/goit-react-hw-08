import { deleteContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import css from './ConfirmModal.module.css';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const customStylesModal = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "fit-content",
    border: "unset",
    background: "transparent",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",   
  }
};

export default function ConfirmModal({ isOpen, onCloseModal, contact }) {
    
    const dispatch = useDispatch();
    const handledDelete = () => dispatch(deleteContact(contact.id)).unwrap().then(() => {
        toast.success(`${contact.name} deleted successfully.`, {
            duration: 2000,
        });
        onCloseModal();
    });

    return (
        <Modal isOpen={isOpen}
            style={customStylesModal}
            onRequestClose={onCloseModal}>
            <div className={css.wrapper}>
                {contact !== null && <p className={css.text}>Are you sure you want to delete <span className={css.span}>{contact.name}</span>?</p>}
                <div className={css.btnWrapper}>
                    <button type="button" className={css.btn} onClick={handledDelete}>Yes</button>
                    <button type="button" className={css.btn} onClick={onCloseModal}>No</button>
                </div>
            </div>
        </Modal>
    )
}