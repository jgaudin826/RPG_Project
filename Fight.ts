import Character from "./Characters/Character.ts"
import Augmentor from "./Characters/Monsters/Augmentor.ts"
import Dopplegenger from "./Characters/Monsters/Dopplegenger.ts"
import Golem from "./Characters/Monsters/Golem.ts"
import Vampire from "./Characters/Monsters/Vampire.ts"
import Zombie from "./Characters/Monsters/Zombie.ts"
import GameManagement from "./GameManager.ts"
import Mage from "./Characters/Players/Mage.ts"

export default class Fight {
    players : Character[]
    monsters : Character[]
    order : Character[]
    deadPlayers : Character[]

    constructor() {
        this.players = GameManagement.game.players
        this.monsters = this.createMonsters()
        this.order = this.getOrder()
        this.deadPlayers = []
    }

    startFight() : Character[] {
        console.log("fight started")
        console.log("here is the list of monsters")
        for (let monster of this.monsters) {
            console.log(`${monster.className}`)
        }
        console.log("Fight has started!")
        let round = 1
        while (this.players.length > 0 || this.monsters.length > 0) {
            console.log(`Round ${round}`)
            round++
            console.log(`it's ${this.order[0].className}'s turn`)
            this.printStats(this.order[0])
            this.order[0].playTurn(this.players, this.monsters)
            if (this.order[0].currentHp == 0) {
                this.deadPlayers.push(this.order[0])
            } else {
                this.order.push(this.order[0])
            }
            this.order.shift()
            this.checkDeadCharacters()
        }
        console.log("fight over")
        return this.players, this.deadPlayers
    }

    getOrder() : Character[] {
        let orderList : Character[] = []
        let i = 0;
        let j = 0;
        while (i < this.players.length && j < this.monsters.length) {  
            if (this.players[i].speed < this.monsters[j].speed) {
                orderList.push(this.players[i])
                i++;
            } else {
                orderList.push(this.monsters[j])
                j++;
            }
        }
        while (i < this.players.length) {
            orderList.push(this.players[i])
            i++;
        }
        while (j < this.monsters.length) {
            orderList.push(this.monsters[j])
            j++
        }
        return orderList
    }

    createMonsters() : Character[] {
        let monsters : Character[] = []
        const monsterList = [Augmentor, Dopplegenger, Golem, Vampire, Zombie]
        for (let i=1; i <= 3; i++) {
            monsters.push(new monsterList[Math.floor(Math.random() * 6)]())
        }
        return monsters
    }

    checkDeadCharacters() {
        for (let i = 0; i < this.order.length; i++) {
            if (this.order[i].currentHp == 0){
                console.log(`${this.order[i].className} is dead, what a loser!`)
                this.deadPlayers.push(this.order[i])
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
