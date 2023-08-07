import {useEffect} from "react";
import { useGameStore } from "../../stateManagement/Store";
import { GrClose } from "react-icons/gr";

type Props = {
  children?: React.ReactNode;
};

export default function Modal({ children }: Props) {

  const { isModalOpen, closeModal,openModal } = useGameStore((state) => ({
    isModalOpen: state.isModalOpen,
    closeModal: state.closeModal,
    openModal: state.openModal,
  }));

  useEffect(() => { 
    openModal()
  },[])

  

  return (
    <>
      {isModalOpen ? (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex  items-center justify-center">
          <div
            className="relative bg-gray-400 p-20 flex justify-center items-center rounded-xl "
            onClick={(e) => e.stopPropagation()} //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
          >
           <div className="flex flex-col gap-5 items-center">{children}</div> 
            <button
              className="absolute top-4 right-2 bg-blue-500 p-2 rounded-full transition hover:bg-red-600"
              onClick={closeModal}
            >
              <GrClose />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
