import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  constructor() { }

  
    
    

  ngOnInit() {

    // Capture canvas DOM element and set default board size
    var canvas = document.getElementById("gameboard");
    var canvasWidth:number = 85;
    var canvasHeight:number = 50;
    var ctx = canvas.getContext("2d");

    // Execute building board and creating first generation of alive cells
    if(ctx) {
     buildBoard();
     firstGeneration(canvasWidth, canvasHeight);
    } else {
      console.log("ctx has no value");
    }

    // Function definitions

    // Build the game board
    function buildBoard() {
      for (var j = 0; j < canvasHeight; j++) {
        for (var i = 0; i < canvasWidth; i++) {
          ctx.fillStyle = "black";
          ctx.fillRect(i * 10, j * 10, 10, 10);
          ctx.strokeStyle="#5a5a5a";
          ctx.strokeRect(i * 10, j * 10, 10, 10);
        }
      }
    }
 

    // Randomly generate 20% of all cells and make them alive
    function firstGeneration(width, height) {
      var aliveCells:number = (width * height) * 0.20;
      while (aliveCells > 0) {
        var randomCellNumber:number = 0;
        var randomRow:number;
        var randomColumn:number;

        randomCellNumber = (Math.floor(Math.random() * 4251));
        randomRow = Math.ceil(randomCellNumber / 85);
        randomColumn = randomCellNumber % 85;
        ctx.fillStyle = "red";
        ctx.fillRect(randomColumn * 10, randomRow * 10, 10, 10);
        aliveCells -= 1;
      } 
    }
  }

  
  



}
