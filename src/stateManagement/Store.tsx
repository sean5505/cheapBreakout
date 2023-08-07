import { create } from "zustand";
import { Block } from "../lib/Types";
//split store apart for readability and organizational purposes, incorrect usage of store....
const userStart = [260, 10];

interface GeneralData {
  gameAudio: any;
  isLevelOneCleared: boolean;
  isLevelTwoCleared: boolean;
  isLevelThreeCleared: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  showFeedbackForm: boolean;
  level: number;
  gameBlocks: Block[];
  blockWidth: number;
  blockHeight: number;
  boardWidth: number;
  boardHeight: number;
  isGameOver: boolean | null;
  isGamePaused: boolean | null;
  userCurrentPosition: number[];
  userBlockWidth: number;
  ballDiameter: number;
  totalBlocks: null | number;
  blocksCleared: number;
  ballStartID: boolean;
  ballCurrentPosition: number[];
  laserCurrentPosition: number[] | null;
  laserID: null | number;
  isLaserDisabled: boolean;
  showLaser: boolean;
  laserDiameter: number;
  xDirection: number;
  yDirection: number;
  ballMovement: null | number;
  drawBall: () => void;
  moveBall: () => void;
  attachBall: () => void;
  changeDirection: () => void;
  checkForCollisions: () => void;
  checkForLaserCollisions: () => void;
  checkBlocksArray: () => void;
  startGame: () => void;
  restartGame: () => void;
  score: number;
  scoreMultiply: number;
  ballSpeed: number;
  seconds: number;
  updateSeconds: () => void;
}

interface gameAudio {
  blockHit: HTMLAudioElement;
  gameOver: HTMLAudioElement;
  userHit: HTMLAudioElement;
  wallHit: HTMLAudioElement;
  gameMusic: HTMLAudioElement;
  shoot: HTMLAudioElement;
  toggleSFX: () => void;
}

