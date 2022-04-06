import React, { useState, useEffect } from "react";
import { render, cleanup, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ResponseForm from "..";
import { MAY_16_2014 } from '../../../utils/RealQuestions';
import { Provider } from 'react-redux';
import store from '../../../utils/GlobalStore';

afterEach(cleanup);

describe("ResponseForm component", () => {
    it('renders', () => {
        render(<Provider store={store}><ResponseForm  fjClueObject={MAY_16_2014} /></Provider>);
    });

    //Second Test
    it('matches snapshot', () => {
        const { asFragment } = render(<Provider store={store}><ResponseForm  fjClueObject={MAY_16_2014} /></Provider>);
        expect(asFragment()).toMatchSnapshot();
    });
});