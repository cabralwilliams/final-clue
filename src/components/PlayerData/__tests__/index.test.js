import React from "react";
import PlayerData from "..";
import { render, cleanup, screen } from "@testing-library/react";
import { formatDate, formatDollars } from '../../../utils/Format'

afterEach(cleanup);

describe("PlayerData component", () => {
    
    const playerObject1 = {
        name: "Cabral Williams",
        runDates: `${formatDate(new Date("January 1, 2022"))} - ${formatDate(new Date("January 31, 2022"))}`,
        victories: 15,
        winnings: formatDollars(222800),
        notes: "This is fake data."
    }

    //Test 1
    it("renders", () => {
        render(<PlayerData playerObject={playerObject1}/>);
    });

    const playerObject2 = {
        name: "Cabral Williams",
        runDates: `${formatDate(new Date("January 5, 2022"))} - ${formatDate(new Date("February 18, 2022"))}`,
        victories: 27,
        winnings: formatDollars(622800),
        notes: "This is fake data."
    }

    //Test 2
    //Second Test
    it('matches snapshot', () => {
        const { asFragment } = render(<PlayerData playerObject={playerObject2} />);
        expect(asFragment()).toMatchSnapshot();
    });
});