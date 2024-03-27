import Character from "../Character.ts"
export default class augmentor extends Character{
    className:string="augmentor";
    orbe : string[] =[]
    boostCount:number=0
    constructor(name :string="augmentor",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    rituel(){
        if (this.orbe.length<5){
            this.orbe.push("")
            this.boost()
            return true
        } else {
            return false
        }
    }
    boost(){
        this.maxHp=this.maxHp-(3*this.boostCount)+(3*this.orbe.length)
        this.currentHp=this.currentHp-(3*this.boostCount)+(3*this.orbe.length)
        this.attack=this.attack-(3*this.boostCount)+(3*this.orbe.length)
        this.defense=this.defense-(3*this.boostCount)+(3*this.orbe.length)
        this.boostCount = this.orbe.length
    }
    damageReceve(){
        if (this.orbe.length>=1){
            this.orbe.pop()
            this.boost()
        }
    }
    playTurn(players:Character[],monsters:Character[]){
        this.rituel()
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