import Character from "../character.ts"

export default class Mage extends Character{
    manaNow : number;
    manaMax : number;
    constructor(name :string, attack : number, defense :number , speed : number, hpMax :number,currentHP : number,manaNow : number,manaMax : number){
        super(name,attack,defense,speed,hpMax,currentHP)
        this.manaMax =manaMax
        this.manaNow =manaNow
    }
    gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax){
            this.manaNow = this.manaMax
        }
    }
    MagicAttack(enemy : Character) : boolean{
        if (this.manaNow - (this.manaMax*(25/100))>= 0){
            this.manaNow -= (this.manaMax*(25/100))
            enemy.currentHP -= this.attack
            return true
        }
        return false
    }
}