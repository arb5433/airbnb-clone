import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MyPostings from "./MyPostings";

function MyPostingsModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Postings |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyPostings/>
        </Modal>
      )}
    </>
  );
}

export default MyPostingsModal;