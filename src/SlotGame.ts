import { GameConfig } from "../config/gameConfig";

export class SlotGame {
  private reelsCount: number;
  private rowsCount: number;
  private symbols: Record<number, number[]>;
  private lines: number[][];
  private reels: number[][];
  private betAmount: number;

  constructor(config: GameConfig, betAmount: number) {
    this.reelsCount = config.reelsCount;
    this.rowsCount = config.rowsCount;
    this.symbols = config.symbols;
    this.lines = config.lines;
    this.reels = config.reels;
    this.betAmount = betAmount;
  }

  spin(): number {
    console.log(
      "--------------------------------------------------------------------------------"
    );
    const reelsPositions: number[] = [];
    const symbolsOnScreen: number[][] = [];
    const linesPayout: number[] = [];

    for (let i = 0; i < this.reelsCount; i++) {
      const reelLength = this.reels[i].length;
      const randomIndex = Math.floor(
        Math.random() * (reelLength - this.rowsCount + 1)
      );
      reelsPositions.push(randomIndex);
      symbolsOnScreen.push(
        this.reels[i].slice(randomIndex, randomIndex + this.rowsCount)
      );
    }

    console.log("Reels position:", reelsPositions);
    console.log("Symbols on screen", symbolsOnScreen);

    let totalWin = 0;

    for (const line of this.lines) {
      console.log("Line", line);
      const lineSymbols: number[] = [];
      let linePayout = 0;

      for (let i = 0; i < this.reelsCount; i++) {
        lineSymbols.push(symbolsOnScreen[i][line[i]]);
      }
      console.log("Line symbols:", lineSymbols);

      const symbolCounts: Record<number, number> = {};
      for (const symbol of lineSymbols) {
        symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
      }

      for (const symbol in symbolCounts) {
        linePayout += this.symbols[Number(symbol)][symbolCounts[symbol] - 1];
      }

      console.log("Line payout:", linePayout);

      linesPayout.push(linePayout);
    }

    console.log("Lines payout:", linesPayout);

    //This here is just some of my testing as it curently is
    //I dont have an idea how such a thing is calculated
    totalWin =
      (linesPayout.reduce((acc, curr) => acc + curr, 0) * this.betAmount) / 30;
    console.log("Total win:", totalWin);

    return totalWin;
  }

  testNumOfTimes(num: number): void {
    if (num < 0) {
      console.log("Number should be > 0");
      return;
    }

    let totalBettedAmount = 0;
    let totalWin = 0;

    for (let i = 0; i < num; i++) {
      totalWin += this.spin();
      totalBettedAmount += this.betAmount;
    }

    console.log("Total bet amount:", totalBettedAmount);
    console.log("Total win after", num, "spins:", totalWin);
  }
}
