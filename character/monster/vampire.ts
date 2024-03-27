import Character from "../character.ts"
export default class Golem extends Character{
    constructor(name :string="vampire",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    vampirism(enemy:Character){
        enemy.currentHp -= (this.attack - enemy.defense)
        this.currentHp += (this.maxHp*((Math.floor(Math.random() * 6)+5)/100))
    }
    playTurn(players:Character[],monsters:Character[]){
        let enemy : Character = players[Math.floor(Math.random() * players.length)]
        this.damage(enemy)
    }
}