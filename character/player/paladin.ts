import Character from "../character.ts"

export default class Paladin extends Character{
    specialAbility(enemy : Character) : object{
        enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        return {bool:true}
    }
}