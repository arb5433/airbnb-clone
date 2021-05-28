import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';
import { Modal } from "../../context/Modal";
import MyPostings from "./MyPostings";

function MyPostingsModal() {
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory()
  const onClick = () => {
    // history.push('/')
    setShowModal(true)
  }

  return (
    <>
      <button className='edt-and-del-btns' onClick={onClick}>
        Postings |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyPostings setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default MyPostingsModal;