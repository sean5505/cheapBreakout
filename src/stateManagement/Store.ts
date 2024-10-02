import { create } from "zustand";
import { Block } from "../lib/Types";

//split store apart for readability and organizational purposes, incorrect usage of store....
const userStart = [16, 1];

interface GeneralData {
  isFormOpen: boolean;
  isDifficultySelected: boolean;
  setDifficulty: string;
  gameAudio: any;
  isLevelOneCleared: boolean;
  isLevelTwoCleared: boolean;
  isLevelThreeCleared: boolean;
  isLoading: boolean; // utilizing to remove event listeners when a setTimeout like reset() is being performed
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
  sfx: HTMLAudioElement;
  shoot: HTMLAudioElement;
  gameComplete: HTMLAudioElement;
  levelComplete: HTMLAudioElement;
  liveLost: HTMLAudioElement;
  isSFXMuted: Boolean;
  toggleSFX: () => void;
}

export const useGameAudio = create<gameAudio>((set) => ({
  blockHit: new Audio("audio/bingbong.mp3"), // youtube
  gameOver: new Audio("audio/GameOver.mp3"), // youtube
  userHit: new Audio("audio/userHit.wav"), // https://freesound.org/people/acollier123/sounds/122670/
  wallHit: new Audio("audio/wHM.wav"), // https://freesound.org/people/cabled_mess/sounds/350865/
  sfx: (() => {
    const audio = new Audio("audio/backgroundAudio.wav"); // https://freesound.org/people/djgriffin/sounds/202077/
    audio.volume = 0.2;
    audio.loop = true;
    return audio;
  })(),
  shoot: new Audio("audio/pew.wav"),
  levelComplete: new Audio("audio/levelComplete.wav"), // https://freesound.org/people/jivatma07/sounds/122255/
  gameComplete: new Audio("audio/win.wav"), //https://freesound.org/people/mehraniiii/sounds/588234/
  liveLost: new Audio("audio/liveLost.mp3"), //https://freesound.org/people/Simon_Lacelle/sounds/45654/
  isSFXMuted: true,
  toggleSFX: () => {
    set((state) => {
      const isMuted = !state.isSFXMuted;
      state.sfx.volume = isMuted ? 0 : 0.2;
      return { isSFXMuted: isMuted };
    });
  },
}));
export const useGameStore = create<GeneralData>((set, get) => ({
  isFormOpen: false,
  isDifficultySelected: false,
  setDifficulty: "",
  gameAudio: useGameAudio.getState(),
  isLevelOneCleared: false,
  isLevelTwoCleared: false,
  isLevelThreeCleared: false,
  isLoading: false,
  level: 0,
  playerLives: 1,
  gameBlocks: [],
  blockWidth: 2,
  blockHeight: 1,
  boardWidth: 36, 
  boardHeight: 35, 
  isGameOver: false,
  isGamePaused: false,
  userCurrentPosition: userStart,
  userBlockWidth: 3, 
  userBlockHeight: .5,
  ballDiameter: .5,
  totalBlocks: null,
  blocksCleared: 0,
  ballStartID: true,
  ballCurrentPosition: [userStart[0] + .5, userStart[1] + .5],
  laserCurrentPosition: null,
  laserDiameter: .5, 
  laserID: null,
  isLaserDisabled: false,
  showLaser: false,
  xDirection: -.1, // incrreasing and decreasing by .1 every interval
  yDirection: .1,
  ballMovement: null, // also being used as an isGameStarted/ongoing
  drawBall: () => {},
  attachBall: () => {
    set((state) => {
      const { ballMovement, ballStartID, userCurrentPosition, drawBall } =
        state;
      if (!ballMovement && ballStartID) {
        const newBallStart = [
          userCurrentPosition[0] + 1,
          userCurrentPosition[1] + .5,
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
      set({ ballMovement: null });
    }
  },
  changeDirection: () => {
    set((state) => {
      const { xDirection, yDirection } = state;
      if (xDirection == .1 && yDirection == .1) {
        return { ...state, yDirection: -.1 };
      }
      if (xDirection == .1 && yDirection == -.1) {
        return { ...state, xDirection: -.1 };
      }
      if (xDirection == -.1 && yDirection == -.1) {
        return { ...state, yDirection: .1 };
      }
      if (xDirection == -.1 && yDirection == .1) {
        return { ...state, xDirection: .1 };
      }
      return state;
    });
  },
 
  checkForCollisions: () => {
    //this should be called in a setInterval
    const {
      ballCurrentPosition,
      boardWidth,
      ballDiameter,
      boardHeight,
      changeDirection,
      userCurrentPosition,
      userBlockHeight,
      userBlockWidth,
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

    // user collisions // comeback to this later cause damn that was annoying
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
          gameAudio.sfx.pause();
          set({ isLoading: true });
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
          console.log('block hit at ' + block.bottomRight, block.bottomLeft, block.topRight, block.topLeft)
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
      if (laserCurrentPosition[1] >= boardHeight - 1) { //1 is the representation of the laser width
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
        set({ isLoading: true });
        setTimeout(() => {
          gameAudio.gameComplete.play();
          clearInterval(ballMovement as number);
          set({
            isLevelThreeCleared: true,
            ballMovement: null,
            isLoading: false,
          });
        }, 700);
      }
    }
  },
  startGame: () => {
    const { moveBall, ballSpeed } = useGameStore.getState();
    const timerID = setInterval(moveBall, ballSpeed);
    set({ ballMovement: timerID, isGamePaused: false, ballStartID: false });
  },

  pauseGame: () => {
    const { ballMovement } = useGameStore.getState();
    clearInterval(ballMovement as number);
    set({ ballMovement: null, isGamePaused: true });
  },

  restartGame: () => {
    //gonna remove later not the react way
    window.location.reload();
  },

  score: 0,
  scoreMultiply: 0,
  ballSpeed: 0,

  seconds: 0,
  updateSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
  reset: () => {
    //will reset ball functions and user functions
    const { ballMovement, attachBall } = useGameStore.getState();
    clearInterval(ballMovement as number);
    set({ isLoading: true });
    setTimeout(() => {
      set({
        ballCurrentPosition: [userStart[0] + 1, userStart[1] + 0.5],
        ballStartID: true,
        ballMovement: null,
        userCurrentPosition: userStart,
        xDirection: -.1,
        yDirection: .1,
        isLoading: false,
      });
    }, 1000);
    attachBall();
  },
}));
