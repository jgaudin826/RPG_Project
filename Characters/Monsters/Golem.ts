import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class Golem extends Monster{
    public className:string="Golem";
    public constructor(attack : number = Math.floor((Math.random() * 10)+60), 
                defense : number = Math.floor((Math.random() * 10)+45), 
                speed : number= Math.floor((Math.random() * 20)+50), 
                maxHp :number= Math.floor((Math.random() * 50)+400)
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(enemy:Character):object{
        this.damage(enemy,0.3)
        return {play:true,stealObject:null}
    }
    public playTurn(players:Player[],monsters:Monster[]){
        let whichAttack :number = Math.floor(Math.random() * 3)
        if (whichAttack===0){
            players.forEach(player=>{
                this.specialAttack(player)
                console.log(`${this.className} has made dammage to the ${player.className}:`+(Math.round((this.attack - player.defense)*0.6))+".")
            })
        }else{
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
}