import Character from "./Characters/Character.ts"

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

    public inventoryManager() {

    }

    public usePotion(character : Character) {
        if (this.nPotions <= 0){
            console.log('Not enough potions !')
        } else {
            this.heal(50, character)
        }
    }

    public useStarFragment(character : Character) {
        if (this.nStarFragments <= 0){
            console.log('Not enough star fragments !')
        } else {
            if (character.currentHp <= 0){
                this.resurrect(20, character)
            } else {
                this.heal(50, character)
            }
        }
    }

    public useHalfStar(character : Character) {
        if (this.nHalfStars <= 0){
            console.log('Not enough half stars !')
        } else {
            if (character.currentHp <= 0){
                this.resurrect(100, character)
            } else {
                this.heal(100, character)
            }
        }
    }

    public useEther(character : Character) {
        if (this.nEthers <= 0){
            console.log('Not enough ethers !')
        } else if (character.className == 'Mage'){
            
        }
    }

    private heal(percent : number, character : Character) {

    }

    private resurrect(percent : number, character : Character) {

    }
}
