import React, { useState, useEffect } from "react";
import { render, cleanup, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ResponseForm from "..";
import { MAY_16_2014 } from '../../../utils/RealQuestions';

afterEach(cleanup);

describe("ResponseForm component", () => {
    it('renders', () => {
        render(<ResponseForm  fjClueObject={MAY_16_2014} />);
    });

    //Second Test
    it('matches snapshot', () => {
        const { asFragment } = render(<ResponseForm  fjClueObject={MAY_16_2014} />);
        expect(asFragment()).toMatchSnapshot();
    });
});