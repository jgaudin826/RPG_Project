import Character from "../character.ts"

export default class Mage extends Character{
    manaNow : number;
    manaMax : number;
    constructor(name :string="mage",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100),
                manaNow : number= Math.floor(Math.random() * 100),
                manaMax : number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
        this.manaMax = Math.floor(Math.random() * 100)
        this.manaNow = Math.floor(Math.random() * 100)
    }
    gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax){
            this.manaNow = this.manaMax
        }
    }
    magicAttack(enemy : Character) : boolean{
        if (this.manaNow - (this.manaMax*(25/100))>= 0){
            this.manaNow -= (this.manaMax*(25/100))
            enemy.currentHp -= this.attack
            return true
        }
        return false
    }
}