import Character from "./Character.ts";


export default abstract class Monster extends Character{
    public damageReceve(){}
    public specialAttack(enemy : Character):object {return {play:false,object:enemy}}
    protected playerWithLowestHP(characters:Character[]):Character{
        let player : Character =characters[0]
        let lowerHP : number = characters[0].currentHp
        characters.forEach(character => {
            if ((character.currentHp/character.maxHp)*100<(lowerHP/character.maxHp)*100){
                player=character
                lowerHP=character.currentHp
            }
        });
        return player
    }
}
