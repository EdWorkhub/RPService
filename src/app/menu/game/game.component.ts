import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RpsService } from 'src/app/rps.service';
import { Val } from '../../rps.service'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  // Router allows navigation, rpsService allows access to service 
  constructor(private router: Router, private rpsService: RpsService) {}

  // Test BS 
  // BS String recipient 
  string: string = ''
  // Subscribe to BS string obvs in Service
  ngOnInit() {
    // fake route guard because real ones are way too complicated, big sad 
    if (this.rpsService.gameStarted === false) {
      this.router.navigate(['/menu']);
    }
    // str is Service value, sets Local value to Service Value - can be interpolated in template
    this.rpsService.string$.subscribe(str => this.string = str)
  }

  // || VARIABLES
  // Player Input (passed as string from HTML)
  playerVal!: Val 
  // Cpu Val (returned by Service)
  cpuVal!: Val
  // Result (returned by Service)
  result = '';
  // Boolean to trigger ngIf 
  roundComplete = false;
  // Sets buttons as disabled until @Output() from DisplayComponent recieved 
  disabled = false;

  // || General FUNCTIONS 

  // || onClick FUNCTIONS

  // On Click, navigates back to Menu 
  onMenu() {
    this.router.navigate(['/menu']);
  }

  // On Click, passes in playerVal option (string in HTML)
  onPlayerVal(playerVal: Val) {
    // Set playerVal in Service equal to Local playerVal from btn
    this.playerVal = playerVal;
    this.rpsService.playerVal = playerVal;
    // Create Local var to recieve Service cpuVal and Result (only to display locally for convenience prior to display and history components, removing in final version)
    let result = this.rpsService.getWinner();
    // Assign Local vars values of Service vars
    this.cpuVal = result.cpuVal;
    this.result = result.roundResult;
    // Set roundComplete boolean to True so that GameComponent triggers *ngIf only after one round has been run
    this.roundComplete = true;
    // Test BS 
    this.rpsService.refreshString();
  }

  // || Getter FUNCTIONS
  get gameStarted(): boolean {
    return this.rpsService.gameStarted;
  }

  // || Deprecated FUNCTIONS

  // When DisplayComponent returns done = true, disabled should = false
  buttonsDisabled(done: boolean) {
    this.disabled = done;
  }


}
