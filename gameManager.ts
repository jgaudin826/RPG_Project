import Character from "./Characters/Character.ts"

export default class GameManagement {
    private static _game : GameManagement | null = null;
    private players : Character[] = [];
    private deadPlayers : Character[] = [];

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