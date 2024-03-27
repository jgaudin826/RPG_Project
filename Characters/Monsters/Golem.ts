import Character from "../Character.ts";
import Monster from "../monster.ts";

export default class Golem extends Monster{
    className:string="golem";
    constructor(name :string="golem",
                team:string,
                attack : number = Math.floor((Math.random() * 10)+60), 
                defense : number = Math.floor((Math.random() * 10)+45), 
                speed : number= Math.floor((Math.random() * 20)+50), 
                maxHp :number= Math.floor((Math.random() * 50)+400)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(enemy:Character):object{
        enemy.currentHp -= ((this.attack - enemy.defense)*0.6)
        return {play:true,stealObject:null}
    }
    playTurn(players:Character[],monsters:Character[]){
        let whichAttack :number = Math.floor(Math.random() * 3)
        if (whichAttack===0){
            players.forEach(player=>{
                this.specialAttack(player)
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
        }
    }
}