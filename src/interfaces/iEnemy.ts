import {IPosition} from './iposition';
import {ISnake} from './isnake';
export interface IEnemy{
    level: number,
    position: IPosition,
    enemyCell: IPosition[],
    tempEnemyCell: IPosition[],
    createEnemies(level:number, snake: ISnake): void,
    isTouchEnemyCell(level: number): boolean,
    createTemporaryEnemy(): void,
    destroyTempEnimyCell(): void
}