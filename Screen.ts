import { readKeypress } from "https://deno.land/x/keypress@0.0.11/mod.ts"
import Character from "./Characters/Character.ts"
import Inventory from "./Inventory.ts"
import Fight from "./Fight.ts"

/**
 * Singleton class that handles the display for 
 * - the fights
 * - the chest rooms
 * - the messages
 * - the user inputs
 * - the inventory
 * 
 * @property _screen : contains the singleton screen instance
 * @property playerSprite : constains the player sprite for alive and dead
 * @property monsterSprite : constains the monster sprite for alive and dead
 * @property bossSprite : constains the boss sprite for alive and dead
 * @property spaceBar : contains a empty line for display
 * @property fightScene : contains the fight display when no actions have been done between displays
 * @property fight : contains the instance of the current fight
 */
export default class Screen {
    private static _screen : Screen | null = null
    private playerSprite : Array<Array<string>> = [["       /\\__/\\       ","      ( •ㅅ• )      ","      /      \\      "],["       /\\__/\\       ","      ( XㅅX )      ","      /      \\      "]]
    private monsterSprite : Array<Array<string>>  = [["       /\\__/\\       ","      (=•==•=)``    ","       \\_ㅅ_/       "],["       /\\__/\\       ","      (=X==X=)``    ","       \\_ㅅ_/       "]]
    private bossSprite : Array<string> = ["      (\\__/)        ","      (•ㅅ•)        ","   ＿ノヽ ノ＼＿    "," /  `/ ⌒ Ｙ⌒ Ｙ`ヽ  ","(   (三ヽ人   /   | ", "|  ﾉ⌒＼ ￣￣ヽ  ノ  ","ヽ＿＿＿＞､＿_／    ","   ｜( 王 ﾉ〈 (\\__/)","   /ﾐ`ー ― 彡\\(•ㅅ•)","  /  ╰    ╯   /    \\"]
    private spaceBar = "║                                                                                                                                       ║\n"
    private fightScene : string = ""
    public fight : Fight = new Fight()

    private constructor() {}

    static get screen() {
        if(!this._screen) {
            this._screen = new Screen()
        }
        return this._screen
    }

