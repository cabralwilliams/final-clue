import { EUROPEAN_SCIENCE_INDUSTRY_CHOICES, FALSE_US_PRESIDENTS, FinalJeopardy, PRESIDENTS, SECRETARIES_OF_STATE } from "../Data";

export const MAY_16_2014 = new FinalJeopardy(
    "Serving 160 years apart, these 2 Secretaries of State are the only ones who never married",
    "Secretaries of State",
    ["James Buchanan","Condoleeza Rice"],
    SECRETARIES_OF_STATE,
    true,
    true,
    new Date("May 16, 2014"),
    false,
    "This clue was the last Final Jeopardy clue of the Battle of the Decades tournament held in 2014.  The contestants were Brad Rutter, Ken Jennings, and Roger Craig."
);

MAY_16_2014.addToResponses(Object.values(PRESIDENTS));
MAY_16_2014.addToResponses(FALSE_US_PRESIDENTS);

//Add more answers here
export const JUNE_26_2014 = new FinalJeopardy(
    "In 1891 this European said, 'Perhaps my factories will put an end to war sooner than your congresses",
    "Science & Industry",
    ["Alfred Nobel"],
    EUROPEAN_SCIENCE_INDUSTRY_CHOICES,
    true,
    true,
    new Date("June 26, 2014"),
    true,
    ""
);