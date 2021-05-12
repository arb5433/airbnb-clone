import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPosting from "./EditPosting";

function EditPostingModal({posting}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Edit Posting |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPosting setShowModal={setShowModal} posting={posting} />
        </Modal>
      )}
    </>
  );
}

export default EditPostingModal;