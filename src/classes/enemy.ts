import {IEnemy} from '../interfaces/iEnemy';
import {IPosition} from '../interfaces/iposition';
import {ISnake} from '../interfaces/isnake';

export class Enemy implements IEnemy{
    level: number; 
    position: IPosition;
    enemyCell: IPosition[];
    tempEnemyCell: IPosition[];
    snake: ISnake;
    constructor(_level: number, snake: ISnake){
        this.level = _level;
        this.snake = snake;
        this.createEnemies(this.level);
    }
    isTouchEnemyCell(level: number): boolean{
        for(let i=0;i<this.enemyCell.length;i++){
            if(this.snake.cells[0].x == this.enemyCell[i].x && this.snake.cells[0].y == this.enemyCell[i].y){
                return true;
            }
        }
        return false;
    }
    isTouchTempEnemyCell(): boolean{
        for(let i=0;i<this.tempEnemyCell.length;i++){
            if(this.snake.cells[0].x == this.tempEnemyCell[i].x && this.snake.cells[0].y == this.tempEnemyCell[i].y){
                return true;
            }
        }
        return false;
    }
    createEnemies(level:number): void{
        this.enemyCell = [];
        for(let i=0;i<level*level+2;i++){
            this.enemyCell.push(this.getEnemyCell());
        }
    }
    createTemporaryEnemy(): void{
        this.tempEnemyCell = [];
        this.tempEnemyCell.push(this.getEnemyCell());
    }
    destroyTempEnimyCell(): void{
        this.tempEnemyCell = [];
    }
    private getEnemyCell(): IPosition{
        let enemyCell =  this.generateEnemyCell();
        while(this.isASnakeCell(enemyCell)){
            enemyCell =  this.generateEnemyCell();
        }
        return enemyCell;
    }
    private isASnakeCell(cell: IPosition): boolean{
        for(let i=0; i<this.snake.cells.length; i++){
            if(cell.x ==this.snake.cells[i].x || cell.y == this.snake.cells[i].y ){
                return true;
            }
        }
        return false;
    }
    private generateEnemyCell(): IPosition{
        let positionOfEnemy = {
            x:Math.floor(Math.random()*45),
            y:Math.floor(Math.random()*45)
        }
        return positionOfEnemy;
    }
}