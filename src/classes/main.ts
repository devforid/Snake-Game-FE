import {Painter} from './painter';
import {Board} from './board';
import {Snake} from './snake';
import {Food} from "./food";
import {IPosition} from '../interfaces/iposition';
import {Level} from './level';
import {Enemy} from './enemy';
import {Score} from './score';

let canvas: any = document.getElementById('mycanvas');

let startButton: any = document.getElementById('start-btn');

let highestScoreParagraph: any = document.getElementById('highest-score');

startButton.addEventListener("click", function () {
    init();
});

let gameLoop:any;

function init(): void {
    startButton.setAttribute('disabled', true);
    let painter = new Painter(canvas);

    var snakeSize = 5;
    var snake = new Snake(snakeSize, 'green', 'darkgreen');
    let enemy = new Enemy(1,snake);
    var food = new Food(enemy);

    var gameScore = 0;
    let numebrOfFoodEat = 0;
    let level = new Level(1,150,0); 
  
    var board = new Board(painter, snake, food, 500, 500, 10,enemy);
    enemy.createEnemies(level.level);
    let score = new Score();
    let highestScore = score.getScore(); 
    score.showScore(highestScoreParagraph);

    board.init();
    let inervalCallback: any ;
    let tempEnemyExistOnBoard: boolean = false;
    function runGame(snakeSpeed: number){
      inervalCallback =  setInterval(function () {
            board.init();
            snake.move();
    
            if(board.checkBoundary() || snake.checkCollision()){
                clearInterval(inervalCallback);
                score.setScore(gameScore);
                alert("Game over!! Your score is "+gameScore);
            }
    
            if(snake.eatFood(food.position)){
                gameScore += 10;
                snakeSize += 1;
                numebrOfFoodEat++;
                snake.increaseSnakeSize(snakeSize);
                food.createFood();
            }
            
            if(level.isComepleteLevel(4, numebrOfFoodEat)){
                clearInterval(inervalCallback);
                level.gotoNextLevel(level.level, numebrOfFoodEat);
                gameScore += level.bonusPoint;
                score.setScore(gameScore);
                alert("Game over!! Your score is "+gameScore);
            }else{
                if(level.isComepleteLevel(level.level, numebrOfFoodEat)){
                    level.gotoNextLevel(level.level, numebrOfFoodEat);
                    snake.createSnake(snakeSize);
                    enemy.createEnemies(level.level);
                    enemy.createTemporaryEnemy();
                    snake.changeDirection(40, true);
                    tempEnemyExistOnBoard = true;
                    alert("Congratulations!! Level "+(level.level-1)+" comeplete. Got bonus "+level.bonusPoint);
                    gameScore += level.bonusPoint;
                    setSnakeSpeed(level.snakeSpeed);
                    enemy.createEnemies(level.level);
                }
            }
            if(gameScore>=20 && !tempEnemyExistOnBoard){
                enemy.createTemporaryEnemy();
                tempEnemyExistOnBoard = true;
            }
            if( enemy.isTouchEnemyCell(level.level)){
                clearInterval(inervalCallback);
                board.init();
                score.setScore(gameScore);
                alert("Game over!! Your score is "+gameScore);
            }
            if(tempEnemyExistOnBoard && enemy.isTouchTempEnemyCell()){
                gameScore = gameScore>=20?gameScore-20: 0;
                alert("NO!! You lost 20 points!!!");
                enemy.destroyTempEnimyCell();
                tempEnemyExistOnBoard = false;
            }
            if(gameScore> highestScore){
                score.setScore(gameScore);
                score.showScore(highestScoreParagraph);
            }
            document.onkeydown = function (event) {
                let keyCode:number = event.keyCode;
                snake.changeDirection(keyCode, false)
            }
            board.drawSnake();
            board.drawFood();
            board.drawScore(gameScore);
            board.drawEnemies(); 
            if(tempEnemyExistOnBoard){
                board.drawTempEnemies();                        
            }
        }, snakeSpeed)
    }
    gameLoop = runGame(level.snakeSpeed);
    function setSnakeSpeed(snakeSpeed: number){
        clearInterval(inervalCallback);
        runGame(snakeSpeed);
    }
}

