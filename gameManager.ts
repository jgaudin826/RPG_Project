import Character from "./Characters/Character.ts"
import Object from "./Objects/Object.ts"
import Menu from "./menu.ts";
import Warrior from "./Characters/Players/Warrior"
import Mage from "./Characters/Players/Mage"
import Paladin from "./Characters/Players/Paladin"
import Barbarian from "./Characters/Players/Barbarian.ts"
import Priest from "./Characters/Players/Priest.ts"
import Thief from "./Characters/Players/Thief.ts"

export default class GameManagement {
    private static _game : GameManagement | null = null;
    private players : Character[] = [];
    private deadPlayers : Character[] = [];
    private objects : Object[] = [];

    public static get game() {
        if (!this._game) {
            this._game = new GameManagement()
        }
        return this._game
    }

    private constructor() {}

    /**
     * GameManager.game.start() : to start game
     */
    public start() {
        console.log("Game Started ?")
    }

    private createTeam() : Character[] {
        let playerTeam = []
        const options = [Warrior, Mage, Paladin, Barbarian, Priest, Thief]
        for (let i=1; i <= 3; i++) {
            const answer = new Menu(`Choose the class of adventurer ${i}`,["Warrior", "Mage", "Paladin", "Barbarian", "Priest", "Thief"]).input()
            this.players.push(new options[answer]())
        }
        return playerTeam
    }
}
