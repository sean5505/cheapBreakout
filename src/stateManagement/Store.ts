import { create } from "zustand";
import { Block } from "../lib/Types";

//split store apart for readability and organizational purposes, incorrect usage of store....
const userStart = [275, 10];

interface GeneralData {
  gameAudio: any;
  isLevelOneCleared: boolean;
  isLevelTwoCleared: boolean;
  isLevelThreeCleared: boolean;
  isModalOpen: boolean;
  isLoading: boolean; // utilizing to remove event listeners when a setTimeout like reset() is being performed
  openModal: () => void;
  closeModal: () => void;
  showFeedbackForm: boolean;
  playerLives: number;
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
  userBlockHeight: number;
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
  ballMovement: null | number | NodeJS.Timer; // also being used as an isGameStarted/ongoing
  drawBall: () => void;
  moveBall: () => void;
  attachBall: () => void;
  changeDirection: () => void;
  checkForCollisions: () => void;
  checkForLaserCollisions: () => void;
  checkBlocksArray: () => void;
  startGame: () => void;
  pauseGame: () => void;
  restartGame: () => void;
  score: number;
  scoreMultiply: number;
  ballSpeed: number;
  seconds: number;
  updateSeconds: () => void;
  reset: () => void;
}

interface gameAudio {
  blockHit: HTMLAudioElement;
  gameOver: HTMLAudioElement;
  userHit: HTMLAudioElement;
  wallHit: HTMLAudioElement;
  gameMusic: HTMLAudioElement;
  shoot: HTMLAudioElement;
  gameComplete: HTMLAudioElement;
  levelComplete: HTMLAudioElement;
  liveLost: HTMLAudioElement;
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
  levelComplete: new Audio("audio/levelComplete.wav"), // https://freesound.org/people/jivatma07/sounds/122255/
  gameComplete: new Audio("audio/win.wav"), //https://freesound.org/people/mehraniiii/sounds/588234/
  liveLost: new Audio("audio/liveLost.mp3"), //https://freesound.org/people/Simon_Lacelle/sounds/45654/
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
  isLoading: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, showFeedbackForm: false }),
  showFeedbackForm: false,
  level: 1,
  playerLives: 1,
  gameBlocks: [],
  blockWidth: 30,
  blockHeight: 12,
  boardWidth: 560,
  boardHeight: 550,
  isGameOver: false,
  isGamePaused: false,
  userCurrentPosition: userStart,
  userBlockWidth: 50,
  userBlockHeight: 10,
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
      const { ballMovement, ballStartID, userCurrentPosition, drawBall } =
        state;
      if (!ballMovement && ballStartID) {
        const newBallStart = [
          userCurrentPosition[0] + 17,
          userCurrentPosition[1] + 10,
        ];
        drawBall();
        return { ...state, ballCurrentPosition: newBallStart };
      }
      return state;
    });
  },
  moveBall: () => {
    const {
      xDirection,
      yDirection,
      ballCurrentPosition,
      drawBall,
      checkForCollisions,
      ballMovement,
    } = useGameStore.getState();
    const updatedBallPosition = [
      ballCurrentPosition[0] + xDirection,
      ballCurrentPosition[1] + yDirection,
    ];
    set({
      ballCurrentPosition: updatedBallPosition,
    });
    drawBall();
    checkForCollisions();

    if (ballCurrentPosition[1] <= 0) {
      clearInterval(ballMovement as number); // hmm
    }
  },
  changeDirection: () => {
    set((state) => {
      const { xDirection, yDirection } = state;
      if (xDirection == 2 && yDirection == 2) {
        return { ...state, yDirection: -2 };
      }
      if (xDirection == 2 && yDirection == -2) {
        return { ...state, xDirection: -2 };
      }
      if (xDirection == -2 && yDirection == -2) {
        return { ...state, yDirection: 2 };
      }
      if (xDirection == -2 && yDirection == 2) {
        return { ...state, xDirection: 2 };
      }
      return state;
    });
  },

  checkForCollisions: () => { //this should be called in a setInterval
    const {
      ballCurrentPosition,
      boardWidth,
      ballDiameter,
      boardHeight,
      changeDirection,
      userCurrentPosition,
      userBlockWidth,
      userBlockHeight,
      gameBlocks,
      ballMovement,
      score,
      scoreMultiply,
      checkBlocksArray,
      blocksCleared,
      gameAudio,
      playerLives,
      reset,
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
      ballCurrentPosition[1] <= userCurrentPosition[1] + userBlockHeight
    ) {
      changeDirection();
      gameAudio.userHit.play();
    }
    let updatedBlocks;
    // block collisions
    gameBlocks.forEach((block) => {
      if (
        ballCurrentPosition[0] >= block.bottomLeft[0] &&
        ballCurrentPosition[0] <= block.bottomRight[0] &&
        ballCurrentPosition[1] + ballDiameter >= block.bottomLeft[1] &&
        ballCurrentPosition[1] <= block.topLeft[1]
      ) {
        updatedBlocks = gameBlocks.filter((b) => b.id !== block.id);
        changeDirection();
        gameAudio.blockHit.play();
        set({
          gameBlocks: updatedBlocks,
          totalBlocks: updatedBlocks.length,
          blocksCleared: blocksCleared + 1,
          score: score + 100 * scoreMultiply,
        });
      }

      // game over || floor collision
      if (ballCurrentPosition[1] <= 0) {
        clearInterval(ballMovement as number);
        set({ ballMovement: null, playerLives: playerLives - 1 });
        if (playerLives != 0) {
          gameAudio.liveLost.play();
        }
        if (playerLives == 0) {
          gameAudio.gameMusic.pause();
          set({isLoading: true})
          setTimeout(() => {
            set({ isGameOver: true, isLoading: false });
            gameAudio.gameOver.play();
          }, 500);
        } else {
          reset();
        }
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
        }
      });
      // board collision
      if (laserCurrentPosition[1] >= boardHeight - laserDiameter) {
        set({ laserCurrentPosition: null, showLaser: false });
      }
      checkBlocksArray();
    }
  },
  checkBlocksArray: () => {
    //extended conditions instead of creating a new array pertaining to each levelblocks?
    const {
      gameBlocks,
      isLevelOneCleared,
      isLevelTwoCleared,
      ballMovement,
      gameAudio,
      level,
      reset,
      playerLives,
    } = useGameStore.getState();

    if (gameBlocks.length === 0) {
      if (!isLevelOneCleared && level == 1) {
        gameAudio.levelComplete.play();
        reset();
        set({ isLevelOneCleared: true, playerLives: playerLives + 1 });
      } else if (isLevelOneCleared && !isLevelTwoCleared && level == 2) {
        gameAudio.levelComplete.play();
        reset();
        set({ isLevelTwoCleared: true, playerLives: playerLives + 1 });
      } else if (
        gameBlocks.length === 0 &&
        isLevelOneCleared &&
        isLevelTwoCleared &&
        level == 3
      ) {
        set({isLoading: true})
        setTimeout(() => {
          gameAudio.gameComplete.play();
          clearInterval(ballMovement as number);
          set({ isLevelThreeCleared: true, ballMovement: null, isLoading: false });
        }, 700);
      }
    }
  },
  startGame: () => {
    const { moveBall, ballSpeed, closeModal } = useGameStore.getState();
    const timerID = setInterval(moveBall, ballSpeed);
    closeModal(); // if the game is continued after being paused by click keyPress, set the value of isModalOpen to false for laser functionality to prevail
    set({ ballMovement: timerID, isGamePaused: false, ballStartID: false });
  },

  pauseGame: () => {
    const { ballMovement } = useGameStore.getState();
    clearInterval(ballMovement as number);
    set({ ballMovement: null, isGamePaused: true });
  },

  restartGame: () => {
    window.location.reload();
  },

  score: 0,
  scoreMultiply: JSON.parse(localStorage.getItem('difficultySettings') || '{}').scoreMultiply || 1, //ahhhhhhhhh interesting so for the first load a difficulty has to be selected or a default value is needed or else it will not be calculated correctly but afterwards we good
  ballSpeed: JSON.parse(localStorage.getItem('difficultySettings') || '{}').selectedDifficulty || 10,

  seconds: 0,
  updateSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
  reset: () => {
    const { ballMovement, attachBall } = useGameStore.getState();
    clearInterval(ballMovement as number);
    set({isLoading: true})
    setTimeout(() => {
      set({
        ballCurrentPosition: [userStart[0] + 17, userStart[1] + 10],
        ballStartID: true,
        ballMovement: null,
        userCurrentPosition: userStart,
        xDirection: -2,
        yDirection: 2,
        isLoading: false,
      });
    }, 500);
    attachBall();
  },

}));
