import {Direction} from  '../enums/direction';
import {IPosition} from './iposition';

export interface ISnake{
    cells: IPosition[],
    bodyColor: string,
    borderColor: string,
    direction: Direction,
    length: number,
    createSnake(_length: number): void,
    move():void,
    eatFood(foodPosition:IPosition):boolean,
    changeDirection(keyCode:number,isInitiatDirection: boolean):void,
    checkCollision(): boolean,
    checkBoundary(bx1:number,bx2:number, by1:number, by2:number): boolean
    increaseSnakeSize(_length: number): void
}