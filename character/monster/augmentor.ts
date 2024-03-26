import Character from "../character.ts"
export default class augmentor extends Character{
    orbe : string[] =[]
    boostCount:number=0
    constructor(name :string, attack : number, defense :number , speed : number, maxHp :number,currentHp : number){
        super(name,attack,defense,speed,maxHp,currentHp)
    }
    rituel(){
        if (this.orbe.length<4){
            for(let i =0; i<2;i++){
                this.orbe.push("")
            }
            this.boost()
            return true 
        } else if (this.orbe.length=4){
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
            this.orbe.splice(this.orbe.length-1,1)
            this.boost()
        }
    }
}