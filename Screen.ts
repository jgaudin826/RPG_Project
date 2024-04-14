import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import Character from "./Characters/Character.ts"
import Inventory from "./Inventory.ts"
import Fight from "./Fight.ts"

export default class Screen {
    private static _screen : Screen | null = null
    playerSprite : Array<Array<string>> = [["       /\\__/\\       ","      ( •ㅅ• )      ","      /      \\      "],["       /\\__/\\       ","      ( XㅅX )      ","      /      \\      "]]
    monsterSprite : Array<Array<string>>  = [["       /\\__/\\       ","      (=•==•=)``    ","       \\_ㅅ_/       "],["       /\\__/\\       ","      (=X==X=)``    ","       \\_ㅅ_/       "]]
    bossSprite : Array<string> = ["      (\\__/)        ","      (•ㅅ•)        ","   ＿ノヽ ノ＼＿    "," /  `/ ⌒ Ｙ⌒ Ｙ`ヽ  ","(   (三ヽ人   /   | ", "|  ﾉ⌒＼ ￣￣ヽ  ノ  ","ヽ＿＿＿＞､＿_／    ","   ｜( 王 ﾉ〈 (\\__/)","   /ﾐ`ー ― 彡\\(•ㅅ•)","  /  ╰    ╯   /    \\"]
    spaceBar = "║                                                                                                                                       ║\n"
    fightScene : string = ""
    fight : Fight = new Fight()

    private constructor() {}

    static get screen() {
        if(!this._screen) {
            this._screen = new Screen()
        }
        return this._screen
    }

    //Start Menu
    //Create Player Team (interactif)
    //Chest Room
    //Inventory
    //Options

    displayScreen(message? : string, allCharacters? : Character[], order? : Character[]) {
        //console.clear()
        if (allCharacters !== undefined && order !== undefined) {
            this.fightScene = ""
            this.fightScene += "╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n"
            this.fightScene += this.spaceBar
            if (allCharacters.length == 4) {
                this.displayBoss(allCharacters,order)
            } else {
                this.displayFight(allCharacters,order)
            }
        }
        console.log(this.fightScene)
        if (message !== undefined) {
            this.printMessage(message)
            console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
            console.log("\n")
        }
    }
    displayFight(allCharacters : Character[],order : Character[]) {
        this.fightScene += this.getMonsters(allCharacters,order)

        for (let i=0; i<8; i++) {
            this.fightScene += this.spaceBar
        }

        this.fightScene += this.getPlayers(allCharacters,order)
    }
    displayBoss(allCharacters : Character[],order : Character[]) {
        this.fightScene += this.getBoss(allCharacters,order)
        this.fightScene += this.getPlayers(allCharacters,order)
    }

    getMonsters(allCharacters : Character[],order : Character[]): string{
        let fightScreen = ""
        
        //Line 1
        let line = `║${this.getSpaces(30)}`
        for (let i=0; i<3;i++) { 
            let tempLine = ""
            if (order.indexOf(allCharacters[i+3])!=-1){
                tempLine +=`${order.indexOf(allCharacters[i+3]) + 1}. ${allCharacters[i+3].name} (${allCharacters[i+3].className})` 
            } else {
                tempLine += `${allCharacters[i+3].name} (Dead)`
            }
            tempLine += this.getSpaces(15-(tempLine.length-20))
            line += tempLine
        }
        fightScreen += line + "║\n"
        
        // Line 2
        line = `║${this.getSpaces(30)}`
        for (let i=0;i<3;i++){
            let tempLine = ""
            const health = Math.round((allCharacters[i+3].currentHp/allCharacters[i+3].maxHp)*20)
            if (health == 0) {
                tempLine += "\x1b[31m████████████████████\x1b[0m"
            } else if (health == 100){
                tempLine += "\x1b[32m████████████████████\x1b[0m"
            } else {
                tempLine += "\x1b[32m"
                for (let j=0;j<health;j++){
                    tempLine+= "█"
                }
                tempLine +="\x1b[31m"
                for (let j=0;j<(20-health);j++){
                    tempLine+= "█"
                }
                tempLine += "\x1b[0m"
            }
            const healthText = ` ${allCharacters[i+3].currentHp}/${allCharacters[i+3].maxHp}`
            tempLine += healthText + this.getSpaces(15-healthText.length) 
            line += tempLine
        }
        fightScreen += line + "║\n"

        // Line 3-4-5
        for (let i=0;i<3;i++) {
            line = `║${this.getSpaces(30)}`
            for (let j=0;j<3;j++) {
                if(order.indexOf(allCharacters[i+3])!=-1){
                    line += this.monsterSprite[0][i]
                } else {
                    line += this.monsterSprite[1][i]
                }
                line += this.getSpaces(15)
            }
            fightScreen += line + "║\n"
        }
        return fightScreen
    }

