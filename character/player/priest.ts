import Character from "../character.ts"

export default class Priest extends Character{
    constructor(name :string="priest",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    regeneration(ally : Character){
        ally.heal(25)
    }
    playTurn(players:Character[],monsters:Character[]){
    }
}