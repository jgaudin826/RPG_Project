import Character from "../character.ts"
export default class Golem extends Character{
    vampirism(enemy:Character):boolean{
        enemy.currentHp -= (this.attack - enemy.defense)
        this.currentHp += (this.maxHp*(Math.floor(Math.random() * 5)+5))
        return true
    }
}