    getPlayers(allCharacters : Character[],order : Character[]): string {
        let fightScreen = "" 
        
        // Line 1
        let line = `║${this.getSpaces(10)}`
        for (let i=0; i<3;i++) { 
            let tempLine = ""
            if (order.indexOf(allCharacters[i])!=-1){
                tempLine +=`${order.indexOf(allCharacters[i]) + 1}. ${allCharacters[i].name} (${allCharacters[i].className})` 
            } else {
                tempLine += `${allCharacters[i].name} (Dead)`
            }
            tempLine += this.getSpaces(15-(tempLine.length-20))
            line += tempLine
        }
        fightScreen += line + this.getSpaces(20) + "║\n"

        // Line 2
        line = `║${this.getSpaces(10)}`
        for (let i=0;i<3;i++){
            let tempLine = ""
            const health = Math.round((allCharacters[i].currentHp/allCharacters[i].maxHp)*20)
            if (health == 0) {
                tempLine += "\x1b[31m████████████████████\x1b[0m"
            } else if (health == 100){
                tempLine += "\x1b[32m████████████████████\x1b[0m"
            } else {
                tempLine += "\x1b[32m"
                for (let j=0;j<health;j++){
                    tempLine+= "█"
                }
                tempLine +="\x1b[31m"
                for (let j=0;j<(20-health);j++){
                    tempLine+= "█"
                }
                tempLine += "\x1b[0m"
            }
            const healthText = ` ${allCharacters[i].currentHp}/${allCharacters[i].maxHp}`
            tempLine += healthText + this.getSpaces(15-healthText.length) 
            line += tempLine
        }
        fightScreen += line + this.getSpaces(20) + "║\n"

        // Line 3-4-5
        for (let i=0;i<3;i++) {
            line = `║${this.getSpaces(10)}`
            for (let j=0;j<3;j++) {
                if(order.indexOf(allCharacters[i])!=-1){
                    line += this.playerSprite[0][i]
                } else {
                    line += this.playerSprite[1][i]
                }
                line += this.getSpaces(15)
            }
            fightScreen += line + this.getSpaces(20) + "║\n"
        }
        fightScreen += this.spaceBar
        fightScreen += "╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        return fightScreen
    }
    getBoss(allCharacters : Character[],order : Character[]): string {
        let fightScreen = ""

        // Line 1
        let line = `║${this.getSpaces(95)}`
        let tempLine = `${order.indexOf(allCharacters[3]) + 1}. Jean-Pierre (${allCharacters[3].className})`
        line += tempLine
        line += this.getSpaces(20-(tempLine.length-20))
        fightScreen += line + "║\n"

        // Line 2
        line = `║${this.getSpaces(95)}`
        tempLine = ""
        const health = Math.round((allCharacters[3].currentHp/allCharacters[3].maxHp)*20)
        if (health == 0) {
            tempLine += "\x1b[31m████████████████████\x1b[0m"
        } else if (health == 100){
            tempLine += "\x1b[32m████████████████████\x1b[0m"
        } else {
            tempLine += "\x1b[32m"
            for (let j=0;j<health;j++){
                tempLine+= "█"
            }
            tempLine +="\x1b[31m"
            for (let j=0;j<(20-health);j++){
                tempLine+= "█"
            }
            tempLine += "\x1b[0m"
        }
        const healthText = ` ${allCharacters[3].currentHp}/${allCharacters[3].maxHp}`
        tempLine += healthText + this.getSpaces(20-healthText.length) 
        line += tempLine
        fightScreen += line + "║\n"

        // Boss
        for (let i=0;i<10;i++) {
            line = `║${this.getSpaces(95)}` 
            line += this.bossSprite[i]
            fightScreen += line + this.getSpaces(20) + "║\n"
        }
        fightScreen += this.spaceBar
        return fightScreen
    }

