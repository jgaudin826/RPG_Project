import Character from "../character.ts"

export default class Paladin extends Character{
    saintAttack(enemies : Character[]) : boolean{
        enemies.forEach(enemy => {
            enemy.currentHp -= ((this.attack - enemy.defense)*0.4)
        });
        return true
    }
}