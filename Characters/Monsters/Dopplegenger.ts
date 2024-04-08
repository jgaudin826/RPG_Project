import Character from "../Character.ts";
import Monster from "../Monster.ts";

export default class Dopplegenger extends Monster{
    className:string="dopplegenger";
    clone :Character;
    manaNow : number;
    manaMax : number;
    constructor(attack : number = Math.floor((Math.random() * 10)+45), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 10)+195),
                manaMax : number= 100
                ){
        super(attack,defense,speed,maxHp)
        this.manaMax = manaMax
        this.manaNow = manaMax
    }
    playTurn(players:Character[],monsters:Character[]){
        this.clone= players[Math.floor(Math.random() * players.length)]
        let intendedCharacter : Character = players[0]
        let whichEnnemi :number = Math.floor(Math.random() * 10)
        let whichAttack :number = Math.floor(Math.random() * 3)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        if (whichAttack===0){
            if (this.clone.className=="priest"){
                intendedCharacter = this.playerWithLowestHP(monsters)
            }
            this.clone.specialAttack(intendedCharacter)
        }else{
            this.damage(intendedCharacter)
        }
    }
}
