import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Type - inline as only one Type...
export type Val = 'rock' | 'paper' | 'scissors';

@Injectable({
  providedIn: 'root'
})
export class RpsService {
  // Added Router;
  constructor(private router: Router) { }

  // || VARIABLES 
  // Tracking Game Status
  gameStarted = false;
  // Tracking Player Score 
  playerScore: number = 0; 
  // Tracking CPU Score 
  cpuScore: number = 0; 
  // Tracking Player Choice 
  playerVal!: Val;
  // Tracking Generated CPU Choice 
  cpuVal!: Val;
  // Tracking Round Outcome
  roundResult = ''
  // Used to fire Player or CPU victory functions
  playerWins = null;
  // Array to Convert Player Input into String
  readonly moves: Val[] = ["rock", "paper", "scissors"];
  // Map Traversal to Determine Round Winner
  resultMap = {
    rock: {
      rock: { result: 'tie' },
      paper: { result: 'lose' },
      scissors: { result: 'win'}
    },
    paper: {
      rock: { result: 'win' },
      paper: { result: 'tie' },
      scissors: { result: 'lose' }
    },
    scissors: {
      rock: { result: 'lose' },
      paper: { result: 'win' },
      scissors: { result: 'tie' }
    }
  }

  // || Helper FUNCTIONS


  // || General FUNCTIONS 

  // Start Game
  startGame() {
    this.gameStarted = true;
  }

  // Refresh
  resetGame() {
    this.router.navigate(['/menu']);
    this.gameStarted = false;
  }

  // Get CPU Input
  getCpuOption() {
    return this.moves[Math.floor(Math.random() * 3)]
  }

  // playerVal set by GameComponent, then getWinner() triggered within GameComponent
  getWinner() {
    // Get Random cpuVal
    this.cpuVal = this.getCpuOption();
    // Traverse roundResult map
    this.roundResult = this.resultMap[this.playerVal][this.cpuVal].result;
    // Return values for consumption by GameComponent (temporary)
    return {
      roundResult: this.roundResult, 
      cpuVal: this.cpuVal
    };
  }
}


  // HistoryComponent Logic TO DO 
  // storeWinner(winnerVal) {
  // Sends winnerVal to HistoryComponent, pop into History array 
  // Iterate local playerScore or cpuScore values, get from service where needed in component (History)


  // || Deprecated FUNCTIONS 

  //  This refreshes entire page which is bad practice, will instead just route back to Menu and reset game variables as needed 
  // refreshGame() {
  //   location.reload();
  //   this.router.navigate(['./menu']);
  // }



