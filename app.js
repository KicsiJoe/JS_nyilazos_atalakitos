const ELVALASZTOJELEK = ["-", "→", "-->", "<-", "->", "<--", "=>", "==>", "<==", "<=" ];

const OSSZEFUGG = ["-->", "<-", "->", "<--", "=>", "==>", "<==", "<="]

const JELENTESEK = ["/", "(", ")", "|", "'", "[", "]", "{","}", "."];



function leghosszabbJel(){
    for (let i=0; i < OSSZEFUGG.length; i++){
       let a = 0
       if (OSSZEFUGG[i].length > a){
        a = OSSZEFUGG[i].length;
       }  
    }
} 
let osszefuggLength = leghosszabbJel();

/* /[^a-zA-Z ]/g */
const out = document.getElementById("out");

let start = document.getElementById("in");

document.getElementById("kiirat").addEventListener("click", function (e) {
  e.preventDefault();

  numberOfLineBreaks = (start.value.match(/\n/g)||[]).length;

  console.log(numberOfLineBreaks);

  let str = (start.value).replace(/  +/g, ' '); // teljes egybefüggő szoveg // teljes szoveg masolata atalakitasra eltüntetve a felesleges szóközöket
    console.log(str);
  /* egy → ketto */

  let szoveg = [];

  for (let letter = 0; letter < str.length; letter++) {
    szoveg.push(str[letter]);
    
  }
  //szoveg :
  /*  ['e', 'g', 'y', ' ', '→', ' ', 'k', 'e', 't', 't', 'o'] */

  console.log(szoveg);

 /*  let regex = /\W/g; */
  let regex = /[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g;

  let result = str.match(regex); // a teljes szovegbol ami nem betű és szám, felosztva


  let szavak = [[], []];
  let szavakForditasa = [[], []];

  
// unique nem szöveg és szám listában:
  let uniqueRes = [];
  result.forEach((c) => {
    if (!uniqueRes.includes(c) && c !== ' ') {
      uniqueRes.push(c);
    }
  });
  console.log(uniqueRes);
  
for (let i= 0; i<JELENTESEK.length; i++){
     const JelentesekIndex = uniqueRes.indexOf(JELENTESEK[i]);
  if (JelentesekIndex > -1) {
    uniqueRes.splice(JelentesekIndex, 1);
  } 
}

  console.log(uniqueRes);


  syntaxFordito(szoveg);
  function syntaxFordito (szovegDarabolva) {
      console.log(szovegDarabolva);

      let osszefuz = [];

    let osszefuggo = '';

      for(let i=0; i<szovegDarabolva.length; i++){

          if (osszefuggo.length <= osszefuggLength) {
            console.log("itt jartam");
            console.log(osszefuggo.length);
          } else {
              osszefuggo = '';
          }
        if(!uniqueRes.includes(szovegDarabolva[i]) ){
           osszefuz.push(szovegDarabolva[i])
        } // betuk hozzaadasa

        if (szovegDarabolva[i] === ' ' && !uniqueRes.includes(szovegDarabolva[i+1]) && !uniqueRes.includes(szovegDarabolva[i-1]) && i !== 0 && i !== szovegDarabolva.length-1){
            osszefuz.push(szovegDarabolva[i])
        } 

        if(szovegDarabolva[i] === ' ' && uniqueRes.includes(szovegDarabolva[i+1]) ){
            continue;
        }
        if(szovegDarabolva[i] === '→' ){
            osszefuz.push('→');
          
       }
        if((szovegDarabolva[i] === '-'  && szovegDarabolva[i+1] === '-') || (szovegDarabolva[i] === '='  && szovegDarabolva[i+1] === '=') ){
            osszefuggo = osszefuggo + szovegDarabolva[i];
            console.log(osszefuggo);
           continue;
        }
        if(szovegDarabolva[i] === '='  && !uniqueRes.includes(szovegDarabolva[i+1])){
            osszefuz.push('=');
        }



        if(szovegDarabolva[i] === '-' && !uniqueRes.includes(szovegDarabolva[i+1])){
            osszefuz.push('→');
             

        }
        if((szovegDarabolva[i] === '>' && szovegDarabolva[i-1] === '-') || (szovegDarabolva[i] === '>' && szovegDarabolva[i-1] === '=') ){
            osszefuz.push('→');
           
        }

      }
      console.log(osszefuz);
      let osszefuzve = '';
      for(let i=0;i<osszefuz.length;i++){
        osszefuzve = osszefuzve + osszefuz[i];
        
    }
    out.value = osszefuzve;
    console.log(osszefuzve);
  }



});
