import Character from "../character.ts"

export default class Warrior extends Character{
    className:string="Warrior";
    constructor(name :string="Warrior",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    playTurn(players:Character[],monsters:Character[]){
    }
}