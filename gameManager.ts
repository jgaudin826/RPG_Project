import Character from "./Characters/Character.ts"
import Object from "./Objects/Object.ts"

export default class GameManagement {
    private static _game : GameManagement | null = null;
    private players : Character[] = [];
    private deadPlayers : Character[] = [];
    private objects : Object[] = [];

    public static get game() {
        if (this._game == null) {
            this._game = new GameManagement()
        }
        return this._game
    }

    private constructor() {}

    /**
     * GameManager.game.start() : to start game
     */
    public start() {
        
    }

    public createTeam() : Character[] {
        return []
    }
}   