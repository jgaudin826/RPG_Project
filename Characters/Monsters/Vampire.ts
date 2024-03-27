import Character from "../Character.ts"
export default class vampire extends Character{
    className:string="vampire";
    constructor(name :string="vampire",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(enemy:Character):object{
        enemy.currentHp -= (this.attack - enemy.defense)
        this.currentHp += (this.maxHp*((Math.floor(Math.random() * 6)+5)/100))
        return {play:true,stealObject:null}
    }
    playTurn(players:Character[],monsters:Character[]){
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