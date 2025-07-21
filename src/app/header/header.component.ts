import { Component } from '@angular/core';
import { RpsService } from '../rps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private rpsService: RpsService) {}

  // Functions 
  onClickRefresh() {
    this.rpsService.resetGame();
  }

}
