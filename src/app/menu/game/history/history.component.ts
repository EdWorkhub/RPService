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

  // Array to push BS values into 
  results: string[] = []

  // Test BS 
  // Subscribe to BS string obvs in Service
  ngOnInit() {
  // str is Service value, sets Local value to Service Value - can then be interpolated in template
    // this.rpsService.string$.subscribe(str => this.string = str)
    this.rpsService.string$.subscribe(str => {
      if (typeof str === 'string') {
      this.results.push(str);
      console.log(this.results);
      }
    });
  }
}
