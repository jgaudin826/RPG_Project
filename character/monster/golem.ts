import Character from "../character.ts"
export default class Golem extends Character{
    constructor(name :string="golem",
                team:string,
                attack : number = Math.floor(Math.random() * 100), 
                defense : number = Math.floor(Math.random() * 100), 
                speed : number= Math.floor(Math.random() * 100), 
                maxHp :number= Math.floor(Math.random() * 100),
                manaNow : number= Math.floor(Math.random() * 100),
                manaMax : number= Math.floor(Math.random() * 100)
                ){
        super(name,team,attack,defense,speed,maxHp)
}
    destruction(enemies:Character[]){
        enemies.forEach(enemy => {
            enemy.currentHp -= ((this.attack - enemy.defense)*0.6)
        });
    }
}