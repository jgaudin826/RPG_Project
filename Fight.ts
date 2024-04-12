import Character from "./Characters/Character.ts"
import Augmentor from "./Characters/Monsters/Augmentor.ts"
import Dopplegenger from "./Characters/Monsters/Dopplegenger.ts"
import Golem from "./Characters/Monsters/Golem.ts"
import Vampire from "./Characters/Monsters/Vampire.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import GameManagement from "./GameManager.ts"
import Mage from "./Characters/Players/Mage.ts"
import Player from "./Characters/Player.ts"
import Screen from "./Screen.ts"

export default class Fight {
    players : Character[]
    monsters : Character[]
    order : Character[]
    allCharacters : Character[]
    deadPlayers : Character[]
    deadMonsters : Character[]

    constructor( boss? : Character[],) {
        this.players = GameManagement.game.players
        this.monsters = boss || this.createMonsters()
        this.order = this.getOrder()
        this.deadPlayers = GameManagement.game.deadPlayers
        this.deadMonsters = []
        this.allCharacters = this.players.concat(this.deadPlayers.concat(this.monsters.concat(this.deadMonsters)))
    }

    startFight() : Character[] {
        while (this.players.length > 0 || this.monsters.length > 0) {
            Screen.screen.displayFight(this.allCharacters, this.order)
            console.log(`it's ${this.order[0].className}'s turn`)
            //this.printStats(this.order[0])  // Test 
            this.order[0].playTurn(this.players, this.monsters)
            if (this.order[0].currentHp != 0) {
                this.order.push(this.order[0])
            }
            this.checkDeadCharacters()
            this.order.shift()
        }
        console.log("fight over")
        return this.players, this.deadPlayers
    }

    getOrder() : Character[] {
        let orderList : Character[] = this.players.concat(this.monsters)
        orderList.sort((a, b) => b.speed - a.speed)
        return orderList
    }

    createMonsters() : Character[] {
        let monsters : Character[] = []
        const monsterList = [Augmentor, Dopplegenger, Golem, Vampire, Zombie]
        for (let i=1; i <= 3; i++) {
            monsters.push(new monsterList[Math.floor(Math.random() * 5)]())
        }
        return monsters
    }

    checkDeadCharacters() {
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i].currentHp == 0){
                console.log(`${this.order[i].className} is dead, what a loser!`)
                if (this.order[i] instanceof Player){
                    this.deadPlayers.push(this.order[i])
                }
                this.deadMonsters.push(this.order[i])
                this.order.splice(i, 1)
            }
        }
    }

    printStats(character : Character) {
        console.log(
            `Character Stats : ${character.className} \n
            ---------------------------------\n
            Attack : ${character.attack}\n
            Defence : ${character.defense}\n
            Speed : ${character.speed}\n
            Max HP : ${character.maxHp}\n
            Current HP : ${character.currentHp}\n`)
        if (character instanceof Mage){
            console.log(`
            Max Mana : ${character.manaNow}\n
            Current Mana : ${character.manaNow}\n`)
        } else if (character instanceof Dopplegenger) {
            console.log(`
            Clone : ${character.clone}\n`)
        } else if (character instanceof Augmentor) {
            console.log(`
            Orbs : ${character.orbe.length}\n`)
        }
    }
}