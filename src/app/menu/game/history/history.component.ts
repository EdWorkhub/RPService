import { Component } from '@angular/core';
import { RpsService } from 'src/app/rps.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
    
  constructor(private rpsService: RpsService) {}

  // Test BS 
  // BS String recipient 
  string: string = ''
  // Subscribe to BS string obvs in Service
  ngOnInit() {
  // str is Service value, sets Local value to Service Value - can then be interpolated in template
    this.rpsService.string$.subscribe(str => this.string = str)
  }

}
