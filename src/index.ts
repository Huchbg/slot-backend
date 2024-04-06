import { gameConfig } from "../config/gameConfig";
import { SlotGame } from "./SlotGame";

const slotGame = new SlotGame(gameConfig, 2);

slotGame.spin();
slotGame.testNumOfTimes(100);
