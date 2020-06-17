const arabictoRoman = number => {

    let msg = "";

    /*en el array vacío donde iré metiendo todas las letras*/
    let res = [];

    let numberLast = number;

    try {

        if( typeof number == "number" ){

            if( number >= 1 && number <= 3999){
                
                /*my code here*/
                const numArray = {
                    "M"  : 1000,
                    "CM" : 900,
                    "D"  : 500,
                    "CD" : 400,
                    "C"  : 100,
                    "XC" : 90,
                    "L"  : 50,
                    "XL" : 40,
                    "X"  : 10,
                    "IX" : 9,
                    "V"  : 5,
                    "IV" : 4,
                    "I"  : 1,
                };
              
                for (var x in numArray) {
                    
                    /* recorro el objeto para obtener prop y val*/
                    if( number >= numArray[x]){
                        
                        let numberHight = Math.floor(number / numArray[x]);

                        /*aíslo la mayor cantidad entera*/
                        number -= (numberHight * numArray[x]);
                       
                        /*no se repitan 3 o más letras*/
                        if( numberHight <= 3 ){
                            while(numberHight--){
                                /*voy añadiendo las letras, hasta que numHight sea 0*/
                                res.push(x);
                            }
                        }else {
                            /* quito última letra del array (V) y reemplazo*/
                            res.pop();

                            insert = numRomanFin(numberLast); 
                            res.push(insert);
                        }
                    }else{
                        /*si no se cumple, cargo en el array un elemento vacío para no hacer nada con él*/
                        res.push('');
                    }

                }
                msg = res.join('');

            }else{
                throw "error2";
            }

        }else{
            throw "error";
        }

    } catch( err ) {

        if( err == "error" ) { msg = "Introduce u numero"; }
        if( err == "error2" ) { msg = "El numero debe estar entre 1 y 3999"; }
       
    }finally{

        return msg;
    }
};

console.log('//---- convertir arabico en romano ------/');
console.log(arabictoRoman("69"));
console.log(arabictoRoman(3600));
console.log(arabictoRoman(1185));


//----------------- Pasar de Romano a Arabico

const romantoArabic = roman => {

    let index = "";
    let result = 0;

    const romanArray =  ["CM", "M", "CD", "D", "XC", "C", "XL", "L", "IX", "X", "IV", "V", "I"];
    const numSameArray = [ 900, 1000, 400, 500, 90, 100, 40, 50, 9, 10, 4, 5, 1];

    /* se recorre el array de letras para obtener indice y correspondiente*/

    for( let ind in romanArray ){

        /*busco correspondencia en el array según el parámetro*/
        index = roman.indexOf(romanArray[ind]);

        while(index != -1){

            /*voy quitando letra por letra para acumular su valor numérico, que se irá sumando*/
            roman = roman.replace(romanArray[ind], "");

            /*reasigno index hasta que deje de encontrar resultados*/
            index = roman.indexOf(romanArray[ind]);

            /*voy sumando su correspondiente valor segun indice (letra)*/
            result += numSameArray[ind];
        }

    }

    /*comprobando que el numero introucido sea menor de 3999*/
    if( result > 3999){
        return "Introduce a number menor que 3999 por favor!";
    }else{
        return result;
    }
};

console.log('//---- Convertir romano en arabico ------//');
console.log(romantoArabic("MMXXVI"));
console.log(romantoArabic("MMMMDXV"));
console.log(romantoArabic("DCLIX"));

//------------------------- validador de numeros romanos
const validateRoman = str => {

    /* primero convierto string a mayús*/
    str = str.toUpperCase();

    const chain = ["M","D","C","L","X","V","I"];
    const errors = ['DM', 'LC', 'LD', 'LM', 'VX', 'VL', 'VC', 'VD', 'VM'];

    let resp = "";
    let ans = "";
    let occurs = "";

    /* antes de nada compruebo que no existan caracteres que puedan dar error*/
    for( let u of errors){

        if( str.includes(u) ){
            resp = false;
            break;

      
        }else{

            for( let i of str){

                /* primero compruebo que el parámetro que se introduce pertenece a un número romano */
                ans = chain.includes(i);

                if ( ans === false){

                    /* si se encuentra con una primera respuesta falsa, dejo de ejecutar y devuelvo error*/
                    resp = false;
                    break;

                }else{

                    /*comprobacion de las letras*/
                    switch(i){

                        case 'M' :
                        case 'C' :
                        case 'X' :
                        case 'I' :

                            occurs = str.split(i).length-1;
                            resp = occurs > 3 ? false : true;
                            break;

                        case 'V' :
                        case 'L' :
                        case 'D' :

                            occurs = str.split(i).length-1;
                            resp = occurs > 1 ? false : true;
                            break;

                    }
                }
            }
        }
    }

    return resp;

};


console.log('//---- Validar el numero Romano ------//');
console.log(validateRoman("MMIX"));
console.log(validateRoman("LCD"));
console.log(validateRoman("MXVI"));

