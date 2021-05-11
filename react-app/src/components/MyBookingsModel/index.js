import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MyBooking from "./MyBooking";

function MyBookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Bookings |
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyBooking/>
        </Modal>
      )}
    </>
  );
}

export default MyBookingModal;