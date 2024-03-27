import Character from "../character.ts"

export default class Paladin extends Character{
    className:string="paladin";
    constructor(name :string="paladin",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(enemy : Character):object {
        enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        return {play:true,stealObject:null} 
    }
    playTurn(players:Character[],monsters:Character[]){
    }
}