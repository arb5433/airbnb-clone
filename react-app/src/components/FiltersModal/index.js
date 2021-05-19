import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Filters from "./Filters";

function AddFilters({filterTags, allTags}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edt-and-del-btns' onClick={() => setShowModal(true)}>
        Apply a New Filter
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Filters setShowModal={setShowModal} filterTags={filterTags} allTags={allTags}/>
        </Modal>
      )}
    </>
  );
}

export default AddFilters;