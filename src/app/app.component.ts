import { Component } from '@angular/core';
import { GameboardComponent } from './gameboard/gameboard.component';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Matt\'s Game of Life';
}
