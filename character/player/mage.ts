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
                manaMax : number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
        this.manaMax = manaMax
        this.manaNow = manaMax
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
    playTurn(players:Character[],monsters:Character[]){
        let canPlay: boolean = false
        while(canPlay==false){

        }
    }
}