    getSpaces(nSpaces : number): string{
        let spaces = ""
        for(let i=0; i<nSpaces;i++){
            spaces+= " "
        }
        return spaces
    }

    printMessage(message : string) {
        let line = "║     Game : "
        if (message.length>110) {
            line += message.slice(0,110) + "             ║"
            console.log(line)
            line = "║            "
            line += message.slice(110)
            line += this.getSpaces(123-line.length) + "║"
            console.log(line)
        } else {
            line += message
            line += this.getSpaces(123-message.length) + "║"
            console.log(line)
            console.log("║" + this.getSpaces(135) + "║")
        }
    }

    /**
     * USE AWAIT TO CALL THIS FUNCTION
     * @returns true if player used an item and flase if he canceled
     */
    async inventory(): Promise<string>{
        
        let message = "You are in the Inventory, Select the item you wish to use or press 'q' to go cancel"
        while (true) {
            this.displayScreen()
            this.printMessage(message)
            const inventory = ["╠══════════════════════════╦══════════════════════════╦══════════════════════════╦══════════════════════════╦═══════════════════════════╣",`║      1: 🧪 Potion (${Inventory.inventory.nPotions})    ║ 2: ✨ Star fragment (${Inventory.inventory.nStarFragments})  ║    3: 🌟 Half star (${Inventory.inventory.nHalfStars})   ║      4: 🔮 Ether (${Inventory.inventory.nEthers})     ║           q: Quit         ║`,"╚══════════════════════════╩══════════════════════════╩══════════════════════════╩══════════════════════════╩═══════════════════════════╝"] 
            for (let i=0; i<3; i++) {
                console.log(inventory[i])
            }
            for await (const keypress of readKeypress()) {
                switch (keypress.key) {
                    case "1": {
                        const input = await this.input("Which character do you wish to use the potion on ?",this.fight.players.map((v) => `${v.name} (${v.className.slice(0,3)})`))
                        message = Inventory.inventory.usePotion(this.fight.players[input])
                        if (message[0] != " ") {
                            return message
                        }
                        break
                    }
                    case "2": {
                        const input = await this.input("Which character do you wish to use the star fragment on ?",this.fight.players.concat(this.fight.deadPlayers).map((v) => `${v.name} (${v.className.slice(0,3)})`))
                        message = Inventory.inventory.useStarFragment(this.fight.players.concat(this.fight.deadPlayers)[input])
                        if (message[0] != " ") {
                            return message
                        }
                        break
                    }
                    case "3": {
                        const input = await this.input("Which character do you wish to use the half star on ?",this.fight.players.concat(this.fight.deadPlayers).map((v) => `${v.name} (${v.className.slice(0,3)})`))
                        message = Inventory.inventory.useHalfStar(this.fight.players.concat(this.fight.deadPlayers)[input])
                        if (message[0] != " ") {
                            return message
                        }
                        break
                    }
                    case "4": {
                        const input = await this.input("Which character do you wish to use the ether on ?",this.fight.players.map((v) => `${v.name} (${v.className.slice(0,3)})`))
                        message  = Inventory.inventory.useEther(this.fight.players[input])
                        if (message[0] != " ") {
                            return message
                        }
                        break
                    }
                    case "q": {
                        return ""
                    }
                }
                break
            }
        }
    }

