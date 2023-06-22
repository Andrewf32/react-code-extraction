import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = (props) => {
  const { isOpen, onRequestClose, overlay, content, children } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backdropFilter: "blur(2px)",
          ...overlay,
        },
        content: {
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          height: "60%",
          borderRadius: "15px",
          padding: 0,
          overflow: "none",
          ...content,
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
