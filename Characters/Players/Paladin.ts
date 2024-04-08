import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Player from "../Player.ts";

export default class Paladin extends Player{
    className:string="paladin";
    constructor(attack : number = Math.floor((Math.random() * 20)+50), 
                defense : number = Math.floor((Math.random() * 10)+40), 
                speed : number= Math.floor((Math.random() * 20)+100), 
                maxHp :number= Math.floor((Math.random() * 20)+200)
                ){
        super(attack,defense,speed,maxHp)
    }
    specialAttack(enemy : Character):object {
        enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        return {play:true,stealObject:null} 
    }
    playTurn(players:Character[],monsters:Character[]){
        let menu = new Menu("What do you want to do?", ["Normal Attack","Special Attack","Quit"])
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
                    console.log(`You've made dammage to the ${monsters[numberMonster].className}.`)
                    if (monsters[numberMonster].className==="augmentor"){
                        monsters[numberMonster].damageReceve()
                    }
                }
            case 1:
                monsters.forEach(monster=>{
                    this.specialAttack(monster)
                    if (monster.className==="augmentor"){
                        monster.damageReceve()
                    }
                })
                console.log(`All enemy have taken damage.`)
                
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}