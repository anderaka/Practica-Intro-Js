/* First Kata */


const GetNumber = (num) => {

    /* First step : check is number */
    if (typeof num == "number") {
 
       /* Second step : iterate number by number params*/
        for(let i=1; i<=num; i++ ){
 
          let rest = "";
 
          /* Check number if divisible by 3 show FOO*/
          if ( i % 3 == 0 ){
    
             rest += "Foo";
          }

          /* Check number if divisible by 7 show BAR*/
          if( i % 5 == 0 ){
                
             rest += "Bar";
          }

          /* Check number if divisible by 7 show QUIX*/
          if(i % 7 == 0){
       
             rest += "Quix";      
          }
 
          /* Third step: preparer number for check-it if contains 3, 5 or 7 */
          let prep = i.toString();
          let contain = "";
 
          for (let x of prep) {
 
             if (x.toString().includes('3')) {
 
                contain += "Foo";
             }
             if (x.toString().includes('5')) {
 
                contain += "Bar";
             }
             if (x.toString().includes('7')) {
 
                contain += "Quix";
             }
 
          }
 
          /*Show result */
          console.log(i,'->',rest,contain);        
       }
 
    }else{

       console.log( 'Please, input a type number' );
 
    }
 
 };
 
 
 GetNumber(100);
 