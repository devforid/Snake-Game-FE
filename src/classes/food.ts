
import {IPosition} from '../interfaces/iposition';
import {IFood} from '../interfaces/ifood';
import {IEnemy} from '../interfaces/iEnemy';

export class Food implements IFood{
    position: IPosition;
    enemy: IEnemy;
    constructor(_enemy: IEnemy){
        this.enemy = _enemy;
        this.createFood();
    }
    createFood():void{
        let foodCell =  this.generateFoodCell();
        while(this.enemy.enemyCell.length && this.isExistOnEnemyCell(foodCell)){
            foodCell =  this.generateFoodCell();
        }
        this.position = foodCell;
    }

    private isExistOnEnemyCell(foodCell: IPosition): boolean{
        for(let i=0; i<this.enemy.enemyCell.length; i++){
            if(foodCell.x ==this.enemy.enemyCell[i].x || foodCell.y == this.enemy.enemyCell[i].y ){
                return true;
            }
        }
        return false;
    }

    private generateFoodCell(): IPosition{
        let positionOfFood = {
            x:Math.floor(Math.random()*45),
            y:Math.floor(Math.random()*45)
        }
        return positionOfFood;
    }
}