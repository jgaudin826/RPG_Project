import Character from "../character/character.ts"

export default interface resurrect extends Character {
    resurrect() : void;
}

    /*resurrect(percent : number) {
        if(this.currentHP <= 0) {
            this.currentHP += this.maxHP*(percent/100)
        } else {
            console.log("On ne ressucite pas un un personnage déjà vivant !")
        }
    }*/