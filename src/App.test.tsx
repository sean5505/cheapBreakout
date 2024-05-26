import { describe, expect, it } from "vitest";
import { render,  screen } from "@testing-library/react";

import StartButton from "./components/Buttons/StartButton";

describe("test", () => {
  it('start button', () => {
    render(<StartButton/>)
    const start = screen.getByText("Start")
    expect(start).to.exist
  })
})


