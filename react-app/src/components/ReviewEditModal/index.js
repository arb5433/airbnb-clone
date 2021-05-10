import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewEditForm from "./ReviewEditForm";

function ReviewEditFormModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='login_btn' onClick={() => setShowModal(true)}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewEditForm review={review}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewEditFormModal;