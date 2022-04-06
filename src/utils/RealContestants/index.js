import { ComputerPlayer, RealPlayer } from "../Jeopardy";

//Composite Players
export const KEN_JENNINGS_FIRST_RUN = new ComputerPlayer("Ken Jennings",31100,7700,false,0.68);
export const BRAD_RUTTER_FIRST_RUN = new ComputerPlayer("Brad Rutter",11700,2900,true,0.6);
export const JAMES_HOLZHAUER_FIRST_RUN = new ComputerPlayer("James Holzhauer",47700,27900,false,0.97);
export const MATT_AMODIO_FIRST_RUN = new ComputerPlayer("Matt Amodio",33300,12500,false,0.74);
export const AMY_SCHNEIDER_FIRST_RUN = new ComputerPlayer("Amy Schneider", 30100,12700,false,0.68);
export const JULIA_COLLINS_FIRST_RUN = new ComputerPlayer("Julia Collins", 19500,5000,false,0.62);
export const JASON_ZUFFRANIERI_FIRST_RUN = new ComputerPlayer("Jason Zuffranieri",27200,5600,false,0.55);
export const DAVID_MADDEN_FIRST_RUN = new ComputerPlayer("David Madden", 20200,3500,false,0.7);
export const ROGER_CRAIG_FIRST_RUN = new ComputerPlayer("Roger Craig", 29800,9500,false,0.57);
export const LARISSA_KELLY_FIRST_RUN = new ComputerPlayer("Larissa Kelly", 21100,10900,false,1);
export const MATT_JACKSON_FIRST_RUN = new ComputerPlayer("Matt Jackson", 30500,6300,false,0.57);

//May 16, 2014
export const BRAD_RUTTER_MAY_16_2014 = new RealPlayer("Brad Rutter", 11800,0,false,1,["James Buchanan","Condoleeza Rice"],true);
export const KEN_JENNINGS_MAY_16_2014 = new RealPlayer("Ken Jennings", 13600,13001,false,0,["James Buchanan","Madeleine Albright"],false);
export const ROGER_CRAIG_MAY_16_2014 = new RealPlayer("Roger Craig", 2000,2000,false,1,["James Buchanan","Condoleeza Rice"],true);

//June 26, 2014
export const JENNIFER_BLANTON_JUNE_26_2014 = new RealPlayer("Jennifer Blanton", 19300,700,false,0,[""],false);
export const ARI_VOUKYDIS_JUNE_26_2014 = new RealPlayer("Ari Voukydis",8800,2700,false,0,["This handsome gentleman"],false);
export const PATTI_YOUNGBLOOD_JUNE_26_2014 = new RealPlayer("Patti Youngblood",3000,2500,false,0,["Andrew Carnegie"],false);