export const useGameAudio = create<gameAudio>(() => ({
  blockHit: new Audio("audio/bingbong.mp3"), // youtube
  gameOver: new Audio("audio/GameOver.mp3"), // youtube
  userHit: new Audio("audio/userHit.wav"), // https://freesound.org/people/acollier123/sounds/122670/
  wallHit: new Audio("audio/wHM.wav"), // https://freesound.org/people/cabled_mess/sounds/350865/
  gameMusic: (() => {
    const audio = new Audio("audio/GameMusic.wav"); // https://freesound.org/people/djgriffin/sounds/202077/
    audio.volume = 0.2;
    audio.loop = true;
    return audio;
  })(),
  shoot: new Audio("audio/pew.wav"),
  gameComplete: new Audio("audio/win.wav"), //https://freesound.org/people/mehraniiii/sounds/588234/
  toggleSFX: () => {
    const gameMusic = useGameAudio.getState().gameMusic;
    if (gameMusic.volume > 0) {
      gameMusic.volume = 0;
      console.log(gameMusic.volume);
    } else {
      gameMusic.volume = 0.2;
    }
  },
}));
export const useGameStore = create<GeneralData>((set, get) => ({
  gameAudio: useGameAudio.getState(),
  isLevelOneCleared: false,
  isLevelTwoCleared: false,
  isLevelThreeCleared: false,
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, showFeedbackForm: false }),
  showFeedbackForm: false,
  level: 1,
  gameBlocks: [],
  blockWidth: 30,
  blockHeight: 12,
  boardWidth: 560,
  boardHeight: 550,
  isGameOver: false,
  isGamePaused: false,
  userCurrentPosition: userStart,
  userBlockWidth: 50,
  ballDiameter: 15,
  totalBlocks: null,
  blocksCleared: 0,
  ballStartID: true,
  ballCurrentPosition: [userStart[0] + 17, userStart[1] + 10],
  laserCurrentPosition: null,
  laserDiameter: 10,
  laserID: null,
  isLaserDisabled: false,
  showLaser: false,
  xDirection: -2,
  yDirection: 2,
  ballMovement: null, // also being used as an isGameStarted/ongoing
  drawBall: () => {},
  attachBall: () => {
    set((state) => {
      if (!state.ballMovement && state.ballStartID) {
        const newBallStart = [
          state.userCurrentPosition[0] + 17,
          state.userCurrentPosition[1] + 10,
        ];
        state.drawBall();
        return { ballCurrentPosition: newBallStart };
      }
      return state;
    });
  },
  moveBall: () => {},
  changeDirection: () => {
    set((state) => {
      if (state.xDirection == 2 && state.yDirection == 2) {
        return { yDirection: -2 };
      }
      if (state.xDirection == 2 && state.yDirection == -2) {
        return { xDirection: -2 };
      }
      if (state.xDirection == -2 && state.yDirection == -2) {
        return { yDirection: 2 };
      }
      if (state.xDirection == -2 && state.yDirection == 2) {
        return { xDirection: 2 };
      }
      return state;
    });
  },

  checkForCollisions: () => {
    set(() => {
      const {
        ballCurrentPosition,
        boardWidth,
        ballDiameter,
        boardHeight,
        changeDirection,
        userCurrentPosition,
        userBlockWidth,
        gameBlocks,
        ballMovement,
        score,
        scoreMultiply,
        checkBlocksArray,
        blocksCleared,
        gameAudio,
      } = useGameStore.getState();
      // wall collisions
      if (
        ballCurrentPosition[0] >= boardWidth - ballDiameter ||
        ballCurrentPosition[1] >= boardHeight - ballDiameter ||
        ballCurrentPosition[0] <= 0
      ) {
        changeDirection();
        gameAudio.wallHit.play();
      }

      // user collisions
      if (
        ballCurrentPosition[0] >= userCurrentPosition[0] &&
        ballCurrentPosition[0] <= userCurrentPosition[0] + userBlockWidth &&
        ballCurrentPosition[1] >= userCurrentPosition[1] &&
        ballCurrentPosition[1] <= userCurrentPosition[1] + 10
      ) {
        changeDirection();
        gameAudio.userHit.play();
      }

      // block collisions
      gameBlocks.forEach((block) => {
        if (
          ballCurrentPosition[0] >= block.bottomLeft[0] &&
          ballCurrentPosition[0] <= block.bottomRight[0] &&
          ballCurrentPosition[1] + ballDiameter >= block.bottomLeft[1] &&
          ballCurrentPosition[1] <= block.topLeft[1]
        ) {
          const updatedBlocks = gameBlocks.filter((b) => b.id !== block.id);
          changeDirection();
          gameAudio.blockHit.play();
          set({
            totalBlocks: updatedBlocks.length,
            blocksCleared: blocksCleared + 1,
            gameBlocks: updatedBlocks,
            score: score + 100 * scoreMultiply,
          });
        }
      });

      // game over
      if (ballCurrentPosition[1] <= 0) {
        clearInterval(ballMovement as number);
        set({ ballMovement: null });
        setTimeout(() => {
          set({ isGameOver: true });
          gameAudio.gameOver.play();
        }, 500);
      }
      checkBlocksArray();
      return { xDirection: get().xDirection, yDirection: get().yDirection };
    });
  },
  checkForLaserCollisions: () => {
    const {
      boardHeight,
      gameBlocks,
      laserCurrentPosition,
      laserID,
      laserDiameter,
      score,
      scoreMultiply,
      checkBlocksArray,
      blocksCleared,

      blockWidth,
    } = useGameStore.getState();

    //blockCollisions
    if (laserCurrentPosition) {
      gameBlocks.forEach((block) => {
        if (
          // -10 is really ugly fix later
          laserCurrentPosition[0] + blockWidth - laserDiameter >=
            block.bottomLeft[0] &&
          laserCurrentPosition[0] + blockWidth - laserDiameter <=
            block.bottomRight[0] &&
          laserCurrentPosition[1] >= block.bottomLeft[1] &&
          laserCurrentPosition[1] <= block.topLeft[1]
        ) {
          const updatedBlocks = gameBlocks.filter((b) => b.id !== block.id);
          clearInterval(laserID as number);

          set({
            gameBlocks: updatedBlocks,
            totalBlocks: updatedBlocks.length,
            blocksCleared: blocksCleared + 1,
            showLaser: false,
            laserID: null,
            score: score + 50 * scoreMultiply,
          });
          return;
        }
      });
      // board collision
      if (laserCurrentPosition[1] >= boardHeight - laserDiameter) {
        set({ laserCurrentPosition: null, showLaser: false });
      }
    }
    checkBlocksArray();
  },
  checkBlocksArray: () => {
    //extended conditions instead of  creating a new array for the levelblocks?

    const {
      gameBlocks,
      isLevelOneCleared,
      isLevelTwoCleared,
      isLevelThreeCleared,
      ballMovement,
      gameAudio,
    } = useGameStore.getState();
    console.log(
      `isLevelOneCleared: ${isLevelOneCleared} isLevelTwoCleared: ${isLevelTwoCleared} isLevelThreeCleared: ${isLevelThreeCleared}`
    );
    if (gameBlocks.length === 0 && !isLevelOneCleared && !isLevelTwoCleared) {
      console.log(`level one cleared`);
      set({ isLevelOneCleared: true, level: 2 });
    } else if (
      gameBlocks.length === 0 &&
      isLevelOneCleared &&
      !isLevelTwoCleared &&
      !isLevelThreeCleared
    ) {
      console.log(`level two cleared`);
      set({ isLevelTwoCleared: true, level: 3 });
    } else if (
      gameBlocks.length === 0 &&
      isLevelOneCleared &&
      isLevelTwoCleared 
    ) {
      setTimeout(() => {
        gameAudio.gameComplete.play();
        clearInterval(ballMovement as number);
        set({ isLevelThreeCleared: true, ballMovement: null });
      }, 700);
    }
  },
  startGame: () => {
    const { ballMovement, moveBall, ballSpeed, closeModal } =
      useGameStore.getState();
    if (ballMovement) {
      clearInterval(ballMovement as number);
      set({ ballMovement: null, isGamePaused: true });
    } else {
      const timerID = setInterval(moveBall, ballSpeed);
      closeModal(); // if the game is continued after being paused by click keyPress, set the value of isModalOpen to false for laser functionality to prevail
      set({ ballMovement: timerID, isGamePaused: false });
    }
    set({ ballStartID: false });
    return () => {
      clearInterval(ballMovement as number);
    };
  },
  restartGame: () => {
    window.location.reload();
  },

  score: 0,
  scoreMultiply: 1,
  ballSpeed: 10,
  seconds: 0,
  updateSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
}));
