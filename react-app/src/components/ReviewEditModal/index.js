import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewEditForm from "./ReviewEditForm";

function ReviewEditFormModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewEditForm review={review} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewEditFormModal;