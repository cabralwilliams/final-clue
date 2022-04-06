import { render, cleanup, screen } from "@testing-library/react";
import { PlayerStats, soloLeadBy1, soloLeadTie, soloLeadCautious, soloLeadAggressive } from "..";

afterEach(cleanup);

describe("PlayerStats object", () => {
    const ps1 = new PlayerStats("Cabral Williams", "January 1, 2021", "March 15, 2021", 40, 1197800,"This is fake data.", "winBy1");
    
    test("formats runDates correctly", () => {
        expect(ps1.runDates).toEqual("Jan 01 2021 - Mar 15 2021");
    });

    test("formats winnings correctly", () => {
        expect(ps1.winnings).toEqual("$1,197,800");
    });
});

describe("soloLead functions", () => {
    const by1A = soloLeadBy1(20000,[12000,10000],false);
    //See if proper bet is made to win by 1 if not a runaway
    test("calculates the correct wager - non-runaway", () => {
        expect(by1A).toEqual(4001);
    });

    const by1B = soloLeadBy1(30000,[12000,10000],true);
    //See if proper bet is made to win by 1 if not a runaway
    test("calculates the correct wager - runaway", () => {
        expect(by1B).toEqual(5999);
    });

    const tieA = soloLeadTie(20000,[12000,10000],false);
    test("wagering for tie given no runaway", () => {
        expect(tieA).toBe(4000);
    });

    const tieB = soloLeadTie(30000,[12000,10000],true);
    test("wagering for tie given with runaway", () => {
        expect(tieB).toBe(6000);
    });

    const cautiousA = soloLeadCautious(20000,[12000,10000],false);
    test("catious wager in the proper range - no runaway", () => {
        expect(cautiousA).toBeGreaterThanOrEqual(0);
        expect(cautiousA).toBeLessThan(4000);
    });

    const cautiousB = soloLeadCautious(30000,[12000,10000],true);
    test("catious wager in the proper range - runaway", () => {
        expect(cautiousB).toBeGreaterThanOrEqual(0);
        expect(cautiousB).toBeLessThan(6000);
    });

    const aggressiveA = soloLeadAggressive(20000,[12000,10000],false);
    test("aggressive wager - non-runaway", () => {
        expect(aggressiveA).toBeGreaterThanOrEqual(4000);
        expect(aggressiveA).toBeLessThanOrEqual(20000);
    });

    const aggressiveB = soloLeadAggressive(30000,[12000,10000],false);
    test("aggressive wager - runaway", () => {
        expect(aggressiveB).toBeGreaterThanOrEqual(6000);
        expect(aggressiveB).toBeLessThanOrEqual(30000);
    });
})