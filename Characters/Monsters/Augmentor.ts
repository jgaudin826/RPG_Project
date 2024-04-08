import Character from "../Character.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class augmentor extends Monster{
    public className:string="Augmentor";
    public orbe : string[] =[]
    public boostCount:number=0
    public constructor(attack : number = Math.floor((Math.random() * 10)+50), 
                defense : number = Math.floor((Math.random() * 10)+25), 
                speed : number= Math.floor((Math.random() * 10)+100), 
                maxHp :number= Math.floor((Math.random() * 10)+195)
                ){
        super(attack,defense,speed,maxHp)
    }
    private rituel(){
        if (this.orbe.length<5){
            this.orbe.push("")
            this.boost()
        }
    }
    private boost(){
        this.maxHp=this.maxHp-(3*this.boostCount)+(3*this.orbe.length)
        this.currentHp=this.currentHp-(3*this.boostCount)+(3*this.orbe.length)
        this.attack=this.attack-(3*this.boostCount)+(3*this.orbe.length)
        this.defense=this.defense-(3*this.boostCount)+(3*this.orbe.length)
        this.boostCount = this.orbe.length
    }
    public damageReceve(){
        if (this.orbe.length>=1){
            this.orbe.pop()
            this.boost()
            console.log(`The ${this.className} has taken made dammage so he lost an orbe.`)
        }
    }
    public playTurn(players:Player[],monsters:Monster[]){
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