    /**
     * Displays the fight scene with an optional message
     * 
     * if there is no information on the fight, the previous fightScreen will be displayed
     * if there is a message it is displayed
     * 
     * if the character list has length of 4 then it is a boss fight, else it is a normal fight
     * 
     * @param message optional message to display
     * @param allCharacters optional list of all characters to be displayed
     * @param order option along with the previous one to differenciate the characters alive and dead
     */
    public displayScreen(message? : string, allCharacters? : Character[], order? : Character[]) {
        console.clear()
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

    /**
     * displays a normal fight (3 monsters and 3 players)
     * @param allCharacters list of all characters to be displayed
     * @param order list of the characters alive in order of speed
     */
    private displayFight(allCharacters : Character[],order : Character[]) {
        this.fightScene += this.getMonsters(allCharacters,order)

        for (let i=0; i<8; i++) {
            this.fightScene += this.spaceBar
        }

        this.fightScene += this.getPlayers(allCharacters,order)
    }

    /**
     * displays a boss fight 
     * @param allCharacters list of all characters to be displayed
     * @param order list of the characters alive in order of speed
     */
    private displayBoss(allCharacters : Character[],order : Character[]) {
        this.fightScene += this.getBoss(allCharacters,order)
        this.fightScene += this.getPlayers(allCharacters,order)
    }

    /**
     * creates a string for the 3 monsters and their info
     * @param allCharacters list of all characters to be displayed
     * @param order list of the characters alive in order of speed
     * @returns the 3 monsters with their info in a single string
     */
    private getMonsters(allCharacters : Character[],order : Character[]): string{
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
                if(order.indexOf(allCharacters[j+3])!=-1){
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

    /**
     * creates a string for the 3 players and their info
     * @param allCharacters list of all characters to be displayed
     * @param order list of the characters alive in order of speed
     * @returns the 3 players with their info in a single string
     */
    private getPlayers(allCharacters : Character[],order : Character[]): string {
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
                if(order.indexOf(allCharacters[j])!=-1){
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

    /**
     * creates a string for the boss and it's info
     * @param allCharacters list of all characters to be displayed
     * @param order list of the characters alive in order of speed
     * @returns the boss with it's info in a single string
     */
    private getBoss(allCharacters : Character[],order : Character[]): string {
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

    /**
     * Get a string of N spaces
     * @param nSpaces number of spaces wanted
     * @returns a string a N spaces
     */
    private getSpaces(nSpaces : number): string{
        let spaces = ""
        for(let i=0; i<nSpaces;i++){
            spaces+= " "
        }
        return spaces
    }

    /**
     * prints a message 
     * @param message the message in a string
     */
    private printMessage(message : string) {
        let line = "║     Game : "
        if (message.length>110) {
            line += message.slice(0,110) + "             ║"
            console.log(line)
            line = "║            "
            line += message.slice(110)
            line += this.getSpaces(136-line.length) + "║"
            console.log(line)
        } else {
            line += message
            line += this.getSpaces(123-message.length) + "║"
            console.log(line)
            console.log("║" + this.getSpaces(135) + "║")
        }
    }

    /**
     * Displays the inventory
     * Handles the user input and calls on Inventory to handle the action
     * @returns message of the action that has been done
     */
    public async inventory(): Promise<string>{
        
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
     * Displays and Handles the options for the player 
     * 
     * @param message the message that will be displayed to guide the player
     * @param optionsList the options that will be displayed 
     * @returns index of the option selected
     */
    public async input(message : string, optionsList : Array<string>) :Promise<number> {
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

                if (keypress.ctrlKey && keypress.key === 'c') {
                    Deno.exit(0);
                }
            }
        }
    }
    
    /**
     * Displays and Handle the character selection 
     * @param i number of the character that needs to be chosen ( 1 to 3)
     * @returns the number of the character selected
     */
    public async displaySelection(i : number) : Promise<number> {
        console.clear()
        console.log("╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 70 - 89        /\\__/\\       Special Attack:              Attakck : 40 - 49        /\\__/\\       Special Attack:        ║\n║       Defence : 15 - 24       ( •ㅅ• )      Attack a random              Defence : 10 - 14       ( •ㅅ• )      Restores 25% HP        ║\n║       Speed :   100 - 109     /      \\      monster for 130%             Speed :   95 - 104      /      \\      of a chosen            ║\n║       Health :  200 - 209   \x1b[32m1. Barbarian\x1b[0m    attack damage                Health :  190 - 209     \x1b[32m4. Priest\x1b[0m     character              ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 35 - 44        /\\__/\\       Special Attack:              Attakck : 45 - 54        /\\__/\\       Special Attack:        ║\n║       Defence : 10 - 14       ( •ㅅ• )      A magic attack               Defence : 20 - 29       ( •ㅅ• )      Has a 60% chance       ║\n║       Speed :   115 - 124     /      \\      that ignores                 Speed :   135 - 164     /      \\      to steal a random      ║\n║       Health :  190 - 209     \x1b[32m2. Mage\x1b[0m       the defense                  Health :  165 - 184     \x1b[32m5. Theif\x1b[0m      item                   ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║       Attakck : 50 - 69        /\\__/\\       Special Attack:              Attakck : 60 - 79        /\\__/\\       Special Attack:        ║\n║       Defence : 40 - 49       ( •ㅅ• )      Targets all enemies          Defence : 35 - 44       ( •ㅅ• )      No special attacks     ║\n║       Speed :   100 - 119     /      \\      dealing 40% damage           Speed :   95 -105       /      \\                             ║\n║       Health :  200 - 219    \x1b[32m3. Paladin\x1b[0m     to each                      Health :  190 -209     \x1b[32m6. Warrior\x1b[0m                            ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣")
        this.printMessage(`Choose your character ${i}`)
        console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
        console.log("\n")
        while (true) {
            for await (const keypress of readKeypress()) {
                if (!Number.isNaN(Number(keypress.key)) && Number(keypress.key) <= 6 && Number(keypress.key) != 0) {
                    return Number(keypress.key)-1
                }

                if (keypress.key === 'q') {
                  Deno.exit(0) // back to start  
                }

                if (keypress.ctrlKey && keypress.key === 'c') {
                    Deno.exit(0);
                }
            }
        }
    }

    /**
     * Handles the chest room options
     * @param state which action is happening curently
     * @param message the message that will be displayed
     * @returns 1 if user choses to open the chest, 2 if not and 3 if it is not asked
     */
    public async displayChestRoom(state : string, message : string) : Promise<number> {
        console.clear()
        const chestRoom = "╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                ⠀⠀⠀⠀⠀⣀⣴⣶⣶⣶⣶⣶⣶⣶⣦⣄⣀⠀⠀⠀⠀⠀                                                                                 ║\n║                                ⠀⠀⣀⣴⣾⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣷⡄                                                                                    ║\n║                                ⠀⠀⣿⣿⣿⣿⣿⣿⠉⠀⠀⠀⠀⠀⠉⠉⠉⠙⢷⡄⠀⠀                                                                                 ║\n║                                 ⣼⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄                                                                                  ║\n║                                 ⣿⣿⣿⣿⣿⡿⠛⠁⠀⣠⣾⣿⣶⣤⣤⣄⠀⠀⠀⡇                                                                                  ║\n║                                 ⣿⣿⣿⣿⣿⠁⠀⠀⠚⠉⣴⣶⣦⡌⠙⠛⠀⣶⣶⣽⡄  Take            ⡄⢠⣤⣤⠀⣤⣤⣤⣤⣤⣤⣤⣤⣤⠀⣤⣤⡄⢠                                            ║\n║                                ⣴⡿⠉⠻⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠙⠀⠀⢆⣤⣭⡙⡇      It         ⢸⡇⢸⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡇⢸⣿                                           ║\n║                                ⣿⠀⠉⠇⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠑⡄⠀⡇        Bro      ⡇⢸⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡇⢸⣿⡇⠀⠀                                       ║\n║                                ⠻⣍⠑⠇⣿⣿⣿⣷⣦⣄⡀⣀⣠⣤⣼⣦⣀⣠⣤⡇ ⡇                ⣿⡇⢸⣿⣿⠀⣿⣿⣿⠟⠛⠛⠛⠛⠻⣿⣿⠀⣿⣿⡇⢸⣿⣿                                         ║\n║                                ⠀⣿⡟⢲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣴⠇                ⡉⢁⣀⣉⣀⣀⣉⣉⣉⠀⣴⠖⠲⣦⠀⣉⣉⣉⣀⣉⣉⣀⡈⢉⡁⠀⠀                                      ║\n║                                ⠀⣿⡇⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⣆⣀⠀⠉⠉⢿⣿⡿                ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⡄⢠⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇⠀                                       ║\n║                                ⠀⣿⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀               ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⣧⣼⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇⠀                                       ║\n║                                ⠀⣿⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀               ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⣀⣉⣉⣉⣉⣀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇                                        ║\n║                                 ⡿⠀⠀⠀⠀⠀⠉⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀               ⠘⠇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠸⠃                                        ║\n║                                ⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀                                                                                 ║\n║                                ⣿              ⠉⠉⣿⠛⠛⠁⠀⠀⠀                                                                               ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        const openingChest = "╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                ,-.       _,---._ __  / \\                                                              ║\n║                                                /  )    .-'       `./ /   \\                                                            ║\n║                                                (  (   ,'            `/    /|                                                          ║\n║                                                  \\  `-\"             \\'\\   / |                                                         ║\n║                                                   `.              ,  \\ \\ /  |                                                         ║\n║                                                    /`.          ,'-`----Y   |                                                         ║\n║                                                   (    (       ;        |   /                                                         ║\n║                                                   |  ,-.    ,-'         |  /                                                          ║\n║                                                   |  | (   |            | /                                                           ║\n║                                                   )  |  \\  \`.___________|/                                                            ║\n║                                                   `--'   `--'                                                                         ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n║                                                                                                                                       ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        const trappedChest = "╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                ⠀⠀ ⠀⠀⠀⠀⠀  ⠀   ⡼⡝⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀                                                                      ║\n║                                     ⠀⠀⠀⠀⠀  ⠀⣸⢹⣹⠸⡦⠤⠤⠤⠄⣀⡀⠀⠀⡠⢴⢲⠀⠀⠀⠀                                                                      ║\n║                                     ⠀⠀⠀⠀ ⠀ ⢰⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠳⢏⣊⠹⣼⠀⠀⠀⠀                                                                      ║\n║                                     ⠀⠀⠀  ⠀⢀⠏⠀⠀⢠⡤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠁⡇⠀⠀⠀⠀                                                                      ║\n║                                     ⠀⠀⠀  ⠀⡎⠀⠀⠀⠀⠙⠓⢺⡄⠀⡴⠾⣿⡽⠖⠀⢸⡇⠀⠀⠀⠀                  Get                                                 ║\n║                                     ⠀⠀  ⠀⣸⠀⠀⠀⠀⠀⢀⢀⠀⢖⢲⠏⠀⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀                       Pranked                                        ║\n║                                     ⠀⠀  ⢀⡇⠀⠀⠀⠀⠀⠈⠓⠧⠼⢧⣂⣊⠇⠀⠀⠀⢸⠀⠀⠀⠀⠀                               LOL                                    ║\n║                                     ⠀  ⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠓⠶⠒⠀⠀⠀⠀⠀⠀⡟⠀⠀⠀⠀⠀                                                                      ║\n║                                     ⠀  ⢀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣆⠀⠀⠀⠀                                                                      ║\n║                                     ⠀  ⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣆⠀⠀⠀                                                                      ║\n║                                     ⠀  ⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡴⡫⠃⠀⠀⠀⠀⠀⢹⡀⠀⠀                                                                      ║\n║                                     ⠀  ⡇⠀⠀⠀⠀⡄⠀⠀⠀⢀⡞⠈⠀⠈⡳⠀⠀⡔⡆⠀⠀⠸⡷⠶⡄                                                                      ║\n║                                       ⢰⠀⠀⠀⠀⠀⣇⠀⣀⠴⠋⠀⠀⣠⠔⠁⠀⣠⡇⣇⡀⠀⠀⡇⢠⡇                                                                      ║\n║                                       ⠸⡀⠀⠀⢀⣤⠟⠋⠁⠀⠀⢀⠞⠁⠀⠀⢸⠀⠀⠈⡇⠀⠀⡇⡾⠀                                                                      ║\n║                                       ⠀⣇⠀⠀⠈⠁⠀⠀⠀⢀⠔⠁⠀⠀⠀⠀⢸⡄⠀⢰⡃⠀⢀⣷⠃⠀                                                                      ║\n║                                       ⠀⡟⣦⡀⠀⠀⣀⣠⠖⠁⠀⠀⠀⠀⠀⠀⢸⣇⠀⠈⣧⠀⢸⡿⠀⠀                                                                      ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⡄⢠⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇                                                                        ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⣧⣼⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇                                                                        ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⣀⣉⣉⣉⣉⣀⣿⣿⣿⣿⣿⣿⣿ ⢸⡇                                                                        ║\n║                                     ⠘⠇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠸⠃                                                                        ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        const goodChest = "╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗\n║                                          ⠀⠀⠀⠀⠀⣀⣴⣶⣶⣶⣶⣶⣶⣶⣦⣄⣀⠀⠀⠀⠀⠀                                                                       ║\n║                                          ⠀⠀⣀⣴⣾⣿⣿⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣷⡄                                                                          ║\n║                                          ⠀⠀⣿⣿⣿⣿⣿⣿⠉⠀⠀⠀⠀⠀⠉⠉⠉⠙⢷⡄⠀⠀                                                                       ║\n║                                           ⣼⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄                                                                        ║\n║                                           ⣿⣿⣿⣿⣿⡿⠛⠁⠀⣠⣾⣿⣶⣤⣤⣄⠀⠀⠀⡇                                                                        ║\n║                                           ⣿⣿⣿⣿⣿⠁⠀⠀⠚⠉⣴⣶⣦⡌⠙⠛⠀⣶⣶⣽⡄  You                                                                  ║\n║                                          ⣴⡿⠉⠻⣿⣿⠀⠀⠀⠀⠀⠀⠀⠉⠙⠀⠀⢆⣤⣭⡙⡇      Did                                                              ║\n║                                          ⣿⠀⠉⠇⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠑⡄⠀⡇          It                                                           ║\n║                                          ⠻⣍⠑⠇⣿⣿⣿⣷⣦⣄⡀⣀⣠⣤⣼⣦⣀⣠⣤⡇ ⡇              Bro                                                      ║\n║                                          ⠀⣿⡟⢲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣴⠇                                         ⠀⠀                            ║\n║                                          ⠀⣿⡇⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⣆⣀⠀⠉⠉⢿⣿⡿                                          ⠀                             ║\n║                                          ⠀⣿⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀                                         ⠀                             ║\n║                                          ⠀⣿⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀                                                                       ║\n║                                           ⡿⠀⠀⠀⠀⠀⠉⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀                                                                       ║\n║                                          ⣿⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀                                                                       ║\n║                                          ⣿              ⠉⠉⣿⠛⠛⠁⠀⠀⠀                                                                     ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⡄⢠⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇                                                                        ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⠀⣿⣧⣼⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⡇                                                                        ║\n║                                     ⢸⡇⢸⣿⣿⣿⣿⣿⣿⣿⣀⣉⣉⣉⣉⣀⣿⣿⣿⣿⣿⣿⣿ ⢸⡇                                                                        ║\n║                                     ⠘⠇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿ ⠸⠃                                                                        ║\n╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣"
        switch(state) {
            case "chest" : {
                console.log(chestRoom)
                this.printMessage(message)
                console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
                console.log("\n")
                while (true) {
                    for await (const keypress of readKeypress()) {
                        if (!Number.isNaN(Number(keypress.key)) && Number(keypress.key) <= 2 && Number(keypress.key) != 0) {
                            return Number(keypress.key)
                        }
        
                        if (keypress.key === 'q') {
                          Deno.exit(0) // back to start  
                        }

                        if (keypress.ctrlKey && keypress.key === 'c') {
                            Deno.exit(0);
                        }
                    }
                }
            }
            case "opening" : {
                console.log(openingChest)
                this.printMessage(message)
                console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
                console.log("\n")
                return NaN
            }
            case "good" : {
                console.log(goodChest)
                this.printMessage(message)
                console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
                console.log("\n")
                return NaN
            }
            case "bad" : {
                console.log(trappedChest)
                this.printMessage(message)
                console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
                console.log("\n")
                return NaN
            }
            case "skip" : {
                console.log(chestRoom)
                this.printMessage(message)
                console.log("╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝")
                console.log("\n")
                return NaN
            }
        }
        return NaN
    }
}   
