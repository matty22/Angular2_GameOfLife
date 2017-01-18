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
      
      // This loop creates an array of all cells in the grid, and their X and Y coordinates
      var allCellsArray = []; // Array of all cells living and dead
      for (var i = 0; i < canvasWidth * canvasHeight; i++) {
        var innerCellArray = [];
        innerCellArray.push(i % canvasWidth);
        innerCellArray.push(Math.floor(i / canvasWidth));
        allCellsArray.push(innerCellArray);
      }
      
      // This block creates an array of X, Y coordinates for living cells only
      var aliveCells:number = (width * height) * 0.20;
      var aliveArray = [];
      while (aliveCells > 0) {
        var randomCellNumber:number = 0;
        var randomRow:number;
        var randomColumn:number;
        var cellArray = [];

        randomCellNumber = (Math.floor(Math.random() * 4251));
        randomRow = Math.floor(randomCellNumber / 85);
        randomColumn = randomCellNumber % 85;
        cellArray.push(randomColumn)
        cellArray.push(randomRow);
        aliveArray.push(cellArray);
        ctx.fillStyle = "red";
        ctx.fillRect(randomColumn * 10, randomRow * 10, 10, 10);
        aliveCells -= 1;
      } 
    }
  }

  simulateLife() {
    var xPos = 0;  // X position of cell
    var yPos = 0;  // Y position of cell
    var neighborCounter = 0 // Number of living neighbors to this cell

    for(var i = -1; i <= 1; i++){
	    for(var j = -1; j <= 1; j++){
        // Do indexOf the X, Y combo here and see if it is in the aliveCells array
        // If so, use these loops to figure out if the cells around it are alive or dead
        // Take actions based on Game of Life rules
      }
    }

  }
  



}
