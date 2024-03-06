import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  function onCloseModal() {
    setIsOpenModal(false);
  }
  return (
    <>
      <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
        Add New Cabin
      </Button>
      {isOpenModal && (
        <Modal onCloseModal={onCloseModal}>
          <CreateCabinForm onCloseModal={onCloseModal} />
        </Modal>
      )}
    </>
  );
}
