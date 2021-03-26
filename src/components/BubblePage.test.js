//TECH IMPORTS
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//COMPONENT IMPORTS
import App from "../App";
import Login from "./Login";
import BubblePage from "./BubblePage";
// import { setColorList as mockSetColorList } from "./BubblePage";

const mockSetColorList=jest.fn();

test("Renders BubblePage without errors", () => {

render(<BubblePage />)


 
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // Finish this test
  const { rerender }=render(<BubblePage />)

  // mockSetColorList.mockResolvedValueOnce(
  //   {color: "aliceblue", id: 1},
  //   {color: "limegreen", id: 2}
  // )

  // rerender(<BubblePage />)
  

  rerender(<BubblePage />)

  waitFor( async()=>{
    const aquamarine = await screen.findByText(/aquamarine/i);

    const aqua = await screen.findByText(/aqua/i);

    expect(aquamarine).toBeInTheDocument();

    expect(aqua).toBeInTheDocument();
  })
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading