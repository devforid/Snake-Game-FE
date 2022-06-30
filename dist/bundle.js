/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__painter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snake__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__food__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__level__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__enemy__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__score__ = __webpack_require__(8);







var canvas = document.getElementById('mycanvas');
var startButton = document.getElementById('start-btn');
var highestScoreParagraph = document.getElementById('highest-score');
startButton.addEventListener("click", function () {
    init();
});
var gameLoop;
function init() {
    startButton.setAttribute('disabled', true);
    var painter = new __WEBPACK_IMPORTED_MODULE_0__painter__["a" /* Painter */](canvas);
    var snakeSize = 5;
    var snake = new __WEBPACK_IMPORTED_MODULE_2__snake__["a" /* Snake */](snakeSize, 'green', 'darkgreen');
    var enemy = new __WEBPACK_IMPORTED_MODULE_5__enemy__["a" /* Enemy */](1, snake);
    var food = new __WEBPACK_IMPORTED_MODULE_3__food__["a" /* Food */](enemy);
    var gameScore = 0;
    var numebrOfFoodEat = 0;
    var level = new __WEBPACK_IMPORTED_MODULE_4__level__["a" /* Level */](1, 150, 0);
    var board = new __WEBPACK_IMPORTED_MODULE_1__board__["a" /* Board */](painter, snake, food, 500, 500, 10, enemy);
    enemy.createEnemies(level.level);
    var score = new __WEBPACK_IMPORTED_MODULE_6__score__["a" /* Score */]();
    var highestScore = score.getScore();
    score.showScore(highestScoreParagraph);
    board.init();
    var inervalCallback;
    var tempEnemyExistOnBoard = false;
    function runGame(snakeSpeed) {
        inervalCallback = setInterval(function () {
            board.init();
            snake.move();
            if (board.checkBoundary() || snake.checkCollision()) {
                clearInterval(inervalCallback);
                score.setScore(gameScore);
                alert("Game over!! Your score is " + gameScore);
            }
            if (snake.eatFood(food.position)) {
                gameScore += 10;
                snakeSize += 1;
                numebrOfFoodEat++;
                snake.increaseSnakeSize(snakeSize);
                food.createFood();
            }
            if (level.isComepleteLevel(4, numebrOfFoodEat)) {
                clearInterval(inervalCallback);
                level.gotoNextLevel(level.level, numebrOfFoodEat);
                gameScore += level.bonusPoint;
                score.setScore(gameScore);
                alert("Game over!! Your score is " + gameScore);
            }
            else {
                if (level.isComepleteLevel(level.level, numebrOfFoodEat)) {
                    level.gotoNextLevel(level.level, numebrOfFoodEat);
                    snake.createSnake(snakeSize);
                    enemy.createEnemies(level.level);
                    enemy.createTemporaryEnemy();
                    snake.changeDirection(40, true);
                    tempEnemyExistOnBoard = true;
                    alert("Congratulations!! Level " + (level.level - 1) + " comeplete. Got bonus " + level.bonusPoint);
                    gameScore += level.bonusPoint;
                    setSnakeSpeed(level.snakeSpeed);
                    enemy.createEnemies(level.level);
                }
            }
            if (gameScore >= 20 && !tempEnemyExistOnBoard) {
                enemy.createTemporaryEnemy();
                tempEnemyExistOnBoard = true;
            }
            if (enemy.isTouchEnemyCell(level.level)) {
                clearInterval(inervalCallback);
                board.init();
                score.setScore(gameScore);
                alert("Game over!! Your score is " + gameScore);
            }
            if (tempEnemyExistOnBoard && enemy.isTouchTempEnemyCell()) {
                gameScore = gameScore >= 20 ? gameScore - 20 : 0;
                alert("NO!! You lost 20 points!!!");
                enemy.destroyTempEnimyCell();
                tempEnemyExistOnBoard = false;
            }
            if (gameScore > highestScore) {
                score.setScore(gameScore);
                score.showScore(highestScoreParagraph);
            }
            document.onkeydown = function (event) {
                var keyCode = event.keyCode;
                snake.changeDirection(keyCode, false);
            };
            board.drawSnake();
            board.drawFood();
            board.drawScore(gameScore);
            board.drawEnemies();
            if (tempEnemyExistOnBoard) {
                board.drawTempEnemies();
            }
        }, snakeSpeed);
    }
    gameLoop = runGame(level.snakeSpeed);
    function setSnakeSpeed(snakeSpeed) {
        clearInterval(inervalCallback);
        runGame(snakeSpeed);
    }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Painter; });
var Painter = /** @class */ (function () {
    function Painter(_canvas) {
        this.canvas = _canvas;
        this.context = _canvas.getContext('2d');
    }
    Painter.prototype.fillArea = function (x1, y1, x2, y2, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x1, y1, x2, y2);
    };
    Painter.prototype.strokeArea = function (x1, y1, x2, y2, color) {
        this.context.strokeStyle = color;
        this.context.strokeRect(x1, y1, x2, y2);
    };
    return Painter;
}());



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Board; });
var Board = /** @class */ (function () {
    function Board(painter, snake, food, h, w, s, enemy) {
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
        this.enemy = enemy;
    }
    Board.prototype.drawSnake = function () {
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if (i == 0) {
                this.drawSnakeCell(cell.x, cell.y, true);
            }
            else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }
        }
    };
    Board.prototype.drawSnakeCell = function (x, y, isHead) {
        if (isHead) {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "red");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
        else {
            this.painter.fillArea(x * this.size, y * this.size, this.size, this.size, "green");
            this.painter.strokeArea(x * this.size, y * this.size, this.size, this.size, "darkgreen");
        }
    };
    Board.prototype.drawFood = function () {
        this.painter.fillArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "blue");
        this.painter.strokeArea(this.food.position.x * this.size, this.food.position.y * this.size, this.size, this.size, "yellow");
    };
    Board.prototype.drawScore = function (score) {
        var scoreText = "Score " + score;
        this.painter.context.fillText(scoreText, 440, 15);
    };
    Board.prototype.checkBoundary = function () {
        return this.snake.checkBoundary(-1, this.width / this.size, -1, this.height / this.size);
    };
    Board.prototype.changeSnakeSize = function (_length) {
        this.snake.increaseSnakeSize(_length);
    };
    Board.prototype.drawEnemies = function () {
        for (var i = 0; i < this.enemy.enemyCell.length; i++) {
            var cellPosition = this.enemy.enemyCell[i];
            this.painter.fillArea(cellPosition.x * this.size, cellPosition.y * this.size, this.size, this.size, "black");
            this.painter.strokeArea(cellPosition.x * this.size, cellPosition.y * this.size, this.size, this.size, "red");
        }
    };
    Board.prototype.drawTempEnemies = function () {
        for (var i = 0; i < this.enemy.tempEnemyCell.length; i++) {
            var cellPosition = this.enemy.tempEnemyCell[i];
            this.painter.fillArea(cellPosition.x * this.size, cellPosition.y * this.size, this.size, this.size, "pink");
            this.painter.strokeArea(cellPosition.x * this.size, cellPosition.y * this.size, this.size, this.size, "red");
        }
    };
    Board.prototype.init = function () {
        this.painter.fillArea(0, 0, this.width, this.height, "lightgrey");
        this.painter.strokeArea(0, 0, this.width, this.height, "black");
    };
    return Board;
}());



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Snake; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums_direction__ = __webpack_require__(4);

var Snake = /** @class */ (function () {
    function Snake(_length, _bodyColor, _borderColor) {
        this.cells = [];
        this.length = _length;
        this.bodyColor = _bodyColor;
        this.borderColor = _borderColor;
        this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
        this.createSnake(this.length);
        // for(let i=0;i<_length;i++){
        //     this.cells.push({x: i, y: 0});
        // }
    }
    Snake.prototype.createSnake = function (_length) {
        this.cells = [];
        // this.cells.push({x: 0, y: 1});
        for (var i = 0; i < _length; i++) {
            this.cells.push({ x: i, y: 0 });
        }
    };
    Snake.prototype.increaseSnakeSize = function (_length) {
        var newCell = {
            x: this.cells[_length - 2].x,
            y: this.cells[_length - 2].y + 1
        };
        this.cells.push(newCell);
    };
    Snake.prototype.changeDirection = function (keyCode, isInitiatDirection) {
        switch (keyCode) {
            case 37:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left;
                }
                if (isInitiatDirection) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left;
                }
                break;
            case 39:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right;
                }
                if (isInitiatDirection) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right;
                }
                break;
            case 38:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up;
                }
                if (isInitiatDirection) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up;
                }
                break;
            case 40:
                if (this.direction != __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
                }
                if (isInitiatDirection) {
                    this.direction = __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down;
                }
                break;
        }
    };
    Snake.prototype.move = function () {
        var snakeX = this.cells[0].x;
        var snakeY = this.cells[0].y;
        if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Right) {
            snakeX++;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Left) {
            snakeX--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Up) {
            snakeY--;
        }
        else if (this.direction == __WEBPACK_IMPORTED_MODULE_0__enums_direction__["a" /* Direction */].Down) {
            snakeY++;
        }
        this.cells.pop();
        this.cells.unshift({ x: snakeX, y: snakeY });
    };
    Snake.prototype.eatFood = function (food) {
        var head = this.cells[0];
        if (food.x == head.x && food.y == head.y) {
            return true;
        }
        else {
            return false;
        }
    };
    Snake.prototype.checkCollision = function () {
        var x = this.cells[0].x;
        var y = this.cells[0].y;
        for (var i = 1; i < this.cells.length; i++) {
            var cell = this.cells[i];
            if (cell.x === x && cell.y === y)
                return true;
        }
        return false;
    };
    Snake.prototype.checkBoundary = function (bx1, bx2, by1, by2) {
        var firstCell = this.cells[0];
        if (firstCell.x == bx1 || firstCell.y == by1 || firstCell.x == bx2 || firstCell.y == by2) {
            return true;
        }
        else {
            return false;
        }
    };
    return Snake;
}());



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Direction; });
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Food; });
var Food = /** @class */ (function () {
    function Food(_enemy) {
        this.enemy = _enemy;
        this.createFood();
    }
    Food.prototype.createFood = function () {
        var foodCell = this.generateFoodCell();
        while (this.enemy.enemyCell.length && this.isExistOnEnemyCell(foodCell)) {
            foodCell = this.generateFoodCell();
        }
        this.position = foodCell;
    };
    Food.prototype.isExistOnEnemyCell = function (foodCell) {
        for (var i = 0; i < this.enemy.enemyCell.length; i++) {
            if (foodCell.x == this.enemy.enemyCell[i].x || foodCell.y == this.enemy.enemyCell[i].y) {
                return true;
            }
        }
        return false;
    };
    Food.prototype.generateFoodCell = function () {
        var positionOfFood = {
            x: Math.floor(Math.random() * 45),
            y: Math.floor(Math.random() * 45)
        };
        return positionOfFood;
    };
    return Food;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Level; });
var Level = /** @class */ (function () {
    function Level(_level, _speed, _bonusPoint) {
        this.level = _level;
        this.snakeSpeed = _speed;
        this.bonusPoint = _bonusPoint;
    }
    Level.prototype.isComepleteLevel = function (level, numberOfFood) {
        if (level == 1 && numberOfFood == 5)
            return true;
        if (level == 2 && numberOfFood == 10)
            return true;
        if (level == 3 && numberOfFood == 15)
            return true;
        if (level == 4 && numberOfFood == 20)
            return true;
        return false;
    };
    Level.prototype.gotoNextLevel = function (level, numberOfFood) {
        switch (level) {
            case 1:
                if (numberOfFood == 5) {
                    this.level++;
                    this.snakeSpeed -= 50;
                    this.bonusPoint = 100;
                }
                break;
            case 2:
                if (numberOfFood == 10) {
                    this.level++;
                    this.snakeSpeed -= 50;
                    this.bonusPoint = 300;
                }
                break;
            case 3:
                if (numberOfFood == 15) {
                    this.level++;
                    this.snakeSpeed -= 25;
                    this.bonusPoint = 500;
                }
                break;
            case 4:
                if (numberOfFood == 20) {
                    this.level++;
                    this.snakeSpeed -= 10;
                    this.bonusPoint = 1000;
                }
                break;
        }
    };
    return Level;
}());



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Enemy; });
var Enemy = /** @class */ (function () {
    function Enemy(_level, snake) {
        this.level = _level;
        this.snake = snake;
        this.createEnemies(this.level);
    }
    Enemy.prototype.isTouchEnemyCell = function (level) {
        for (var i = 0; i < this.enemyCell.length; i++) {
            if (this.snake.cells[0].x == this.enemyCell[i].x && this.snake.cells[0].y == this.enemyCell[i].y) {
                return true;
            }
        }
        return false;
    };
    Enemy.prototype.isTouchTempEnemyCell = function () {
        for (var i = 0; i < this.tempEnemyCell.length; i++) {
            if (this.snake.cells[0].x == this.tempEnemyCell[i].x && this.snake.cells[0].y == this.tempEnemyCell[i].y) {
                return true;
            }
        }
        return false;
    };
    Enemy.prototype.createEnemies = function (level) {
        this.enemyCell = [];
        for (var i = 0; i < level * level + 2; i++) {
            this.enemyCell.push(this.getEnemyCell());
        }
    };
    Enemy.prototype.createTemporaryEnemy = function () {
        this.tempEnemyCell = [];
        this.tempEnemyCell.push(this.getEnemyCell());
    };
    Enemy.prototype.destroyTempEnimyCell = function () {
        this.tempEnemyCell = [];
    };
    Enemy.prototype.getEnemyCell = function () {
        var enemyCell = this.generateEnemyCell();
        while (this.isASnakeCell(enemyCell)) {
            enemyCell = this.generateEnemyCell();
        }
        return enemyCell;
    };
    Enemy.prototype.isASnakeCell = function (cell) {
        for (var i = 0; i < this.snake.cells.length; i++) {
            if (cell.x == this.snake.cells[i].x || cell.y == this.snake.cells[i].y) {
                return true;
            }
        }
        return false;
    };
    Enemy.prototype.generateEnemyCell = function () {
        var positionOfEnemy = {
            x: Math.floor(Math.random() * 45),
            y: Math.floor(Math.random() * 45)
        };
        return positionOfEnemy;
    };
    return Enemy;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Score; });
var Score = /** @class */ (function () {
    function Score() {
    }
    Score.prototype.setScore = function (score) {
        var highestScore = this.getScore();
        if (score > highestScore) {
            localStorage.setItem('highestScore', JSON.stringify(score));
        }
    };
    Score.prototype.getScore = function () {
        var highestScore = JSON.parse(localStorage.getItem('highestScore'));
        return highestScore || 0;
    };
    Score.prototype.showScore = function (context) {
        var highestScore = this.getScore();
        context.innerHTML = 'Highest Score: ' + highestScore;
    };
    return Score;
}());



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODc2ZTVmM2EwYjQ0NWQwNDBhOWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9wYWludGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL2JvYXJkLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzc2VzL3NuYWtlLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnVtcy9kaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzZXMvZm9vZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9sZXZlbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9lbmVteS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3Nlcy9zY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RGtDO0FBQ0o7QUFDQTtBQUNGO0FBRUU7QUFDQTtBQUNBO0FBRTlCLElBQUksTUFBTSxHQUFRLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFdEQsSUFBSSxXQUFXLEdBQVEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FB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UUFDaEUsQ0FBQztJQUNMLENBQUM7SUFDRCx3QkFBUSxHQUFSO1FBQ0ksSUFBSSxZQUFZLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHlCQUFTLEdBQVQsVUFBVSxPQUFZO1FBQ2xCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxPQUFPLENBQUMsU0FBUyxHQUFHLGlCQUFpQixHQUFDLFlBQVksQ0FBQztJQUN2RCxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODc2ZTVmM2EwYjQ0NWQwNDBhOWIiLCJpbXBvcnQge1BhaW50ZXJ9IGZyb20gJy4vcGFpbnRlcic7XG5pbXBvcnQge0JvYXJkfSBmcm9tICcuL2JvYXJkJztcbmltcG9ydCB7U25ha2V9IGZyb20gJy4vc25ha2UnO1xuaW1wb3J0IHtGb29kfSBmcm9tIFwiLi9mb29kXCI7XG5pbXBvcnQge0lQb3NpdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcG9zaXRpb24nO1xuaW1wb3J0IHtMZXZlbH0gZnJvbSAnLi9sZXZlbCc7XG5pbXBvcnQge0VuZW15fSBmcm9tICcuL2VuZW15JztcbmltcG9ydCB7U2NvcmV9IGZyb20gJy4vc2NvcmUnO1xuXG5sZXQgY2FudmFzOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXljYW52YXMnKTtcblxubGV0IHN0YXJ0QnV0dG9uOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnRuJyk7XG5cbmxldCBoaWdoZXN0U2NvcmVQYXJhZ3JhcGg6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWdoZXN0LXNjb3JlJyk7XG5cbnN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgaW5pdCgpO1xufSk7XG5cbmxldCBnYW1lTG9vcDphbnk7XG5cbmZ1bmN0aW9uIGluaXQoKTogdm9pZCB7XG4gICAgc3RhcnRCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIGxldCBwYWludGVyID0gbmV3IFBhaW50ZXIoY2FudmFzKTtcblxuICAgIHZhciBzbmFrZVNpemUgPSA1O1xuICAgIHZhciBzbmFrZSA9IG5ldyBTbmFrZShzbmFrZVNpemUsICdncmVlbicsICdkYXJrZ3JlZW4nKTtcbiAgICBsZXQgZW5lbXkgPSBuZXcgRW5lbXkoMSxzbmFrZSk7XG4gICAgdmFyIGZvb2QgPSBuZXcgRm9vZChlbmVteSk7XG5cbiAgICB2YXIgZ2FtZVNjb3JlID0gMDtcbiAgICBsZXQgbnVtZWJyT2ZGb29kRWF0ID0gMDtcbiAgICBsZXQgbGV2ZWwgPSBuZXcgTGV2ZWwoMSwxNTAsMCk7IFxuICBcbiAgICB2YXIgYm9hcmQgPSBuZXcgQm9hcmQocGFpbnRlciwgc25ha2UsIGZvb2QsIDUwMCwgNTAwLCAxMCxlbmVteSk7XG4gICAgZW5lbXkuY3JlYXRlRW5lbWllcyhsZXZlbC5sZXZlbCk7XG4gICAgbGV0IHNjb3JlID0gbmV3IFNjb3JlKCk7XG4gICAgbGV0IGhpZ2hlc3RTY29yZSA9IHNjb3JlLmdldFNjb3JlKCk7IFxuICAgIHNjb3JlLnNob3dTY29yZShoaWdoZXN0U2NvcmVQYXJhZ3JhcGgpO1xuXG4gICAgYm9hcmQuaW5pdCgpO1xuICAgIGxldCBpbmVydmFsQ2FsbGJhY2s6IGFueSA7XG4gICAgbGV0IHRlbXBFbmVteUV4aXN0T25Cb2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHJ1bkdhbWUoc25ha2VTcGVlZDogbnVtYmVyKXtcbiAgICAgIGluZXJ2YWxDYWxsYmFjayA9ICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib2FyZC5pbml0KCk7XG4gICAgICAgICAgICBzbmFrZS5tb3ZlKCk7XG4gICAgXG4gICAgICAgICAgICBpZihib2FyZC5jaGVja0JvdW5kYXJ5KCkgfHwgc25ha2UuY2hlY2tDb2xsaXNpb24oKSl7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbmVydmFsQ2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIHNjb3JlLnNldFNjb3JlKGdhbWVTY29yZSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXIhISBZb3VyIHNjb3JlIGlzIFwiK2dhbWVTY29yZSk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZihzbmFrZS5lYXRGb29kKGZvb2QucG9zaXRpb24pKXtcbiAgICAgICAgICAgICAgICBnYW1lU2NvcmUgKz0gMTA7XG4gICAgICAgICAgICAgICAgc25ha2VTaXplICs9IDE7XG4gICAgICAgICAgICAgICAgbnVtZWJyT2ZGb29kRWF0Kys7XG4gICAgICAgICAgICAgICAgc25ha2UuaW5jcmVhc2VTbmFrZVNpemUoc25ha2VTaXplKTtcbiAgICAgICAgICAgICAgICBmb29kLmNyZWF0ZUZvb2QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobGV2ZWwuaXNDb21lcGxldGVMZXZlbCg0LCBudW1lYnJPZkZvb2RFYXQpKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGluZXJ2YWxDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgbGV2ZWwuZ290b05leHRMZXZlbChsZXZlbC5sZXZlbCwgbnVtZWJyT2ZGb29kRWF0KTtcbiAgICAgICAgICAgICAgICBnYW1lU2NvcmUgKz0gbGV2ZWwuYm9udXNQb2ludDtcbiAgICAgICAgICAgICAgICBzY29yZS5zZXRTY29yZShnYW1lU2NvcmUpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyISEgWW91ciBzY29yZSBpcyBcIitnYW1lU2NvcmUpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgaWYobGV2ZWwuaXNDb21lcGxldGVMZXZlbChsZXZlbC5sZXZlbCwgbnVtZWJyT2ZGb29kRWF0KSl7XG4gICAgICAgICAgICAgICAgICAgIGxldmVsLmdvdG9OZXh0TGV2ZWwobGV2ZWwubGV2ZWwsIG51bWVick9mRm9vZEVhdCk7XG4gICAgICAgICAgICAgICAgICAgIHNuYWtlLmNyZWF0ZVNuYWtlKHNuYWtlU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGVuZW15LmNyZWF0ZUVuZW1pZXMobGV2ZWwubGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICBlbmVteS5jcmVhdGVUZW1wb3JhcnlFbmVteSgpO1xuICAgICAgICAgICAgICAgICAgICBzbmFrZS5jaGFuZ2VEaXJlY3Rpb24oNDAsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRW5lbXlFeGlzdE9uQm9hcmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkNvbmdyYXR1bGF0aW9ucyEhIExldmVsIFwiKyhsZXZlbC5sZXZlbC0xKStcIiBjb21lcGxldGUuIEdvdCBib251cyBcIitsZXZlbC5ib251c1BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVNjb3JlICs9IGxldmVsLmJvbnVzUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIHNldFNuYWtlU3BlZWQobGV2ZWwuc25ha2VTcGVlZCk7XG4gICAgICAgICAgICAgICAgICAgIGVuZW15LmNyZWF0ZUVuZW1pZXMobGV2ZWwubGV2ZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGdhbWVTY29yZT49MjAgJiYgIXRlbXBFbmVteUV4aXN0T25Cb2FyZCl7XG4gICAgICAgICAgICAgICAgZW5lbXkuY3JlYXRlVGVtcG9yYXJ5RW5lbXkoKTtcbiAgICAgICAgICAgICAgICB0ZW1wRW5lbXlFeGlzdE9uQm9hcmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIGVuZW15LmlzVG91Y2hFbmVteUNlbGwobGV2ZWwubGV2ZWwpKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGluZXJ2YWxDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgYm9hcmQuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHNjb3JlLnNldFNjb3JlKGdhbWVTY29yZSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXIhISBZb3VyIHNjb3JlIGlzIFwiK2dhbWVTY29yZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0ZW1wRW5lbXlFeGlzdE9uQm9hcmQgJiYgZW5lbXkuaXNUb3VjaFRlbXBFbmVteUNlbGwoKSl7XG4gICAgICAgICAgICAgICAgZ2FtZVNjb3JlID0gZ2FtZVNjb3JlPj0yMD9nYW1lU2NvcmUtMjA6IDA7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJOTyEhIFlvdSBsb3N0IDIwIHBvaW50cyEhIVwiKTtcbiAgICAgICAgICAgICAgICBlbmVteS5kZXN0cm95VGVtcEVuaW15Q2VsbCgpO1xuICAgICAgICAgICAgICAgIHRlbXBFbmVteUV4aXN0T25Cb2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZ2FtZVNjb3JlPiBoaWdoZXN0U2NvcmUpe1xuICAgICAgICAgICAgICAgIHNjb3JlLnNldFNjb3JlKGdhbWVTY29yZSk7XG4gICAgICAgICAgICAgICAgc2NvcmUuc2hvd1Njb3JlKGhpZ2hlc3RTY29yZVBhcmFncmFwaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5Q29kZTpudW1iZXIgPSBldmVudC5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIHNuYWtlLmNoYW5nZURpcmVjdGlvbihrZXlDb2RlLCBmYWxzZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLmRyYXdTbmFrZSgpO1xuICAgICAgICAgICAgYm9hcmQuZHJhd0Zvb2QoKTtcbiAgICAgICAgICAgIGJvYXJkLmRyYXdTY29yZShnYW1lU2NvcmUpO1xuICAgICAgICAgICAgYm9hcmQuZHJhd0VuZW1pZXMoKTsgXG4gICAgICAgICAgICBpZih0ZW1wRW5lbXlFeGlzdE9uQm9hcmQpe1xuICAgICAgICAgICAgICAgIGJvYXJkLmRyYXdUZW1wRW5lbWllcygpOyAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzbmFrZVNwZWVkKVxuICAgIH1cbiAgICBnYW1lTG9vcCA9IHJ1bkdhbWUobGV2ZWwuc25ha2VTcGVlZCk7XG4gICAgZnVuY3Rpb24gc2V0U25ha2VTcGVlZChzbmFrZVNwZWVkOiBudW1iZXIpe1xuICAgICAgICBjbGVhckludGVydmFsKGluZXJ2YWxDYWxsYmFjayk7XG4gICAgICAgIHJ1bkdhbWUoc25ha2VTcGVlZCk7XG4gICAgfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9tYWluLnRzIiwiaW1wb3J0IHtJUGFpbnRlcn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pcGFpbnRlcic7XG5cbmV4cG9ydCBjbGFzcyBQYWludGVyIGltcGxlbWVudHMgSVBhaW50ZXJ7XG4gICAgY2FudmFzOmFueTtcbiAgICBjb250ZXh0OiBhbnk7XG4gICAgY29uc3RydWN0b3IoX2NhbnZhczphbnkpe1xuICAgICAgICB0aGlzLmNhbnZhcyA9IF9jYW52YXM7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IF9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG4gICAgZmlsbEFyZWEoeDE6bnVtYmVyLCB5MTpudW1iZXIseDI6bnVtYmVyLCB5MjpudW1iZXIsIGNvbG9yOnN0cmluZyk6dm9pZHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoeDEsIHkxLHgyLCB5Mik7XG5cbiAgICB9XG4gICAgc3Ryb2tlQXJlYSh4MTpudW1iZXIsIHkxOm51bWJlcix4MjpudW1iZXIsIHkyOm51bWJlciwgY29sb3I6c3RyaW5nKTp2b2lke1xuICAgICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoeDEsIHkxLHgyLCB5Mik7XG4gICAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvcGFpbnRlci50cyIsImltcG9ydCB7SVBhaW50ZXJ9IGZyb20gJy4uL2ludGVyZmFjZXMvaXBhaW50ZXInO1xuaW1wb3J0IHtJRm9vZH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pZm9vZCc7XG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xuaW1wb3J0IHtJQm9hcmR9IGZyb20gJy4uL2ludGVyZmFjZXMvaWJvYXJkJztcbmltcG9ydCB7SUVuZW15fSBmcm9tICcuLi9pbnRlcmZhY2VzL2lFbmVteSc7XG5cbmV4cG9ydCBjbGFzcyBCb2FyZCBpbXBsZW1lbnRzIElCb2FyZHtcbiAgICBwYWludGVyOiBJUGFpbnRlcjtcbiAgICBzbmFrZTogSVNuYWtlO1xuICAgIGhlaWdodDpudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBzaXplOm51bWJlcjtcbiAgICBmb29kOiBJRm9vZDtcbiAgICBlbmVteTogSUVuZW15O1xuICAgIGNvbnN0cnVjdG9yKHBhaW50ZXI6IElQYWludGVyLHNuYWtlOiBJU25ha2UsIGZvb2Q6IElGb29kLGg6bnVtYmVyLCB3Om51bWJlciwgczpudW1iZXIsIGVuZW15OiBJRW5lbXkpe1xuICAgICAgICB0aGlzLmhlaWdodCA9IGg7XG4gICAgICAgIHRoaXMud2lkdGggPSB3O1xuICAgICAgICB0aGlzLnNpemUgPSBzO1xuICAgICAgICB0aGlzLnBhaW50ZXIgPSBwYWludGVyO1xuICAgICAgICB0aGlzLnNuYWtlID0gc25ha2U7XG4gICAgICAgIHRoaXMuZm9vZCA9IGZvb2Q7XG4gICAgICAgIHRoaXMuZW5lbXkgPSBlbmVteTtcbiAgICB9XG4gICAgZHJhd1NuYWtlKCk6dm9pZHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNuYWtlLmNlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuc25ha2UuY2VsbHNbaV07XG4gICAgICAgICAgICBpZihpPT0wKXtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTbmFrZUNlbGwoY2VsbC54LCBjZWxsLnksIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTbmFrZUNlbGwoY2VsbC54LCBjZWxsLnksIGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuICAgIGRyYXdTbmFrZUNlbGwoeDpudW1iZXIsIHk6bnVtYmVyLCBpc0hlYWQ6Ym9vbGVhbil7XG4gICAgICAgIGlmKGlzSGVhZCl7XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJyZWRcIik7XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImRhcmtncmVlblwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSh4KnRoaXMuc2l6ZSwgeSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImdyZWVuXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoeCp0aGlzLnNpemUsIHkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJkYXJrZ3JlZW5cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZHJhd0Zvb2QoKTp2b2lke1xuICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEodGhpcy5mb29kLnBvc2l0aW9uLngqdGhpcy5zaXplLCB0aGlzLmZvb2QucG9zaXRpb24ueSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImJsdWVcIik7XG4gICAgICAgIHRoaXMucGFpbnRlci5zdHJva2VBcmVhKHRoaXMuZm9vZC5wb3NpdGlvbi54KnRoaXMuc2l6ZSwgdGhpcy5mb29kLnBvc2l0aW9uLnkqdGhpcy5zaXplLCB0aGlzLnNpemUsIHRoaXMuc2l6ZSwgXCJ5ZWxsb3dcIik7XG4gICAgfVxuICAgIGRyYXdTY29yZShzY29yZTogbnVtYmVyKTp2b2lke1xuICAgICAgICBsZXQgc2NvcmVUZXh0ID0gXCJTY29yZSBcIitzY29yZTtcbiAgICAgICAgdGhpcy5wYWludGVyLmNvbnRleHQuZmlsbFRleHQoc2NvcmVUZXh0LCA0NDAsIDE1KTtcbiAgICB9XG4gICAgY2hlY2tCb3VuZGFyeSgpOiBib29sZWFue1xuICAgICAgICByZXR1cm4gdGhpcy5zbmFrZS5jaGVja0JvdW5kYXJ5KC0xLCAgdGhpcy53aWR0aC90aGlzLnNpemUsLTEsIHRoaXMuaGVpZ2h0L3RoaXMuc2l6ZSk7XG4gICAgfVxuICAgIGNoYW5nZVNuYWtlU2l6ZShfbGVuZ3RoOiBudW1iZXIpOiB2b2lke1xuICAgICAgIHRoaXMuc25ha2UuaW5jcmVhc2VTbmFrZVNpemUoX2xlbmd0aCk7IFxuICAgIH1cbiAgICBkcmF3RW5lbWllcygpOnZvaWR7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbmVteS5lbmVteUNlbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjZWxsUG9zaXRpb24gPSAgdGhpcy5lbmVteS5lbmVteUNlbGxbaV07XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoY2VsbFBvc2l0aW9uLngqdGhpcy5zaXplLCBjZWxsUG9zaXRpb24ueSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoY2VsbFBvc2l0aW9uLngqdGhpcy5zaXplLCBjZWxsUG9zaXRpb24ueSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcInJlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3VGVtcEVuZW1pZXMoKTp2b2lke1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZW5lbXkudGVtcEVuZW15Q2VsbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNlbGxQb3NpdGlvbiA9ICB0aGlzLmVuZW15LnRlbXBFbmVteUNlbGxbaV07XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuZmlsbEFyZWEoY2VsbFBvc2l0aW9uLngqdGhpcy5zaXplLCBjZWxsUG9zaXRpb24ueSp0aGlzLnNpemUsIHRoaXMuc2l6ZSwgdGhpcy5zaXplLCBcInBpbmtcIik7XG4gICAgICAgICAgICB0aGlzLnBhaW50ZXIuc3Ryb2tlQXJlYShjZWxsUG9zaXRpb24ueCp0aGlzLnNpemUsIGNlbGxQb3NpdGlvbi55KnRoaXMuc2l6ZSwgdGhpcy5zaXplLCB0aGlzLnNpemUsIFwicmVkXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpOnZvaWR7XG4gICAgICAgIHRoaXMucGFpbnRlci5maWxsQXJlYSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgXCJsaWdodGdyZXlcIilcbiAgICAgICAgdGhpcy5wYWludGVyLnN0cm9rZUFyZWEoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsXCJibGFja1wiKVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9ib2FyZC50cyIsImltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XG5pbXBvcnQge0lTbmFrZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pc25ha2UnO1xuaW1wb3J0IHtEaXJlY3Rpb259IGZyb20gJy4uL2VudW1zL2RpcmVjdGlvbic7XG5pbXBvcnQge0VuZW15fSBmcm9tICcuL0VuZW15JztcblxuZXhwb3J0IGNsYXNzIFNuYWtlIGltcGxlbWVudHMgSVNuYWtle1xuICAgIGNlbGxzOiBJUG9zaXRpb25bXTtcbiAgICBib2R5Q29sb3I6IHN0cmluZztcbiAgICBib3JkZXJDb2xvcjogc3RyaW5nO1xuICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uO1xuICAgIGxlbmd0aDogbnVtYmVyO1xuICAgIGVuZW15OiBFbmVteTtcbiAgICBjb25zdHJ1Y3RvcihfbGVuZ3RoOm51bWJlciwgX2JvZHlDb2xvcjpzdHJpbmcsIF9ib3JkZXJDb2xvcjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IF9sZW5ndGg7XG4gICAgICAgIHRoaXMuYm9keUNvbG9yID0gX2JvZHlDb2xvcjtcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9IF9ib3JkZXJDb2xvcjtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uRG93bjtcbiAgICAgICAgdGhpcy5jcmVhdGVTbmFrZSh0aGlzLmxlbmd0aCk7XG4gICAgICAgIC8vIGZvcihsZXQgaT0wO2k8X2xlbmd0aDtpKyspe1xuICAgICAgICAvLyAgICAgdGhpcy5jZWxscy5wdXNoKHt4OiBpLCB5OiAwfSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG4gICAgY3JlYXRlU25ha2UoX2xlbmd0aDogbnVtYmVyKTogdm9pZHtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICAvLyB0aGlzLmNlbGxzLnB1c2goe3g6IDAsIHk6IDF9KTtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxfbGVuZ3RoO2krKyl7XG4gICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goe3g6IGksIHk6IDB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbmNyZWFzZVNuYWtlU2l6ZShfbGVuZ3RoOiBudW1iZXIpe1xuICAgICAgIGxldCBuZXdDZWxsID0ge1xuICAgICAgICAgICAgeDogdGhpcy5jZWxsc1tfbGVuZ3RoLTJdLngsXG4gICAgICAgICAgICB5OiB0aGlzLmNlbGxzW19sZW5ndGgtMl0ueSsxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jZWxscy5wdXNoKG5ld0NlbGwpO1xuICAgIH1cblxuICAgIGNoYW5nZURpcmVjdGlvbihrZXlDb2RlOm51bWJlcixpc0luaXRpYXREaXJlY3Rpb246IGJvb2xlYW4pe1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5SaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5MZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpc0luaXRpYXREaXJlY3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5MZWZ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5MZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLlJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpc0luaXRpYXREaXJlY3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5SaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5Eb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gRGlyZWN0aW9uLlVwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpc0luaXRpYXREaXJlY3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5VcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IERpcmVjdGlvbi5VcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IERpcmVjdGlvbi5Eb3duO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgaWYoaXNJbml0aWF0RGlyZWN0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBEaXJlY3Rpb24uRG93bjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZSgpe1xuICAgICAgICBsZXQgc25ha2VYOiBudW1iZXIgPSB0aGlzLmNlbGxzWzBdLng7XG4gICAgICAgIGxldCBzbmFrZVk6IG51bWJlciA9IHRoaXMuY2VsbHNbMF0ueTtcblxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlJpZ2h0KSB7XG4gICAgICAgICAgICBzbmFrZVgrKztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uTGVmdCkge1xuICAgICAgICAgICAgc25ha2VYLS07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlVwKSB7XG4gICAgICAgICAgICBzbmFrZVktLTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBEaXJlY3Rpb24uRG93bikge1xuICAgICAgICAgICAgc25ha2VZKys7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNlbGxzLnBvcCgpO1xuICAgICAgICB0aGlzLmNlbGxzLnVuc2hpZnQoe3g6c25ha2VYLCB5OnNuYWtlWX0pO1xuICAgIH1cblxuICAgIGVhdEZvb2QoZm9vZDpJUG9zaXRpb24pOiBib29sZWFue1xuICAgICAgICBsZXQgaGVhZDpJUG9zaXRpb24gPSB0aGlzLmNlbGxzWzBdO1xuXG4gICAgICAgIGlmKGZvb2QueCA9PSBoZWFkLnggJiYgZm9vZC55ID09IGhlYWQueSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGNoZWNrQ29sbGlzaW9uKCk6IGJvb2xlYW57XG4gICAgICAgIHZhciB4ID0gdGhpcy5jZWxsc1swXS54O1xuICAgICAgICB2YXIgeSA9IHRoaXMuY2VsbHNbMF0ueTtcbiAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICAgICAgICAgIGlmKGNlbGwueCA9PT0geCAmJiBjZWxsLnkgPT09IHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjaGVja0JvdW5kYXJ5KGJ4MTpudW1iZXIsYngyOm51bWJlciwgYnkxOm51bWJlciwgYnkyOm51bWJlciApOmJvb2xlYW57XG4gICAgICAgIHZhciBmaXJzdENlbGwgPSB0aGlzLmNlbGxzWzBdO1xuICAgICAgICBpZihmaXJzdENlbGwueCA9PSBieDEgfHwgZmlyc3RDZWxsLnkgPT0gYnkxIHx8IGZpcnN0Q2VsbC54ID09IGJ4MiB8fCBmaXJzdENlbGwueSA9PSBieTIpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvc25ha2UudHMiLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICAgIFVwLFxuICAgIERvd24sXG4gICAgTGVmdCxcbiAgICBSaWdodFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudW1zL2RpcmVjdGlvbi50cyIsIlxuaW1wb3J0IHtJUG9zaXRpb259IGZyb20gJy4uL2ludGVyZmFjZXMvaXBvc2l0aW9uJztcbmltcG9ydCB7SUZvb2R9IGZyb20gJy4uL2ludGVyZmFjZXMvaWZvb2QnO1xuaW1wb3J0IHtJRW5lbXl9IGZyb20gJy4uL2ludGVyZmFjZXMvaUVuZW15JztcblxuZXhwb3J0IGNsYXNzIEZvb2QgaW1wbGVtZW50cyBJRm9vZHtcbiAgICBwb3NpdGlvbjogSVBvc2l0aW9uO1xuICAgIGVuZW15OiBJRW5lbXk7XG4gICAgY29uc3RydWN0b3IoX2VuZW15OiBJRW5lbXkpe1xuICAgICAgICB0aGlzLmVuZW15ID0gX2VuZW15O1xuICAgICAgICB0aGlzLmNyZWF0ZUZvb2QoKTtcbiAgICB9XG4gICAgY3JlYXRlRm9vZCgpOnZvaWR7XG4gICAgICAgIGxldCBmb29kQ2VsbCA9ICB0aGlzLmdlbmVyYXRlRm9vZENlbGwoKTtcbiAgICAgICAgd2hpbGUodGhpcy5lbmVteS5lbmVteUNlbGwubGVuZ3RoICYmIHRoaXMuaXNFeGlzdE9uRW5lbXlDZWxsKGZvb2RDZWxsKSl7XG4gICAgICAgICAgICBmb29kQ2VsbCA9ICB0aGlzLmdlbmVyYXRlRm9vZENlbGwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gZm9vZENlbGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0V4aXN0T25FbmVteUNlbGwoZm9vZENlbGw6IElQb3NpdGlvbik6IGJvb2xlYW57XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuZW5lbXkuZW5lbXlDZWxsLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGZvb2RDZWxsLnggPT10aGlzLmVuZW15LmVuZW15Q2VsbFtpXS54IHx8IGZvb2RDZWxsLnkgPT0gdGhpcy5lbmVteS5lbmVteUNlbGxbaV0ueSApe1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlRm9vZENlbGwoKTogSVBvc2l0aW9ue1xuICAgICAgICBsZXQgcG9zaXRpb25PZkZvb2QgPSB7XG4gICAgICAgICAgICB4Ok1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0NSksXG4gICAgICAgICAgICB5Ok1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0NSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zaXRpb25PZkZvb2Q7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jbGFzc2VzL2Zvb2QudHMiLCJpbXBvcnQge0lMZXZlbH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JTGV2ZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIExldmVsIGltcGxlbWVudHMgSUxldmVse1xyXG4gICAgbGV2ZWw6IG51bWJlcjtcclxuICAgIHNuYWtlU3BlZWQ6IG51bWJlcjtcclxuICAgIGJvbnVzUG9pbnQ6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKF9sZXZlbDpudW1iZXIsIF9zcGVlZDogbnVtYmVyLCBfYm9udXNQb2ludDogbnVtYmVyKXtcclxuICAgICAgIHRoaXMubGV2ZWwgPSBfbGV2ZWw7XHJcbiAgICAgICB0aGlzLnNuYWtlU3BlZWQgPSBfc3BlZWQ7XHJcbiAgICAgICB0aGlzLmJvbnVzUG9pbnQgPSBfYm9udXNQb2ludDsgXHJcbiAgICB9XHJcbiAgICBpc0NvbWVwbGV0ZUxldmVsKGxldmVsOiBudW1iZXIsIG51bWJlck9mRm9vZDogbnVtYmVyKTogYm9vbGVhbntcclxuICAgICAgICBpZihsZXZlbD09MSAmJiBudW1iZXJPZkZvb2QgPT0gNSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgaWYobGV2ZWw9PTIgJiYgbnVtYmVyT2ZGb29kID09IDEwKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZihsZXZlbD09MyAmJiBudW1iZXJPZkZvb2QgPT0gMTUpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmKGxldmVsPT00ICYmIG51bWJlck9mRm9vZCA9PSAyMClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ290b05leHRMZXZlbChsZXZlbDogbnVtYmVyLG51bWJlck9mRm9vZDogbnVtYmVyKTp2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZkZvb2QgPT0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlU3BlZWQgLT0gNTA7IFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9udXNQb2ludCA9IDEwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtYmVyT2ZGb29kID09IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VTcGVlZCAtPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvbnVzUG9pbnQgPSAzMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKG51bWJlck9mRm9vZCA9PSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGV2ZWwrKztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlU3BlZWQgLT0gMjU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib251c1BvaW50ID0gNTAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmIChudW1iZXJPZkZvb2QgPT0gMjApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbmFrZVNwZWVkIC09IDEwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9udXNQb2ludCA9IDEwMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9sZXZlbC50cyIsImltcG9ydCB7SUVuZW15fSBmcm9tICcuLi9pbnRlcmZhY2VzL2lFbmVteSc7XHJcbmltcG9ydCB7SVBvc2l0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2lwb3NpdGlvbic7XHJcbmltcG9ydCB7SVNuYWtlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzbmFrZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRW5lbXkgaW1wbGVtZW50cyBJRW5lbXl7XHJcbiAgICBsZXZlbDogbnVtYmVyOyBcclxuICAgIHBvc2l0aW9uOiBJUG9zaXRpb247XHJcbiAgICBlbmVteUNlbGw6IElQb3NpdGlvbltdO1xyXG4gICAgdGVtcEVuZW15Q2VsbDogSVBvc2l0aW9uW107XHJcbiAgICBzbmFrZTogSVNuYWtlO1xyXG4gICAgY29uc3RydWN0b3IoX2xldmVsOiBudW1iZXIsIHNuYWtlOiBJU25ha2Upe1xyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBfbGV2ZWw7XHJcbiAgICAgICAgdGhpcy5zbmFrZSA9IHNuYWtlO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlRW5lbWllcyh0aGlzLmxldmVsKTtcclxuICAgIH1cclxuICAgIGlzVG91Y2hFbmVteUNlbGwobGV2ZWw6IG51bWJlcik6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLmVuZW15Q2VsbC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zbmFrZS5jZWxsc1swXS54ID09IHRoaXMuZW5lbXlDZWxsW2ldLnggJiYgdGhpcy5zbmFrZS5jZWxsc1swXS55ID09IHRoaXMuZW5lbXlDZWxsW2ldLnkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNUb3VjaFRlbXBFbmVteUNlbGwoKTogYm9vbGVhbntcclxuICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMudGVtcEVuZW15Q2VsbC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zbmFrZS5jZWxsc1swXS54ID09IHRoaXMudGVtcEVuZW15Q2VsbFtpXS54ICYmIHRoaXMuc25ha2UuY2VsbHNbMF0ueSA9PSB0aGlzLnRlbXBFbmVteUNlbGxbaV0ueSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVFbmVtaWVzKGxldmVsOm51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5lbmVteUNlbGwgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MDtpPGxldmVsKmxldmVsKzI7aSsrKXtcclxuICAgICAgICAgICAgdGhpcy5lbmVteUNlbGwucHVzaCh0aGlzLmdldEVuZW15Q2VsbCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUZW1wb3JhcnlFbmVteSgpOiB2b2lke1xyXG4gICAgICAgIHRoaXMudGVtcEVuZW15Q2VsbCA9IFtdO1xyXG4gICAgICAgIHRoaXMudGVtcEVuZW15Q2VsbC5wdXNoKHRoaXMuZ2V0RW5lbXlDZWxsKCkpO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveVRlbXBFbmlteUNlbGwoKTogdm9pZHtcclxuICAgICAgICB0aGlzLnRlbXBFbmVteUNlbGwgPSBbXTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0RW5lbXlDZWxsKCk6IElQb3NpdGlvbntcclxuICAgICAgICBsZXQgZW5lbXlDZWxsID0gIHRoaXMuZ2VuZXJhdGVFbmVteUNlbGwoKTtcclxuICAgICAgICB3aGlsZSh0aGlzLmlzQVNuYWtlQ2VsbChlbmVteUNlbGwpKXtcclxuICAgICAgICAgICAgZW5lbXlDZWxsID0gIHRoaXMuZ2VuZXJhdGVFbmVteUNlbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVuZW15Q2VsbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNBU25ha2VDZWxsKGNlbGw6IElQb3NpdGlvbik6IGJvb2xlYW57XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8dGhpcy5zbmFrZS5jZWxscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGNlbGwueCA9PXRoaXMuc25ha2UuY2VsbHNbaV0ueCB8fCBjZWxsLnkgPT0gdGhpcy5zbmFrZS5jZWxsc1tpXS55ICl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdlbmVyYXRlRW5lbXlDZWxsKCk6IElQb3NpdGlvbntcclxuICAgICAgICBsZXQgcG9zaXRpb25PZkVuZW15ID0ge1xyXG4gICAgICAgICAgICB4Ok1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0NSksXHJcbiAgICAgICAgICAgIHk6TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjQ1KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zaXRpb25PZkVuZW15O1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NsYXNzZXMvZW5lbXkudHMiLCJpbXBvcnQgeyBJU2NvcmUgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2lzY29yZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2NvcmUgaW1wbGVtZW50cyBJU2NvcmV7XHJcblxyXG4gICAgc2V0U2NvcmUoc2NvcmU6IG51bWJlcik6IHZvaWR7XHJcbiAgICAgICAgbGV0IGhpZ2hlc3RTY29yZSA9ICB0aGlzLmdldFNjb3JlKCk7XHJcbiAgICAgICAgaWYoc2NvcmU+IGhpZ2hlc3RTY29yZSl7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWdoZXN0U2NvcmUnLCBKU09OLnN0cmluZ2lmeShzY29yZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFNjb3JlKCk6IG51bWJlcntcclxuICAgICAgICBsZXQgaGlnaGVzdFNjb3JlOiBudW1iZXIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWdoZXN0U2NvcmUnKSk7XHJcbiAgICAgICAgcmV0dXJuIGhpZ2hlc3RTY29yZSB8fCAwO1xyXG4gICAgfVxyXG4gICAgc2hvd1Njb3JlKGNvbnRleHQ6IGFueSk6IHZvaWR7XHJcbiAgICAgICAgbGV0IGhpZ2hlc3RTY29yZSA9IHRoaXMuZ2V0U2NvcmUoKTsgXHJcbiAgICAgICAgY29udGV4dC5pbm5lckhUTUwgPSAnSGlnaGVzdCBTY29yZTogJytoaWdoZXN0U2NvcmU7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xhc3Nlcy9zY29yZS50cyJdLCJzb3VyY2VSb290IjoiIn0=