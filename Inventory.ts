import Character from "./Characters/Character.ts"
import Mage from "./Characters/Players/Mage.ts"

/**
 * Singleton class that handles the inventory during the whole game
 * 
 * @property nPotions : number of potions in the inventory
 * @property nStarFragments : number of star fragments in the inventory
 * @property nHalfStars : number of half stars in the inventory
 * @property nEthers : number of ether in the inventory
 * @property _inventory : the singleton Inventory instance
 */
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

    /**
     * Handles the potion
     * - Checks if there is enough
     * - Checks if the character has low HP in order to use this item
     * 
     * @param character the character that will be affected by the item
     * @returns message description of the action done, It has a space in from if no action has been done
     */
    public usePotion(character : Character):string {
        if (this.nPotions <= 0){
            return ' Not enough potions ! Choose another item in your inventory'
        }else if (character.currentHp==character.maxHp){
            return ` ${character.name} (${character.className}) has to much hp, you cannot currently use a potion on ${character.name}.`
        } else {
            character.heal(50)
            this.nPotions-=1
            return `You have successfuly healed ${character.name} (${character.className})`
        }
    }

    /**
     * Handles the star fragments
     * - Checks if there is enough
     * - Checks if the character has low HP in order to use this item
     * - Checks if it is used as a resurection or heal
     * 
     * 
     * @param character the character that will be affected by the item
     * @returns message description of the action done, It has a space in from if no action has been done
     */
    public useStarFragment(character : Character):string {
        if (this.nStarFragments <= 0){
            return " Not enough star fragments ! Choose another item in your inventory."
        }else if (character.currentHp==character.maxHp){
            return ` ${character.name} (${character.className}) has to much hp, you cannot currently use a star fragment on ${character.name}.`
        } else {
            if (character.currentHp <= 0){
                character.resurrect(20)
                this.nStarFragments-=1
                return `You have successfuly resurected ${character.name} (${character.className})`
            } else {
                character.heal(50)
                this.nStarFragments-=1
                return `You have successfuly healed ${character.name} (${character.className})`
            }
        }
    }

    /**
     * Handles the half stars
     * - Checks if there is enough
     * - Checks if the character has low HP in order to use this item
     * - Checks if it is used as a resurection or heal
     * 
     * @param character the character that will be affected by the potion
     * @returns message description of the action done, It has a space in from if no action has been done
     */
    public useHalfStar(character : Character):string {
        if (this.nHalfStars <= 0){
            return " Not enough half stars ! Choose another item in your inventory."
        }else if (character.currentHp==character.maxHp){
            return ` ${character.name} (${character.className}) has to much hp, you cannot currently use a half star on ${character.name}.`
        } else {
            if (character.currentHp <= 0){
                character.resurrect(100)
                this.nHalfStars-=1
                return `You have successfuly resurected ${character.name} (${character.className})`
            } else {
                character.heal(100)
                this.nHalfStars-=1
                return `You have successfuly healed ${character.name} (${character.className})`
            }
        }
    }

    /**
     * Handles the ether
     * - Checks if there is enough
     * - Checks if the character is a mage
     * - Checks if the mage has enough mana
     * 
     * @param character the character that will be affected by the potion
     * @returns message description of the action done, It has a space in from if no action has been done
     */
    public useEther(character : Character):string {
        if (this.nEthers <= 0){
            return " Not enough ethers ! Choose another item in your inventory."
        } else if (character instanceof Mage && character.manaNow==character.manaMax){
            return ` ${character.name} (${character.className}) has to much mana, you cannot currently use ether on ${character.name}.`
        } else if (character instanceof Mage){
            character.gainMana(30)
            this.nEthers-=1
            return `You have successfuly added mana to ${character.name} (${character.className})`
        } else {
            return ` ${character.name} (${character.className}) is not a mage, you can't use this ether on a a ${character.className}.`
        }
    }
}

