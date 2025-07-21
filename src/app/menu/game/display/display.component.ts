import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnChanges {
  @Input() roundResult: string = ''
  @Output() done = new EventEmitter<boolean>() 

  ngOnChanges(changes: SimpleChanges) {
    if (changes['roundResult'] && this.roundResult !== '') {
      this.setAsDone();
    }
  }

  setAsDone() {
    this.done.emit(true);
    this.roundResult = '';
  }

}
