import Character from "../character.ts"

export default class Zombie extends Character{
    constructor(name :string="zombie",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    playTurn(players:Character[],monsters:Character[]){
        let enemy : Character = players[Math.floor(Math.random() * players.length)]
        this.damage(enemy)
    }
}