function GameDescription() {
  return (
    <p className="w-full text-sm text-center sm:text-base sm:w-3/5 mt-2">
          A cheap remake of Atari Breakout, a game with the goal of clearing all
          blocks without letting the ball hit the horizon. As the ball collides
          with the blocks, the block vanishes and the user earns points. The
          speed at which the ball moves is controlled by the difficulty
          setting. As a result, playing at a higher difficulty level allows the
          user to accumulate additional points. Additionally, players are given
          the option to use a laser, which can greatly assist their progress in
          the game, but it comes with the trade-off of earning fewer points.
          They can choose to enable or disable this option as they wish.
        </p>
  )
}

export default GameDescription