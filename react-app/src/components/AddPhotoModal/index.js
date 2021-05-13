import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddPhoto from "./AddPhoto";

function AddPhotoModal({posting}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Add Photo |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPhoto setShowModal={setShowModal} posting={posting} />
        </Modal>
      )}
    </>
  );
}

export default AddPhotoModal;