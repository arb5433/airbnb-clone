import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';
import { Modal } from "../../context/Modal";
import MyBooking from "./MyBooking";

function MyBookingModal() {
  const [showModal, setShowModal] = useState(false);
  // const history = useHistory()
  const onClick = () => {
    // history.push('/')
    setShowModal(true)
  }

  return (
    <>
      <button className='edt-and-del-btns' onClick={onClick}>
        Bookings |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyBooking setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default MyBookingModal;