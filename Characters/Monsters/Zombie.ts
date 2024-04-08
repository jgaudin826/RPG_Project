import Character from "../Character.ts";
import Monster from "../Monster.ts";

export default class Zombie extends Monster{
    className:string="zombie";
    constructor(attack : number = Math.floor((Math.random() * 20)+40), 
                defense : number = Math.floor((Math.random() * 10)+20), 
                speed : number= Math.floor((Math.random() * 21)+90), 
                maxHp :number= Math.floor((Math.random()*41)+180)
                ){
        super(attack,defense,speed,maxHp)
    }
    playTurn(players:Character[],monsters:Character[]){
        let intendedCharacter : Character = players[0]
        let whichEnnemi :number = Math.floor(Math.random() * 10)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        
            this.damage(intendedCharacter)
    }
}
