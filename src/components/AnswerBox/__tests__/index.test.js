import React, { useState, useEffect } from "react";
import { render, cleanup, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import AnswerBox from "..";
import { PRESIDENTS } from "../../../utils/Data";

const presidentNames = Object.values(PRESIDENTS);

afterEach(cleanup);

describe('AnswerBox component', () => {
    //First Test
    it('renders', () => {
        render(<AnswerBox />)
    });

    //Second Test
    it('matches snapshot', () => {
        const { asFragment } = render(<AnswerBox isPerson={true} autoFillOptions={presidentNames} responseNumber={1} />);
        expect(asFragment()).toMatchSnapshot();
    });

    //Third Test
    it('sets the proper question text', () => {
        render(<AnswerBox isPerson={true} autoFillOptions={presidentNames} responseNumber={1} />);
        expect(screen.getByLabelText("Who is")).toBeVisible();
    })
});