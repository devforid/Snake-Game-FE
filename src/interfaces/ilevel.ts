export interface ILevel{
    level: number,
    snakeSpeed: number,
    bonusPoint: number,
    isComepleteLevel(level: number, numberOfFood: number): boolean,
    gotoNextLevel(level: number,numberOfFood: number):void
}