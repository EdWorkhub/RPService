import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RpsService } from 'src/app/rps.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  constructor(private rpsService: RpsService) {}

  // Inline Type Used for Win / Loss animation logic 
  animationColor: 'green' | 'gray' | 'red' | null = 'green';

  // Output to trigger disabled / enabled button status in Game Component 
  @Output() done = new EventEmitter<boolean>() ;

  /* Attempting to dynamically handle @Output() values without an explicit trigger
  (i.e in response to a change from a parent component rather than in response to onClick) 
  is very challenging / impossible without Angular Change Detection (ie ngOnChanges() or ngDoCheck())
  Essentially need logic that fires on each time Input is updated (regardless of last Input condition) 
  */

  // Using Setter Input allows logic to be run directly against @Input() hook as soon as it is made available to Component 
  // Backing property used to intercept roundResult setter and store 
  private _roundResult!: string

  @Input() set roundResult(value: string) {
    this._roundResult = value;
    if (value === 'win') {
      // this.done.emit(true);
    } else if (value === 'tie') {
      // this.done.emit(false);
    } else if (value === 'lose') {
      // this.done.emit(false);
    }
  }

  // Getter for roundResult backing value
  get roundResult(): string {
    return this._roundResult;
  }

  // || General FUNCTIONS 

  displayResult(val: string) {
    if (val === 'win') {
      this.animationColor = 'green';
    } else if (val === 'tie') {
      this.animationColor = 'gray';
    } else if (val === 'lose') {
      this.animationColor = 'red';
    } else {
      this.animationColor = null;
    }
  }

  ngOnInit() {
  // str is Service value, sets Local value to Service Value - can be interpolated in template
    this.rpsService.string$.subscribe(val => {
      this.displayResult(val)
    })
  }

  //   this.rpsService.string$.subscribe(str => this.string = str)
  // }

  // || Deprecated FUNCTIONS 

  // Attempt to use Angular Change Detection to check for changes object in

  // // Angular Change Detection: creates an object called "changes" of Type SimpleChanges - this tracks CurrentValue, PreviousValue and FirstChange (if first time val has changed)
  // ngOnChanges(changes: SimpleChanges) {
  //   // roundResult init as empty string, when val updates triggers. Guard against being triggered prior to valid roundResult 
  //   if (changes['roundResult'] && this.roundResult !== '') {
  //     this.readyToEmit = true;
  //   }
  // }

  // // ngAfterViewChecked = Pre-Reqs Wrapper
  // ngAfterViewChecked(): void {
  //   // If ngOnChanges is done...
  //   if (this.readyToEmit) {
  //     // Then emit "done"=true to tell GameComponent that we are finished processing 
  //     this.done.emit(true);
  //     // Change trigger property to false to prepare for next input
  //     this.readyToEmit = false;
  //   }
  // }
}
