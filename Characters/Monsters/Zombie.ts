import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class Zombie extends Monster{
    public className:string="Zombie";
    public speedPosition:number=this.speed;
    public constructor(attack : number = Math.floor((Math.random() * 20)+40), 
                defense : number = Math.floor((Math.random() * 10)+20), 
                speed : number= Math.floor((Math.random() * 21)+90), 
                maxHp :number= Math.floor((Math.random()*41)+180)
                ){
        super(attack,defense,speed,maxHp)
    }
    public playTurn(players:Player[],monsters:Monster[]){
        let intendedCharacter : Character = players[0]
        let whichEnnemi :number = Math.floor(Math.random() * 10)
        if (whichEnnemi>3 && whichEnnemi<6){
            intendedCharacter = this.playerWithLowestHP(players)
        } else {
            intendedCharacter = players[Math.floor(Math.random() * players.length)]
        }
        this.damage(intendedCharacter)
        console.log(`${this.className} has made dammage to the ${intendedCharacter.className}:`+(this.attack - intendedCharacter.defense)+".")
    }
}
