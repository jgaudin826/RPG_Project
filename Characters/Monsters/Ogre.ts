import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class Ogre extends Monster{
    public className:string="Ogre";
    public speedPosition:number=this.speed;
    public constructor(attack : number = Math.floor((Math.random() * 10)+55), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+75), 
                maxHp :number= Math.floor((Math.random() * 10)+195),
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(enemy:Character):object{
        this.damage(enemy,1.5)   
        return {play:false,stealObject:null}
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
        console.log(`${this.className} has made dammage to the ${intendedCharacter.className}:`+(this.attack - intendedCharacter.defense)+".")
    }
}
