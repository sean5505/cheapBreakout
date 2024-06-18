import { GrClose } from "react-icons/gr";
import { useGameStore } from "../../stateManagement/Store";
type Props = {
  isModalOpen: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  title: string;
};

export default function GameModal({
  children,
  title,
  isModalOpen,
  closeModal,
}: Props) {
  const isDifficultySelected = useGameStore(
    (state) => state.isDifficultySelected
  );
  return (
    <>
      {isModalOpen ? (
        <div className="absolute inset-0  bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className=" bg-gray-400 p-4 w-1/2 rounded-xl"
            onClick={(e) => e.stopPropagation()} //https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
          >
            <header
              className={`flex ${
                isDifficultySelected ? "justify-between" : "justify-center"
              } items-center border-b-2 pb-1 border-black`}
            >
              <h1>{title}</h1>

              <button
                className={`bg-blue-500 p-2 rounded-full transition hover:bg-red-600 ${
                  isDifficultySelected ? "" : "hidden"
                }`}
                onClick={() => {
                  closeModal();
                }}
              >
                <GrClose />
              </button>
            </header>
            <div className="flex flex-col gap-3 items-center mt-4">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
