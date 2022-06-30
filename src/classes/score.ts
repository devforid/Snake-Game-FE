import { IScore } from '../interfaces/iscore';

export class Score implements IScore{

    setScore(score: number): void{
        let highestScore =  this.getScore();
        if(score> highestScore){
            localStorage.setItem('highestScore', JSON.stringify(score));
        }
    }
    getScore(): number{
        let highestScore: number = JSON.parse(localStorage.getItem('highestScore'));
        return highestScore || 0;
    }
    showScore(context: any): void{
        let highestScore = this.getScore(); 
        context.innerHTML = 'Highest Score: '+highestScore;
    }
}