import Character from "./Characters/Character.ts"
import Mage from "./Characters/Players/Mage.ts"
//import Menu from "./Menu.ts";

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

    public inventoryManager() : boolean{
        /*menu = new Menu("who do you want to heal?",[])
        let numberPlayer = menu.input()*/
        return true
    }

    public usePotion(character : Character) {
        if (this.nPotions <= 0){
            console.log('Not enough potions !')
        } else {
            character.heal(50)
        }
    }

    public useStarFragment(character : Character) {
        if (this.nStarFragments <= 0){
            console.log('Not enough star fragments !')
        } else {
            if (character.currentHp <= 0){
                character.resurrect(20)
            } else {
                character.heal(50)
            }
        }
    }

    public useHalfStar(character : Character) {
        if (this.nHalfStars <= 0){
            console.log('Not enough half stars !')
        } else {
            if (character.currentHp <= 0){
                character.resurrect(100)
            } else {
                character.heal(100)
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

    
}

