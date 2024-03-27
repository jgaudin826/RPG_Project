import Character from "../character.ts"
export default class augmentor extends Character{
    orbe : string[] =[]
    boostCount:number=0
    constructor(name :string="augmentor",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100),
                manaNow : number= Math.floor(Math.random() * 100),
                manaMax : number= Math.floor(Math.random() * 100)
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
            this.orbe.splice(this.orbe.length-1,1)
            this.boost()
        }
    }
}