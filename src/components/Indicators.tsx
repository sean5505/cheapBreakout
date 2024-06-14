import { useGameAudio, useGameStore } from "../stateManagement/Store";

export default function Indicators() {
  const isMuted = useGameAudio((state) => state.isSFXMuted);
  const isLaserDisabled = useGameStore((state) => state.isLaserDisabled)
  return (
    <>
    <div className="absolute left-0 -top-14" >
      <p>
        SFX:{" "}
        {isMuted ? (
          <span className="text-red-600">Off</span>
        ) : (
          <span className="text-green-400">On</span>
        )}
      </p>
      <p>
        Laser:{" "}
        {isLaserDisabled ? (
          <span className="text-red-600">Off</span>
        ) : (
          <span className="text-green-400">On</span>
        )}
      </p>
      </div>
    </>
  );
}
