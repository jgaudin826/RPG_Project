import Character from "../Character.ts";
import Menu from "../../Menu.ts";
import Monster from "../Monster.ts";
import Player from "../Player.ts";

export default class Thief extends Player{
    public className:string="Thief";
    public constructor(attack : number = Math.floor((Math.random() * 10)+45), 
                defense : number = Math.floor((Math.random() * 10)+20), 
                speed : number= Math.floor((Math.random() * 30)+135), 
                maxHp :number= Math.floor((Math.random() * 20)+165)
                ){
        super(attack,defense,speed,maxHp)
    }
    public specialAttack(enemy:Character):object{
        let stealObject : string | null
        let stealNumber : number = Math.floor(Math.random() * 100);
        if (stealNumber<5){
            stealObject = "halfStar"
        } else if(5<=stealNumber && stealNumber<20) {
            stealObject = "starFragment"
        } else if (60<=stealNumber && stealNumber<90){
            stealObject = "potion"
        } else if (90<=stealNumber){
            stealObject = "ether"
        } else {
            stealObject = null
        }
        return {play:true,stealObject:stealObject}
    }
    public playTurn(players:Player[],monsters:Monster[]){
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
                break
            case 1:
                menu = new Menu("who do you want to attack?", this.listNameCharacter(monsters))
                numberMonster = menu.input()
                if (numberMonster===undefined){
                    console.log("You can't make this choice, choose an other one")
                    this.playTurn(players,monsters)
                }else{
                    let action:object=this.specialAttack(monsters[numberMonster])
                    if (action[1]===null){
                        console.log(`You've stole nothing, you character missed!}`)
                    } else {
                        console.log(`You've stole the object : ${action[1]}.`)
                    }
                }
                break
            default:
                console.log("You can't make this choice, choose an other one")
                this.playTurn(players,monsters)
                
        }
    }
}