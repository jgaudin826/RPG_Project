import Character from "./Characters/Character.ts"
import Menu from "./Menu.ts";
import Warrior from "./Characters/Players/Warrior.ts"
import Mage from "./Characters/Players/Mage.ts"
import Paladin from "./Characters/Players/Paladin.ts"
import Barbarian from "./Characters/Players/Barbarian.ts"
import Priest from "./Characters/Players/Priest.ts"
import Thief from "./Characters/Players/Thief.ts"
import Inventory from "./Inventory.ts";
import Fight from "./fight.ts";

export default class GameManagement {
    private static _game : GameManagement | null = null;
    players : Character[] = [];
    deadPlayers : Character[] = [];

    static get game() {
        if (!this._game) {
            this._game = new GameManagement()
        }
        return this._game
    }

    private constructor() {}

    /**
     * GameManager.game.start() : to start game
     */
    start() {
        console.log("Game Started")
        this.players=this.createTeam()
        for (let i=0; i<3; i++) {
            console.log("go to fight")
            this.players, this.deadPlayers = new Fight().startFight()
            console.log("go to chest room (not implemented)")
        }
        

    }

    createTeam() : Character[] {
        let playerTeam : Character[] = []
        const options = [Warrior, Mage, Paladin, Barbarian, Priest, Thief]
        for (let i=1; i <= 3; i++) {
            const answer = new Menu(`Choose the class of adventurer ${i}`,["Warrior", "Mage", "Paladin", "Barbarian", "Priest", "Thief"]).input()
            playerTeam.push(new options[answer]())
        }
        return playerTeam
    }

    chestRoom(){
        
    }
}
