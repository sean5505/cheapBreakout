import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, RenderResult, fireEvent} from "@testing-library/react";

import App from "./App";
import { useGameStore } from "./stateManagement/Store";

const startGame = useGameStore((state) => state.startGame) // Set the mock function as startGame

describe("User Interface", () => {
  let renderedApp: RenderResult
  beforeEach(() => { 
   renderedApp = render(<App />)
})
  test("Game Board Mounts", () => {
    const gameBoard = renderedApp.getByTestId("game-board");
    expect(gameBoard).toBeTruthy();
  });

  test("Difficulty Select Mounts", () => {
    const selectDifficulty = renderedApp.getByTestId("DifficultyForm"); // Make sure the test ID is correct
    expect(selectDifficulty).toBeTruthy();
  });

  test("Game Controls Mounts", () => {
    const controls = renderedApp.getByTestId("Controls");
    expect(controls).toBeTruthy();
  });

  test("Footer Mounts", () => {
    const Footer = renderedApp.getByTestId("footer");
    expect(Footer).toBeTruthy();
  });

  test("Game Statistics Mounts", () => {
    const userStats = renderedApp.getByTestId("gamestats");
    expect(userStats).toBeTruthy();
  });

  test("Game Buttons Mounts", () => {
    const toggleGame = renderedApp.getByTestId("toggleGame");
    expect(toggleGame).toBeTruthy();
  });

  test("Clicking on Start Game Calls startGame function", () => {
    const fn = vi.fn()

    const startGameMock = fn(startGame())
    const startButton = renderedApp.getByTestId('startButton');

    fireEvent.click(startButton); // Simulate a button click

    expect(startGameMock).toHaveBeenCalled(); // Check if the mock function was called
  });
})