import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RpsService } from '../rps.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor(private router: Router, private rpsService: RpsService) {}

  onStartGame() {
    this.rpsService.startGame();
    console.log(this.rpsService.gameStarted);
    this.router.navigate(['/game']);
  }

}
