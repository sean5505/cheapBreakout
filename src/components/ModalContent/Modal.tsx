import { useEffect } from "react";
import { useGameStore } from "../../stateManagement/Store";
import { GrClose } from "react-icons/gr";

type Props = {
  children?: React.ReactNode;
  title: string;
};

export default function Modal({ children, title }: Props) {
  const { isModalOpen, closeModal, openModal } = useGameStore((state) => ({
    isModalOpen: state.isModalOpen,
    closeModal: state.closeModal,
    openModal: state.openModal,
  }));

  useEffect(() => {
    openModal();
  }, []);

  return (
    <>
      {isModalOpen ? (
        <div className="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className=" bg-gray-400 p-4 w-1/2 rounded-xl   "
            onClick={(e) => e.stopPropagation()} //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
          >
            <header className="flex justify-between items-center border-b-2 border-black">
              <h1>{title}</h1>
              <button
                className=" bg-blue-500 p-2 rounded-full transition hover:bg-red-600"
                onClick={closeModal}
              >
                <GrClose />
              </button>
            </header>
            <div className="flex flex-col gap-5 items-center">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
