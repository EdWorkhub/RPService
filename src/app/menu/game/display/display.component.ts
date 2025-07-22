import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges, AfterViewChecked {
  // Input to recieve win status from GameComponent
  @Input() roundResult: string = '';
  // Output to trigger disabled / enabled button status in Game Component 
  @Output() done = new EventEmitter<boolean>() ;
  // Experiment to make ngOnChanges more consistent on rapid change cycles (pressing input button over and over...)
  readyToEmit = false;


  // Angular Change Detection: creates an object called "changes" of Type SimpleChanges - this tracks CurrentValue, PreviousValue and FirstChange (if first time val has changed)
  ngOnChanges(changes: SimpleChanges) {
    // roundResult init as empty string, when val updates triggers. Guard against being triggered prior to valid roundResult 
    if (changes['roundResult'] && this.roundResult !== '') {
      this.readyToEmit = true;
    }
  }

  // ngAfterViewChecked = Pre-Reqs Wrapper
  ngAfterViewChecked(): void {
    // If ngOnChanges is done...
    if (this.readyToEmit) {
      // Then emit "done"=true to tell GameComponent that we are finished processing 
      this.done.emit(true);
      // Change trigger property to false to prepare for next input
      this.readyToEmit = false;
    }
  }
}
