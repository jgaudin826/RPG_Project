import Character from "./Characters/Character.ts"
import Mage from "./Characters/Players/Mage.ts"

export default class Inventory {
    public nPotions : number = 2;
    public nStarFragments : number = 1;
    public nHalfStars : number = 0;
    public nEthers : number = 1;
    private static _Inventory : Inventory | null = null

    private constructor() {}

    static get inventory() {
        if(!this._Inventory) {
            this._Inventory = new Inventory()
        }
        return this._Inventory
    }

    public usePotion(character : Character) {
        if (this.nPotions <= 0){
            console.log('Not enough potions !')
        } else {
            this.heal(character, 50)
        }
    }

    public useStarFragment(character : Character) {
        if (this.nStarFragments <= 0){
            console.log('Not enough star fragments !')
        } else {
            if (character.currentHP <= 0){
                this.resurrect(character, 20)
            } else {
                this.heal(character, 50)
            }
        }
    }

    public useHalfStar(character : Character) {
        if (this.nHalfStars <= 0){
            console.log('Not enough half stars !')
        } else {
            if (character.currentHP <= 0){
                this.resurrect(character, 100)
            } else {
                this.heal(character, 100)
            }
        }
    }

    public useEther(character : Mage) {
        if (this.nEthers <= 0){
            console.log('Not enough ethers !')
        } else if (character.className == 'Mage'){
            character.gainMana(30)
        } else {
            console.log("You can't use ethers with this character")
            
        }
    }

    private heal(character : Character, percent : number) {
        if(character.currentHP <= 0){
            console.log("You can't heal a dead character !")
        } else {
            if(character.currentHP > character.currentHP + character.maxHP*(percent/100)) {
                character.currentHP = character.maxHP
            } else {
                character.currentHP += character.maxHP*(percent/100)
            }
        }
    }

    private resurrect(character : Character, percent : number) {
        if(character.currentHP <= 0) {
            character.currentHP += character.maxHP*(percent/100)
        } else {
            console.log("You can't resurrect a character who's already alive !")
        }
    }
}

