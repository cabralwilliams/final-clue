import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import HomePage from '..';

afterEach(cleanup);

describe("Home page", () => {
    //Test 1
    it("renders", () => {
        render(<HomePage />);
    });
})