import { describe, expect, beforeEach, it } from "vitest";
import { render, RenderResult } from "@testing-library/react";

import App from "./App";

describe("User Interface", () => {
  let renderedApp: RenderResult;
  beforeEach(() => {
    renderedApp = render(<App />);
  });
  it("Game Board Mounts", () => {
    const gameBoard = renderedApp.getByTestId("game-board");
    expect(gameBoard).toBeTruthy();
  });

  it("Difficulty Select Mounts", () => {
    const selectDifficulty = renderedApp.getByTestId("DifficultyForm"); // Make sure the test ID is correct
    expect(selectDifficulty).toBeTruthy();
  });

  it("Game Controls Mounts", () => {
    const controls = renderedApp.getByTestId("Controls");
    expect(controls).toBeTruthy();
  });

  it("Footer Mounts", () => {
    const Footer = renderedApp.getByTestId("footer");
    expect(Footer).toBeTruthy();
  });

  it("Game Statistics Mounts", () => {
    const userStats = renderedApp.getByTestId("gamestats");
    expect(userStats).toBeTruthy();
  });

  it("Game Buttons Mounts", () => {
    const toggleGame = renderedApp.getByTestId("toggleGame");
    expect(toggleGame).toBeTruthy();
  });

  it("start button exists", () => {
    const startButton = renderedApp.getByTestId("startButton");
    expect(startButton).toBeTruthy();
  });
});

describe("StartGame", () => {
  it("Starts The Game", () => {});
});
