import ContactForm from '../ContactForm/ContactForm';
import Modal from 'react-modal';

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

export default function FormModal({isOpen, onCloseModal}) {
    return (
        <Modal
            isOpen={isOpen}
            style={customStylesModal}
            onRequestClose={onCloseModal}
        >
            <ContactForm onCloseModal={onCloseModal} />
        </Modal>
    );
}