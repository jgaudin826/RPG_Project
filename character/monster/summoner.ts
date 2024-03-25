import Character from "../character.ts"
export default class Golem extends Character{
    summon : Character[];
    boostCount:number;
    constructor(name :string, attack : number, defense :number , speed : number, maxHp :number,currentHp : number,summon : Character[],boostCount:number=0){
        super(name,attack,defense,speed,maxHp,currentHp)
        this.summon=summon
    }
    rituel(){
        if (this.summon.length<4){
            for(let i =0; i<2;i++){
                let squeleton = new Character("squeleton",2,2,2,3,3)
                this.summon.push(squeleton)
            }
            this.boost()
            return true 
        } else if (this.summon.length=4){
            let squeleton = new Character("squeleton",2,2,2,3,3)
            this.summon.push(squeleton)
            this.boost()
            return true
        } else {
            return false
        }
    }
    boost(){
        this.maxHp=this.maxHp-(3*this.boostCount)+(3*this.summon.length)
        this.currentHp=this.currentHp-(3*this.boostCount)+(3*this.summon.length)
        this.attack=this.attack-(3*this.boostCount)+(3*this.summon.length)
        this.defense=this.defense-(3*this.boostCount)+(3*this.summon.length)
        this.boostCount = this.summon.length
    }
    damageReceve(){
        if (this.summon.length>=1){
            this.summon.splice(this.summon.length-1,1)
            this.boost()
        }
    }
}