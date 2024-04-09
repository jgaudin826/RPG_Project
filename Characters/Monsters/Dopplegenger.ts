import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class Dopplegenger extends Monster{
    public className:string="Dopplegenger";
    public clone :Character;
    public constructor(attack : number = Math.floor((Math.random() * 10)+45), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 10)+195),
                ){
        super(attack,defense,speed,maxHp)
    }
    public playTurn(players:Player[],monsters:Monster[]){
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
        console.log(`${this.className} has made dammage to the ${intendedCharacter.className}:`+(this.attack - intendedCharacter.defense)+".")
    }
}
