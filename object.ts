import Character from "./character/character.ts"
export class Object {
    name : string;
    hpGain : number;
    resurectGain : number;
    manaGain : number;

    constructor(name : string, hpGain : number, resurectGain : number, manaGain : number) {
        this.name = name
        this.hpGain = hpGain
        this.resurectGain = resurectGain
        this.manaGain = manaGain
    }

    heal(charcter : Character) {
        if (this.name == "Ether" ) {
            console.log("Ether ne peut pas utiliser la fonction Heal!")
        } else {
            character.heal(this.hpGain)
        }
    }

    resurect(charater : Character) {
        if (this.name == "Ether") {
            console.log("Ether ne peut pas utiliser la fonction Heal!")
        } else {
            if (character.currentHp < 0) {
                character.heal(this.hpGain)
            } else {
                character.resurect(this.resurectGain)
            }
        }
    }

    gainMana(mage : Mage) {
        if (this.name != "Ether") {
            console.log("Only Ether can use gainMana")
        } else {
            mage.gainMana(this.manaGain)
        }
    }
}