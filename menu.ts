export default class Menu {

    message: string;
    options: string[];

    constructor(message: string, options: string[]){
        this.message = message
        this.options = options
    }

    input() {
        //console.log(`
        //╔═════════════════════════════════════════════════════════════════════════════════╗
        //║   1. Attaquer   ║   2. Attaque Spéciale   ║   3. Inventaire   ║   4. Quitter    ║
        //╚═════════════════════════════════════════════════════════════════════════════════╝`)

        console.log(this.message);
        console.log(this.options);

        const promptValue = prompt("Que voulez-vous faire ?");
        const input = Number(promptValue);

        if(isNaN(input)) {
            console.log("Choix invalide !");
            this.input();
        } else if (Number.isInteger(input) && input > 0) {
            if(input <= this.options.length) {
                return input
            } else {
                console.log("Choix invalide !");
                this.input();                
            } 
        } else {
            console.log("Choix invalide !");
            this.input();              
        }
    }
}
