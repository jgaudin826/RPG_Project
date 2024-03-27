import Character from "./character";


export default class Monster extends Character{
    playerWithLowestHP(characters:Character[]):Character{
        let player : Character =characters[0]
        let lowerHP : number = characters[0].currentHp
        characters.forEach(character => {
            if (character.currentHp<lowerHP){
                player=character
                lowerHP=character.currentHp
            }
        });
        return player
    }
}
