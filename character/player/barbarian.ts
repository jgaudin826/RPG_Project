import Character from "../character.ts"

export default class Barbarian extends Character{
    berserkAttack(enemy:Character):boolean{
        if (this.currentHp- (this.maxHp*(20/100)) > 0){
            this.currentHp -= (this.maxHp*(20/100))
            enemy.currentHp -= ((this.attack - enemy.defense)*1.3)
            return true
        }
        return false
    }
}