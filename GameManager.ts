import Character from "./Characters/Character.ts"
import Menu from "./Menu.ts"
import Warrior from "./Characters/Players/Warrior.ts"
import Mage from "./Characters/Players/Mage.ts"
import Paladin from "./Characters/Players/Paladin.ts"
import Barbarian from "./Characters/Players/Barbarian.ts"
import Priest from "./Characters/Players/Priest.ts"
import Thief from "./Characters/Players/Thief.ts"
import Inventory from "./Inventory.ts"
import Fight from "./fight.ts"
import Player from "./Characters/Player.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"

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
    start(){
        console.log("Game Started")
        this.players=this.createTeam()
        console.log("go to fight 1")
        this.players, this.deadPlayers = new Fight().startFight()
        console.log("go to chest room 1")
        this.chestRoom()
        console.log("go to fight 2")
        this.players, this.deadPlayers = new Fight().startFight()
        console.log("go to chest room 2")
        this.chestRoom()
        console.log("go to boss fight")
        let boss = [new Zombie()]
        this.players, this.deadPlayers = new Fight(boss).startFight()

    }
    
    /**
     * 
     */
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
        let menu = new Menu("Do you want to open the mysterious chest?", ["Open Chest", "Skip Room", "Quit"])
        let choice = menu.input()
        if (choice == 1){
            let trapProbability : number = Math.floor(Math.random() * 100)
            if (trapProbability < 30) {
                for (let i=0; i<this.players.length; i++) {
                    let dammage : number = Math.floor(Math.random() * 100)/2
                    this.players[i].currentHp -= (this.players[i].maxHp*dammage - this.players[i].defense)
                    if (this.players[i].currentHp < 0) {
                        this.players[i].currentHp = 0
                    }
                }
                this.checkDeadCharacters()
            } else {
                let stealObject : string | null
                let stealNumber : number = Math.floor(Math.random() * 100)
                if (stealNumber<5){
                    stealObject = "halfStar"
                } else if(5<=stealNumber && stealNumber<20) {
                    stealObject = "starFragment"
                } else if (60<=stealNumber && stealNumber<90){
                    stealObject = "potion"
                } else if (90<=stealNumber){
                    stealObject = "ether"
                } else {
                    stealObject = null
                }
            }
        }        
    }

    checkDeadCharacters() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].currentHp <= 0){
                console.log(`${this.players[i].className} is dead, what a loser!`)
                this.deadPlayers.push(this.players[i])
                this.players.splice(i, 1)
            }
        }
    }

}

