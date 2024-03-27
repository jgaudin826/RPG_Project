import Character from "../character.ts";
import Monster from "../monster.ts";

export default class Dopplegenger extends Monster{
    className:string="dopplegenger";
    clone :Character
    constructor(name :string="dopplegenger",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
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
