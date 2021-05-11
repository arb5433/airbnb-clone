import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SingUpForm from "./SignUpForm.js";


function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Sign-Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SingUpForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;