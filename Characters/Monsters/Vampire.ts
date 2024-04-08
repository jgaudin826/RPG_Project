import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class vampire extends Monster{
    public className:string="Vampire";
    public constructor(attack : number = Math.floor((Math.random() * 20)+70), 
                defense : number = Math.floor((Math.random() * 5)+15), 
                speed : number= Math.floor((Math.random() * 10)+95), 
                maxHp :number= Math.floor((Math.random() * 20)+165)
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(enemy:Character):object{
        enemy.currentHp -= (this.attack - enemy.defense)
        this.currentHp += (this.maxHp*((Math.floor(Math.random() * 6)+5)/100))
        return {play:true,stealObject:null}
    }
    public playTurn(players:Player[],monsters:Monster[]){
        let intendedCharacter : Character = players[0]
        let whichEnnemi :number = Math.floor(Math.random() * 10)
        let whichAttack :number = Math.floor(Math.random() * 3)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        if (whichAttack===0){
            this.specialAttack(intendedCharacter)
        }else{
            this.damage(intendedCharacter)
        }
    }
}