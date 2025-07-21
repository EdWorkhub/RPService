import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Input() roundResult: string = ''
  @Output() done = new EventEmitter<boolean>(false) 

  setAsDone() {
    if(this.roundResult != '') {
      this.done.emit(true);
    }
    this.roundResult = '';
  }

}
