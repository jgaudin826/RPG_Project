import Character from "./Characters/Character.ts"
import Mage from "./Characters/Players/Mage.ts"
import Screen from "./Screen.ts";

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

    public usePotion(character : Character):boolean {
        if (this.nPotions <= 0){
            Screen.screen.displayScreen('Not enough potions ! Choose another item in your inventory')
            return false
        }else if (character.currentHp==character.maxHp){
            Screen.screen.displayScreen(`${character.name} (${character.className}) has to much hp, you cannot currently use a potion on ${character.name}.`)
            return false
        } else {
            character.heal(50)
            this.nPotions-=1
            return true
        }
    }

    public useStarFragment(character : Character):boolean {
        if (this.nStarFragments <= 0){
            Screen.screen.displayScreen('Not enough star fragments ! Choose another item in your inventory.')
            return false
        }else if (character.currentHp==character.maxHp){
            Screen.screen.displayScreen(`${character.name} (${character.className}) has to much hp, you cannot currently use a star fragment on ${character.name}.`)
            return false
        } else {
            if (character.currentHp <= 0){
                character.resurrect(20)
            } else {
                character.heal(50)
            }
            this.nStarFragments-=1
            return true
        }
    }

    public useHalfStar(character : Character):boolean {
        if (this.nHalfStars <= 0){
            Screen.screen.displayScreen('Not enough half stars ! Choose another item in your inventory.')
            return false
        }else if (character.currentHp==character.maxHp){
            Screen.screen.displayScreen(`${character.name} (${character.className}) has to much hp, you cannot currently use a half star on ${character.name}.`)
            return false
        } else {
            if (character.currentHp <= 0){
                character.resurrect(100)
            } else {
                character.heal(100)
            }
            this.nHalfStars-=1
            return true
        }
    }

    public useEther(character : Character):boolean {
        if (this.nEthers <= 0){
            Screen.screen.displayScreen('Not enough ethers ! Choose another item in your inventory.')
            return false
        } else if (character instanceof Mage && character.manaNow==character.manaMax){
            Screen.screen.displayScreen(`${character.name} (${character.className}) has to much mana, you cannot currently use ether on ${character.name}.`)
            return false
        } else if (character instanceof Mage){
            character.gainMana(30)
            this.nEthers-=1
            return true
        } else {
            Screen.screen.displayScreen(`${character.name} (${character.className}) is not a mage, you can't use this ether  on a a ${character.className}.`)
            return false
        }
    }
}

