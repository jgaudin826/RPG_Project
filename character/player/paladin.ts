import Character from "../character.ts";
import Menu from "../../menu.ts";
import Player from "./player.ts";

export default class Paladin extends Player{
    className:string="paladin";
    constructor(name :string="paladin",
                team:string="player",
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    specialAttack(enemy : Character):object {
        enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
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
                }else{
                    this.damage(monsters[numberMonster])
                    console.log(`You've made dammage to the ${monsters[numberMonster].name}.`)
                }
            case 1:
                monsters.forEach(monster=>{
                    this.specialAttack(monster)
                })
                console.log(`All enemy have taken damage.`)
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}