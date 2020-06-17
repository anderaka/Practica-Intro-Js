
class Deck {

    constructor() {
        /* datos de la baraja: */
        this.hand = [];
        this.values = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
        this.suit = ['S', 'H', 'C', 'D'];

        /* opciones jugadas poker: */
        this.ranks = [
            'High card',
            'Pair',
            'Two pairs',
            'Three of a kind',
            'Straight',
            'Flush',
            'Full house',
            'Four of a kind',
            'Straight flush'
        ];

    }

    shuffle() {

      
        for (this.x = 0; this.x < 5; this.x++) {

            /* obtengo los valores de cada array de datos aleatoriamente*/
            this.ramdomValues = this.values[Math.floor(Math.random() * this.values.length)];
            this.ramdomSuit = this.suit[Math.floor(Math.random() * this.suit.length)];

            this.hand.splice(1, 0, this.ramdomValues + this.ramdomSuit);

        }
        return this.hand;
    }


    playPoker() {

        this.result = "";

        /* obtengo las manos de cada jugador y las asigno */
        this.player1 = hand1;
        this.player2 = hand2;

        this.p1Result = this.ranks.indexOf(helper.getResults(this.player1));
        this.p2Result = this.ranks.indexOf(helper.getResults(this.player2));

        /* si los resultados son iguales, busca la carta más alta para desempatar */
        this.hightCard1 = this.values.indexOf(helper.getHightCard(this.player1));
        this.hightCard2 = this.values.indexOf(helper.getHightCard(this.player2));


        if (this.p1Result > this.p2Result) {

            this.result = `Jugador 1 gana con ${helper.getResults(this.player1)}`;


        } else if (this.p1Result < this.p2Result) {

            this.result = `Jugador 2 gana con ${helper.getResults(this.player2)}`;

            /* Si tras analizar los resultados, la manos son iguales, a la carta más alta */
        } else if (this.p1Result === this.p2Result) {

            if (this.hightCard1 > this.hightCard2) {

                this.result = `Jugador 1 gana con carta más alta: ${helper.getHightCard(this.player1)}`;

            } else if (this.hightCard1 < this.hightCard2) {

                this.result = `Jugador 2 gana con carta más alta: ${helper.getHightCard(this.player2)}`;

            } else {

                this.result = 'Empate a todo!';
            }

        }

        console.log("Cartas Jugador 1:", this.player1);
        console.log("Cartas Jugador 2:", this.player2);
        console.log("Resultado ->", this.result);
    }

}
class Player1 extends Deck {

    setHand() {
        super.shuffle().sort();
        return this.hand;
    }
}

class Player2 extends Deck {

    setHand() {
        super.shuffle().sort();
        return this.hand;
    }
}

class Helper extends Deck {

    getNumSuit(array) {
        let num = [];

        for (let n of array) {

            num.push(n[0]);
        }

        return num;
    }

    getPaloSuit(array) {
        let palo = [];

        for (let n of array) {

            palo.push(n[1]);
        }

        return palo;
    }

    /* asociar valores a letras para poder compararlas correctamente */
    associateValueToLetter(array) {

        let values = array.map(function (x) {

            switch (x) {
                case 'T':
                    x = 10;
                    break;
                case 'J':
                    x = 11;
                    break;
                case 'Q':
                    x = 12;
                    break;
                case 'K':
                    x = 13;
                    break;
                case 'A':
                    x = 14;
                    break;
            }

            return x;
        });

        /* devuelvo el array ordenado */
        return values.sort(function (a, b) {
            return a - b
        });
    }

    /*repeticiones*/
    getOccurrence(array) {

        let count = [];
        let legend = "";
        let pairs = 0, four = 0, three = 0;

        array = helper.getNumSuit(array);
        let doubles = helper.associateValueToLetter(array);

        doubles.forEach(function (x) {
            count[x] = (count[x] || 0) + 1;
        });

        for (let repeat of count) {

            if (repeat >= 4) four++;
            if (repeat >= 2) pairs++;
            if (repeat >= 3) three++;
        }

        if (four > 0) {
            legend = this.ranks[7];
        }
        else if (three === 1 && pairs > 1) {
            legend = this.ranks[6];
        }
        else if (three === 1) {
            legend = this.ranks[3];
        }
        else if (pairs === 2) {
            legend = this.ranks[2];
        }
        else if (pairs === 1) {
            legend = this.ranks[1];
        }
        else {
            legend = false;
        }

        return legend;

    }
    getConsecNums(array) {

        array = helper.getNumSuit(array);

        let doubles = helper.associateValueToLetter(array);
        let consecutive = true;

        /*compruebo si hay números consecutivos*/
        for (let i = 1; i < doubles.length; i++) {
            if (doubles[i - 1] != doubles[i] - 1) {
                consecutive = false;
            }
        }

        return consecutive;
    }

    /* si tiene el mismo palo */
    getSameSuits(array) {

        array = helper.getPaloSuit(array);

        const suit = array.shift();
        let count = 0;

        array.map(ele => {
            if (ele === suit) {
                count++;
            }
        });

        return count === 4 ? true : false;

    }

    /* jugada de carta más alta */
    getHightCard(array) {

        array = helper.getNumSuit(array);
        let highIndex = 0;

        array.map(ele => {
            if (this.values.indexOf(ele) > highIndex) {
                highIndex = this.values.indexOf(ele);
            }
        });

        return this.values[highIndex];
    }

    /* el "ayudante" devuelve los resultados */
    getResults(array) {
        /*straight flush*/
        if (helper.getConsecNums(array) && helper.getSameSuits(array)) {
            return this.ranks[8];
        }
        /*straight*/
        if (helper.getConsecNums(array) && !helper.getSameSuits(array)) {
            return this.ranks[4];
        }
        /*flush*/
        if (helper.getSameSuits(array) && !helper.getConsecNums(array)) {
            return this.ranks[5];
        }
        /*pairs, two pairs, three...*/
        if (!helper.getSameSuits(array) && !helper.getConsecNums(array)) {
            return helper.getOccurrence(array);
        }
    }
}

/* realizamos instancia de nuestros objetos */
const deck= new Deck();
const player1 = new Player1();
const player2 = new Player2();
const helper = new Helper();


/* analizamos las manos y las ordenamos */
const hand1 = player1.setHand();
const hand2 = player2.setHand();
