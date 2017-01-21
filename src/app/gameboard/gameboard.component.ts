import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {

  constructor() { }

// I need to get the variables up here so that they are public 
// But when I do that I get errors cause the JS runs before the canvas gets created. 
    
  ngAfterViewInit() {}  

  ngOnInit() {

    // Capture canvas DOM element and set default board size
    var canvas = <HTMLCanvasElement> document.getElementById("gameboard");
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
        ctx.strokeStyle="#5a5a5a";
        ctx.strokeRect(randomColumn * 10, randomRow * 10, 10, 10);
        aliveCells -= 1;
      }

      // Function to simulate generations of life
      function simulateLife(localAliveArray) {

        // This loop creates an array of all cells in the grid, and their X and Y coordinates
        // Array of arrays that looks like:
        // [[0, 0], [1, 0], [2, 0], ..., [83, 49], [84, 49]]
        var allCellsArray = [];
        for (var i = 0; i < canvasWidth * canvasHeight; i++) {
          var innerCellArray = [];
          innerCellArray.push(i % canvasWidth);
          innerCellArray.push(Math.floor(i / canvasWidth));
          allCellsArray.push(innerCellArray);
        }

        // I turned this array into a string, so that I could use it to compare in the next conditional below
        var localAliveArrayString = JSON.stringify(localAliveArray);
        for (var k = 0; k < allCellsArray.length; k++) {
          
          // Reset neighborCounter to 0 for each iteration of loop through all cells
          var neighborCounter : number = 0
          var xPos = allCellsArray[k][0];
          var yPos = allCellsArray[k][1];

          // Check to see if each cell in the grid is alive or dead
          // By referencing if it exists in the array of alive cells in localAliveArray
          // If the cell is alive
          if (localAliveArrayString.indexOf(JSON.stringify(allCellsArray[k])) >= 0) {
            for(var i = -1; i <= 1; i++) {
              for(var j = -1; j <= 1; j++) {
                // These loops determine if the cells around allCellsArray[k] are alive or dead
                // Take actions based on Game of Life rules for living cell
                if (localAliveArrayString.indexOf(JSON.stringify([xPos + i, yPos + j])) >= 0 ) {
                  neighborCounter += 1;
                } 
              }
            }
            if (neighborCounter < 2 || neighborCounter > 3) {
              // Kill this living cell because it has too few or too many neighbors
              ctx.fillStyle = "black";
              ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
              ctx.strokeStyle="#5a5a5a";
              ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
            }
          } else {    // If the cell is dead
            for(var i = -1; i <= 1; i++) {
              for(var j = -1; j <= 1; j++) {
                // These loops determine if the cells around allCellsArray are alive or dead
                // Take actions based on Game of Life rules for dead cell
                if (localAliveArrayString.indexOf(JSON.stringify([xPos + i, yPos + j])) >= 0 ) {
                  neighborCounter += 1;
                }
              }
            }
            if (neighborCounter === 3) {
              // Make this dead cell live because it has exactly 3 neighbors
              ctx.fillStyle = "green";
              ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
              ctx.strokeStyle="#5a5a5a";
              ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
            }
          }
        }
      }
      simulateLife(aliveArray);
    }
  }
  // // simulateLife needs to live here outside of ngOnInit
  // simulateLife() {
  //   var cellIsAlive : boolean;

  //       // This loop creates an array of all cells in the grid, and their X and Y coordinates
  //       // Array of arrays that looks like:
  //       // [[0, 0], [1, 0], [2, 0], ..., [83, 49], [84, 49]]
  //       var allCellsArray = [];
  //       for (var i = 0; i < canvasWidth * canvasHeight; i++) {
  //         var innerCellArray = [];
  //         innerCellArray.push(i % canvasWidth);
  //         innerCellArray.push(Math.floor(i / canvasWidth));
  //         allCellsArray.push(innerCellArray);
  //       }

  //       // I turned this array into a string, so that I could use it to compare in the next conditional below
  //       var localAliveArrayString = JSON.stringify(localAliveArray);
  //       for (var k = 0; k < allCellsArray.length; k++) {
          
  //         // Reset neighborCounter to 0 for each iteration of loop through all cells
  //         var neighborCounter : number = 0
  //         var xPos = allCellsArray[k][0];
  //         var yPos = allCellsArray[k][1];

  //         // Check to see if each cell in the grid is alive or dead
  //         // By referencing if it exists in the array of alive cells in localAliveArray
  //         // If the cell is alive
  //         if (localAliveArrayString.indexOf(JSON.stringify(allCellsArray[k])) >= 0) {
  //           for(var i = -1; i <= 1; i++) {
  //             for(var j = -1; j <= 1; j++) {
  //               // These loops determine if the cells around allCellsArray[k] are alive or dead
  //               // Take actions based on Game of Life rules for living cell
  //               if (localAliveArrayString.indexOf(JSON.stringify([xPos + i, yPos + j])) >= 0 ) {
  //                 neighborCounter += 1;
  //               } 
  //             }
  //           }
  //           if (neighborCounter < 2 || neighborCounter > 3) {
  //             // Kill this living cell because it has too few or too many neighbors
  //             ctx.fillStyle = "black";
  //             ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
  //             ctx.strokeStyle="#5a5a5a";
  //             ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
  //           }
  //         } else {    // If the cell is dead
  //           for(var i = -1; i <= 1; i++) {
  //             for(var j = -1; j <= 1; j++) {
  //               // These loops determine if the cells around allCellsArray are alive or dead
  //               // Take actions based on Game of Life rules for dead cell
  //               if (localAliveArrayString.indexOf(JSON.stringify([xPos + i, yPos + j])) >= 0 ) {
  //                 neighborCounter += 1;
  //               }
  //             }
  //           }
  //           if (neighborCounter === 3) {
  //             // Make this dead cell live because it has exactly 3 neighbors
  //             ctx.fillStyle = "green";
  //             ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
  //             ctx.strokeStyle="#5a5a5a";
  //             ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
  //           }
  //         }
  //       }
  //     }
  }
