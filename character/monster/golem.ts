import Character from "../character.ts"
export default class Golem extends Character{
    destruction(enemies:Character[]):boolean{
        enemies.forEach(enemy => {
            enemy.currentHp -= ((this.attack - enemy.defense)*0.6)
        });
        return true
    }
}