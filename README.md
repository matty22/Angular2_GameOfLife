# Game of Life

Conway's Game of Life is a simulation of a mathematical evolution from an initial state of 'cells' on a grid. A cell can be either 'dead'
or 'alive' and in each generation of the game, a cell will determine its state based on the state of the cells around it. [This wikipedia
article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) describes the rules of the Game of Life.

## To Use

The Game of Life is a 'zero-player' game meaning the user's interaction with the basic rules of the game is very minimal. In this version,
the user can pause the game, clear the board, and re-randomize the initial seeding of the board to watch the evolution of life start over
again.

## Contributing

This project has open issues. Development is based on the development branch. To contribute, follow these steps:

* `git clone https://github.com/matty22/Angular2_GameOfLife.git`
* `git checkout development`
* `git checkout -b issue-label/reference-to-issue` (ex. bug/fix-grammar-error)

Make your changes in your local copy...

* `git add [filename].ext`
* `git commit -m "Concise message that explains your changes"`
* `git checkout development`
* `git pull`
* `git checkout fix/my-branch`
* `git merge development`
* `git push origin fix/my-branch`

Then, open a PR on the development branch on the repo.

For questions, read these three blog posts for guidelines on how to contribute:
* "How to not f- up your local files with Git [Part 1](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c), [Part 2](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-2-fc4e243be02a), and [Part 3](https://medium.com/chingu/how-to-not-f-up-your-local-files-with-git-part-3-bf03b27b6e64)"


# Angular CLI commands

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
