import Character from "../character/character.ts"

export default interface heal extends Character {
    heal() : void;
}

   /* heal(percent : number) {
        if(this.currentHP <= 0){
            console.log("On ne soigne pas un mort !")
        } else {
            if(this.currentHP > this.currentHP + this.maxHP*(percent/100)) {
                this.currentHP = this.maxHP
            } else {
                this.currentHP += this.maxHP*(percent/100)
            }
        }
    }*/