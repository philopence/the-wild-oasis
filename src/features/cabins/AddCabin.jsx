import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens="table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal>
    </>
  );
}

// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   function onCloseModal() {
//     setIsOpenModal(false);
//   }
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
//         Add New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onCloseModal={onCloseModal}>
//           <CreateCabinForm onCloseModal={onCloseModal} />
//         </Modal>
//       )}
//     </>
//   );
// }
