import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";
import Inventory from "../../Inventory.ts";

export default class Paladin extends Player{
    public className:string="Paladin";
    constructor(attack : number = Math.floor((Math.random() * 20)+50), 
                defense : number = Math.floor((Math.random() * 10)+40), 
                speed : number= Math.floor((Math.random() * 20)+100), 
                maxHp :number= Math.floor((Math.random() * 20)+200)
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(enemy : Character):object {
        this.damage(enemy,0.4)
        return {play:true,stealObject:null} 
    }
    public playTurn(players:Player[],monsters:Monster[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","inventary"])
        let choice=menu.input()
        switch (choice){
            case 0:
                console.log("here")
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    this.damage(monsters[choice])
                    console.log(`You've made dammage to the ${monsters[choice].className}.`)
                    if (monsters[choice].className==="augmentor"){
                        monsters[choice].damageReceve()
                    }
                }
                break
            case 1:
                monsters.forEach(monster=>{
                    this.specialAttack(monster)
                    if (monster.className==="augmentor"){
                        monster.damageReceve()
                    }
                })
                console.log(`All enemy have taken damage.`)
                break
            case 2:
                if(!Inventory.inventory.inventoryManager()){
                    this.playTurn(players,monsters)
                }
                break
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)    
        }
    }
}