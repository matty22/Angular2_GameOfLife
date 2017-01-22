import { Component, OnInit, AfterViewChecked, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'gameboard',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, AfterViewChecked {

  canvasHeight: number;
  canvasWidth: number;
  canvas: any;
  ctx: any;
  localAliveArray;

  // @P1xt - Here I'm setting up change detection, and having the DOM check for changes every 3 seconds.
  // The problem, I think, is with how I'm handling change detection/updating canvas
  constructor(private ref: ChangeDetectorRef) { 
    var numberOfGenerations: number = 0;
    setInterval(function() {
        numberOfGenerations++;
        ref.markForCheck();
    }, 1000);
    
  }

  ngOnInit() {

    // Capture canvas DOM element and set default board size
    this.canvas = <HTMLCanvasElement> document.getElementById("gameboard");
    this.canvasWidth = 85;
    this.canvasHeight = 50;
    this.ctx = this.canvas.getContext("2d");
    this.buildBoard();
    this.firstGeneration(this.canvasWidth, this.canvasHeight);
  }

// @P1xt - This console.log is printing to the console every 3 seconds, so I know that this code is running every 3 seconds due to
// the setInterval above in the constructor, but my canvas isn't updating even though the function
// simulateLife() does write new cells to the canvas if I just stick it in the ngOnInit hook
ngAfterViewChecked() {
     this.simulateLife();
     //console.log("This is running multiple times?");
}
      
      
      // Function definitions

      // Build the game board upon page load
      buildBoard() {
        for (var j = 0; j < this.canvasHeight; j++) {
          for (var i = 0; i < this.canvasWidth; i++) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(i * 10, j * 10, 10, 10);
            this.ctx.strokeStyle="#5a5a5a";
            this.ctx.strokeRect(i * 10, j * 10, 10, 10);
          }
        }
      }

      // Randomly generate 20% of all cells and make them alive upon page load
      firstGeneration(width, height) {
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
          this.ctx.fillStyle = "red";
          this.ctx.fillRect(randomColumn * 10, randomRow * 10, 10, 10);
          this.ctx.strokeStyle="#5a5a5a";
          this.ctx.strokeRect(randomColumn * 10, randomRow * 10, 10, 10);
          aliveCells -= 1;
        }
        this.localAliveArray = aliveArray;
      }

     // Function to simulate generations of life
      simulateLife() {
        // This loop creates an array of all cells in the grid, and their X and Y coordinates
        // Array of arrays that looks like:
        // [[0, 0], [1, 0], [2, 0], ..., [83, 49], [84, 49]]
        console.log(this.localAliveArray);
        var allCellsArray = [];
        var changedAliveArray = this.localAliveArray;
        for (var i = 0; i < this.canvasWidth * this.canvasHeight; i++) {
          var innerCellArray = [];
          innerCellArray.push(i % this.canvasWidth);
          innerCellArray.push(Math.floor(i / this.canvasWidth));
          allCellsArray.push(innerCellArray);
        }

        // I turned this array into a string, so that I could use it to compare in the next conditional below
        var localAliveArrayString = JSON.stringify(this.localAliveArray);
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
              var index = changedAliveArray.indexOf(allCellsArray[k]);
              changedAliveArray.splice(index, 1);
              this.ctx.fillStyle = "black";
              this.ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
              this.ctx.strokeStyle="#5a5a5a";
              this.ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
            }
          } else {    // If the cell is dead
            for(var i = -1; i <= 1; i++) {
              for(var j = -1; j <= 1; j++) {
                // These loops determine if the cells around allCellsArray[k] are alive or dead
                // Take actions based on Game of Life rules for dead cell
                if (localAliveArrayString.indexOf(JSON.stringify([xPos + i, yPos + j])) >= 0 ) {
                  neighborCounter += 1;
                }
              }
            }
            if (neighborCounter === 3) {
              // Make this dead cell live because it has exactly 3 neighbors
              changedAliveArray.push(allCellsArray[k]);
              this.ctx.fillStyle = "green";
              this.ctx.fillRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
              this.ctx.strokeStyle="#5a5a5a";
              this.ctx.strokeRect(allCellsArray[k][0] * 10, allCellsArray[k][1] * 10, 10, 10);
            }
          }
        }
        // Set localAliveArray equal to the new array of living cells created in each generation
        this.localAliveArray = changedAliveArray;
      }
  }
  