    /**
     * USE AWAIT TO CALL THIS FUNCTION
     * @param message 
     * @param optionsList 
     * @returns index of option seleced
     */
    async input(message : string, optionsList : Array<string>) :Promise<number> {
        this.displayScreen()
        this.printMessage(message)
        const options = ["╠══════════════════════════╦══════════════════════════╦══════════════════════════╦══════════════════════════╦═══════════════════════════╣","╚══════════════════════════╩══════════════════════════╩══════════════════════════╩══════════════════════════╩═══════════════════════════╝"] 
        
        console.log(options[0])
        let line = "║"
        for (let i=0; i<optionsList.length; i++) {
            if (optionsList[i].length % 2 == 0) {
                line += `${this.getSpaces(((26-(optionsList[i].length)) /2) -2)}${i+1}: ${optionsList[i]}${this.getSpaces(((26-(optionsList[i].length)) / 2)-1)}║`
            } else {
                line += `${this.getSpaces(((26-(Math.floor(optionsList[i].length))) /2) -2)}${i+1}: ${optionsList[i]}${this.getSpaces(((26-(Math.floor(optionsList[i].length))) /2) -2)}║`
            }
        }

        // if empty less than 4 options fill them with empty spaces
        for (let i=0; i<4-optionsList.length; i++) {
            line += `                          ║`
        }

        line += `         q: Quit           ║`
        console.log(line)
        console.log(options[1])

        while (true) {
            for await (const keypress of readKeypress()) {
                if (!Number.isNaN(Number(keypress.key)) && Number(keypress.key) <= optionsList.length && Number(keypress.key) != 0) {
                    return Number(keypress.key)-1
                }

                if (keypress.key === 'q') {
                  Deno.exit(0) // back to start  
                }
            }
        }
    }

    async displaySelection(i : number) : Promise<number> {
        console.log("╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 70 - 89        /\\__/\\       Special Attack:              Attakck : 40 - 49        /\\__/\\       Special Attack:        ║\n║       Defence : 15 - 24       ( •ㅅ• )      Attack a random              Defence : 10 - 14       ( •ㅅ• )      Restores 25% HP        ║\n║       Speed :   100 - 109     /      \\      monster for 130%             Speed :   95 - 104      /      \\      of a chosen            ║\n║       Health :  200 - 209   1. Barbarian    attack damage                Health :  190 - 209     4. Priest     character              ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 35 - 44        /\\__/\\       Special Attack:              Attakck : 45 - 54        /\\__/\\       Special Attack:        ║\n║       Defence : 10 - 14       ( •ㅅ• )      A magic attack               Defence : 20 - 29       ( •ㅅ• )      Has a 60% chance       ║\n║       Speed :   115 - 124     /      \\      that ignores                 Speed :   135 - 164     /      \\      to steal a random      ║\n║       Health :  190 - 209     2. Mage       the defense                  Health :  165 - 184     5. Theif      item                   ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 50 - 69        /\\__/\\       Special Attack:              Attakck : 60 - 79        /\\__/\\       Special Attack:        ║\n║       Defence : 40 - 49       ( •ㅅ• )      Targets all enemies          Defence : 35 - 44       ( •ㅅ• )      No special attacks     ║\n║       Speed :   100 - 119     /      \\      dealing 40% damage           Speed :   95 -105       /      \\                             ║\n║       Health :  200 - 219    3. Paladin     to each                      Health :  190 -209     6. Warrior                            ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣")
        this.printMessage(`Choose your character ${i}`)
        while (true) {
            for await (const keypress of readKeypress()) {
                if (!Number.isNaN(Number(keypress.key)) && Number(keypress.key) <= 6 && Number(keypress.key) != 0) {
                    return Number(keypress.key)-1
                }

                if (keypress.key === 'q') {
                  Deno.exit(0) // back to start  
                }
            }
        }
    }

    displayCchestRoom() {

    }
}   
