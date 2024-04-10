import Character from "./Characters/Character.ts"
import Mage from "./Characters/Players/Mage.ts"
import Menu from "./Menu.ts";
import GameManagement from "./GameManager.ts";
import Player from "./Characters/Player.ts";

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
        let menu = new Menu("What do you want to use?",["Potion","Star Fragment", "Half Star","Ether", "Quit the Inventory"])
        let choice = menu.input()
        switch (choice){
            case 0:
                menu = new Menu("On who do you want to use it?",this.listNameCharacter(GameManagement.game.players))
                choice=menu.input()
                if(!this.usePotion(GameManagement.game.players[choice])){
                    this.inventoryManager()
                }else{
                    return false
                }
            case 1:
                 menu = new Menu("On who do you want to use it?",this.listNameCharacter(GameManagement.game.players))
                 choice=menu.input()
                 if(!this.useStarFragment(GameManagement.game.players[choice])){
                    this.inventoryManager()
                }else{
                    return false
                }
            case 2:
                menu = new Menu("On who do you want to use it?",this.listNameCharacter(GameManagement.game.players))
                choice=menu.input()
                if(!this.useHalfStar(GameManagement.game.players[choice])){
                    this.inventoryManager()
                }else{
                    return false
                }
            case 3:
                menu = new Menu("On who do you want to use it?",this.listNameCharacter(GameManagement.game.players))
                choice=menu.input()
                if(!this.useEther(GameManagement.game.players[choice])){
                    this.inventoryManager()
                }else{
                    return false
                }
            case 4:
                return true
            default:
                console.log("You can't make this choice, choose an other one")
                this.inventoryManager()
        }
        return false
    }

    public usePotion(character : Character):boolean {
        if (this.nPotions <= 0){
            console.log('Not enough potions !')
            return false
        } else {
            character.heal(50)
            return true
        }
    }

    public useStarFragment(character : Character):boolean {
        if (this.nStarFragments <= 0){
            console.log('Not enough star fragments !')
            return false
        } else {
            if (character.currentHp <= 0){
                character.resurrect(20)
            } else {
                character.heal(50)
            }
            return true
        }
    }

    public useHalfStar(character : Character):boolean {
        if (this.nHalfStars <= 0){
            console.log('Not enough half stars !')
            return false
        } else {
            if (character.currentHp <= 0){
                character.resurrect(100)
            } else {
                character.heal(100)
            }
            return true
        }
    }

    public useEther(character : Character):boolean {
        if (this.nEthers <= 0){
            console.log('Not enough ethers !')
            return false
        } else if (character instanceof Mage){
            character.gainMana(30)
            return true
        } else {
            console.log("You can't use ethers with this character")
            return false
        }
    }

    public listNameCharacter(characters:Character[]):string[]{
        let listName:string[]=[]
        characters.forEach(Element => {
            listName.push(Element.className)
        });
        return listName
    }
}

