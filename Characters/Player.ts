import Character from "./Character.ts"

export default abstract class Player extends Character{
    public specialAttack(enemy : Character):object {return {play:false,object:enemy}}
}