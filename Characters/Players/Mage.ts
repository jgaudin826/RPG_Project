import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Inventory from "../../Inventory.ts";
import Player from "../Player.ts";

export default class Mage extends Player{
    public className:string="Mage";
    public manaNow : number;
    public manaMax : number;
    public constructor(attack : number = Math.floor((Math.random() * 10)+35), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+115), 
                maxHp :number= Math.floor((Math.random() * 20)+190),
                manaMax : number= 100
                ){
        super(attack,defense,speed,maxHp)
        this.manaMax = manaMax
        this.manaNow = manaMax
    }
    public gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax) this.manaNow = this.manaMax
    }
    public specialAttack(enemy : Character) : object{
        if (this.manaNow - (this.manaMax*(35/100))>= 0){
            this.manaNow -= (this.manaMax*(35/100))
            enemy.currentHp -= this.attack
            return {play:true,nameMonster:enemy.className}
        }
        return {play:false,stealObject:null}
    }
    public playTurn(players:Player[],monsters:Monster[]){
        this.gainMana(10)
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","inventary"])
        let choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                    break;
                }else{
                    this.damage(monsters[choice])
                    console.log(`You've made dammage to the ${monsters[choice].className}.`)
                    if (monsters[choice].className==="augmentor"){
                        monsters[choice].damageReceve()
                    }
                }
                break
            case 1:
                menu = new Menu("who do you want to attack?", Inventory.inventory.listNameCharacter(monsters))
                choice = menu.input()
                if (choice===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                    break;
                }else{
                    let action:object=this.specialAttack(monsters[choice])
                    if (action['play']===true){
                        console.log(`You've made dammage to the ${monsters[choice].className}.`)
                        if (monsters[choice].className==="augmentor"){
                            monsters[choice].damageReceve()
                        }
                    } else {
                        console.log("You can't make this choice, your character has not enougth mana to do his special attack")
                        this.playTurn(players,monsters)
                    }
                }
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
        this.gainMana(10)
    }
}