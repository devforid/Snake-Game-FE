import {ILevel} from '../interfaces/ILevel';

export class Level implements ILevel{
    level: number;
    snakeSpeed: number;
    bonusPoint: number;
    constructor(_level:number, _speed: number, _bonusPoint: number){
       this.level = _level;
       this.snakeSpeed = _speed;
       this.bonusPoint = _bonusPoint; 
    }
    isComepleteLevel(level: number, numberOfFood: number): boolean{
        if(level==1 && numberOfFood == 5)
            return true;
        if(level==2 && numberOfFood == 10)
            return true;
        if(level==3 && numberOfFood == 15)
            return true;
        if(level==4 && numberOfFood == 20)
            return true;
        return false;
    }
    gotoNextLevel(level: number,numberOfFood: number):void {
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
    }
}