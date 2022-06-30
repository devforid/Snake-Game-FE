import {IPainter} from '../interfaces/ipainter';
import {IFood} from '../interfaces/ifood';
import {ISnake} from '../interfaces/isnake';
import {IBoard} from '../interfaces/iboard';
import {IEnemy} from '../interfaces/iEnemy';

export class Board implements IBoard{
    painter: IPainter;
    snake: ISnake;
    height:number;
    width: number;
    size:number;
    food: IFood;
    enemy: IEnemy;
    constructor(painter: IPainter,snake: ISnake, food: IFood,h:number, w:number, s:number, enemy: IEnemy){
        this.height = h;
        this.width = w;
        this.size = s;
        this.painter = painter;
        this.snake = snake;
        this.food = food;
        this.enemy = enemy;
    }
    drawSnake():void{
        for (var i = 0; i < this.snake.cells.length; i++) {
            var cell = this.snake.cells[i];
            if(i==0){
                this.drawSnakeCell(cell.x, cell.y, true);
            } else {
                this.drawSnakeCell(cell.x, cell.y, false);
            }

        }
    }
    drawSnakeCell(x:number, y:number, isHead:boolean){
        if(isHead){
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "red");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "darkgreen");
        } else {
            this.painter.fillArea(x*this.size, y*this.size, this.size, this.size, "green");
            this.painter.strokeArea(x*this.size, y*this.size, this.size, this.size, "darkgreen");
        }
    }
    drawFood():void{
        this.painter.fillArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "blue");
        this.painter.strokeArea(this.food.position.x*this.size, this.food.position.y*this.size, this.size, this.size, "yellow");
    }
    drawScore(score: number):void{
        let scoreText = "Score "+score;
        this.painter.context.fillText(scoreText, 440, 15);
    }
    checkBoundary(): boolean{
        return this.snake.checkBoundary(-1,  this.width/this.size,-1, this.height/this.size);
    }
    changeSnakeSize(_length: number): void{
       this.snake.increaseSnakeSize(_length); 
    }
    drawEnemies():void{
        for (var i = 0; i < this.enemy.enemyCell.length; i++) {
            var cellPosition =  this.enemy.enemyCell[i];
            this.painter.fillArea(cellPosition.x*this.size, cellPosition.y*this.size, this.size, this.size, "black");
            this.painter.strokeArea(cellPosition.x*this.size, cellPosition.y*this.size, this.size, this.size, "red");
        }
    }
    drawTempEnemies():void{
        for (var i = 0; i < this.enemy.tempEnemyCell.length; i++) {
            var cellPosition =  this.enemy.tempEnemyCell[i];
            this.painter.fillArea(cellPosition.x*this.size, cellPosition.y*this.size, this.size, this.size, "pink");
            this.painter.strokeArea(cellPosition.x*this.size, cellPosition.y*this.size, this.size, this.size, "red");
        }
    }

    init():void{
        this.painter.fillArea(0, 0, this.width, this.height, "lightgrey")
        this.painter.strokeArea(0, 0, this.width, this.height,"black")
    }
}