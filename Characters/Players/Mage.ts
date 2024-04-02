import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Player from "../Player.ts";

export default class Mage extends Player{
    className:string="mage";
    manaNow : number;
    manaMax : number;
    constructor(name :string="mage",
                team:string,
                attack : number = Math.floor((Math.random() * 10)+35), 
                defense : number = Math.floor((Math.random() * 5)+10), 
                speed : number= Math.floor((Math.random() * 10)+115), 
                maxHp :number= Math.floor((Math.random() * 20)+190),
                manaMax : number= 100
                ){
        super(name,team,attack,defense,speed,maxHp)
        this.manaMax = manaMax
        this.manaNow = manaMax
    }
    gainMana(percent : number){
        this.manaNow += (this.manaMax*(percent/100))
        if (this.manaNow > this.manaMax){
            this.manaNow = this.manaMax
        }
    }
    specialAttack(enemy : Character) : object{
        if (this.manaNow - (this.manaMax*(25/100))>= 0){
            this.manaNow -= (this.manaMax*(25/100))
            enemy.currentHP -= this.attack
            return {play:true,nameMonster:enemy.name}
        }
        return {play:true,stealObject:null}
    }
    playTurn(players:Character[],monsters:Character[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","Inventary","Quit"])
        const choice=menu.input()
        switch (choice){
            case 0:
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
                let numberMonster = menu.input()
                if (numberMonster===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                    break;
                }else{
                    this.damage(monsters[numberMonster])
                    console.log(`You've made dammage to the ${monsters[numberMonster].name}.`);
                    break;
                }
            case 1:
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
                numberMonster = menu.input()
                if (numberMonster===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                    break;
                }else{
                    let action:object=this.specialAttack(monsters[numberMonster])
                    if (action[0]===true){
                        console.log(`You've made dammage to the ${monsters[numberMonster].name}.`);
                        break;
                    } else {
                        console.log("You can't make this choice, your character has not enougth mana to do his special attack");
                        break;
                    }
                    
                }
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
        this.gainMana(10)
    }
}