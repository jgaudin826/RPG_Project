import Character from "../character.ts"

export default class Barbarian extends Character{
    constructor(name :string="barbarian",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
    }
    berserkAttack(enemy:Character):boolean{
        if (this.currentHp- (this.maxHp*(20/100)) > 0){
            this.currentHp -= (this.maxHp*(20/100))
            enemy.currentHp -= ((this.attack - enemy.defense)*1.3)
            return true
        }
        return false
    }
    playTurn(players:Character[],monsters:Character[]){
        let canPlay: boolean = false
        while(canPlay==false){
            
        }
    }
}