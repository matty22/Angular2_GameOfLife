import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var canvas = document.getElementById("gameboard");
    var canvasWidth = 85;
    var canvasHeight = 50;
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 10, 10);
    ctx.strokeRect(0, 0, 10, 10);

    ctx.fillStyle = "pink";
    ctx.fillRect(10, 0, 10, 10);
    ctx.strokeRect(10, 0, 10, 10);
  }



}
