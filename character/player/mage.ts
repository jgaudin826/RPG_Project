import Character from "../character.ts"

export default class Mage extends Character{
    manaNow : number;
    manaMax : number;
    constructor(name :string, attack : number, defense :number , speed : number, maxHp :number,currentHp : number,manaNow : number,manaMax : number){
        super(name,attack,defense,speed,maxHp,currentHp)
        this.manaMax =manaMax
        this.manaNow =manaNow
    }
    gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax){
            this.manaNow = this.manaMax
        }
    }
    specialAbility(enemy : Character) : object{
        if (this.manaNow - (this.manaMax*(25/100))>= 0){
            this.manaNow -= (this.manaMax*(25/100))
            enemy.currentHp -= this.attack
            return {bool:true}
        }
        return {bool:false}
    }
}