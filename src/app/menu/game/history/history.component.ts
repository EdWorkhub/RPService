import { Component } from '@angular/core';
import { RpsService } from 'src/app/rps.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
    
  // Provides access to Service 
  constructor(private rpsService: RpsService) {}

  animationColor: 'green' | 'gray' | 'red' | null = null;

  // Array to push BS values into 
  results: string[] = []

  // Array for History Icons 
  animationHistory: ('green' | 'gray' | 'red')[] = []

    displayResult(val: string) {
    if (val === 'win') {
      this.animationColor = 'green';
      this.animationHistory.push(this.animationColor);
    } else if (val === 'tie') {
      this.animationColor = 'gray';
      this.animationHistory.push(this.animationColor);
    } else if (val === 'lose') {
      this.animationColor = 'red';
      this.animationHistory.push(this.animationColor);
    } else {
      this.animationColor = null;
    }
  }

  // Test BS 
  // Subscribe to BS string obvs in Service
  ngOnInit() {
  // str is Service value, sets Local value to Service Value - can then be interpolated in template
    // this.rpsService.string$.subscribe(str => this.string = str)
  this.rpsService.string$.subscribe(val => {
      this.displayResult(val);
      this.results.push(val);
    })
  }
}
