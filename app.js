const ELVALASZTOJELEK = [
  "-",
  "→",
  "-->",
  "<-",
  "->",
  "<--",
  "=>",
  "==>",
  "<==",
  "<=",
];

const OSSZEFUGG = [
  "-",
  "-->",
  "→",
  "->",
  "=>",
  "==>",
  "<==",
  "<=",
  "<-",
  "<--",
  "←",
];
let szavak = [];
let szavakForditasa = [];
let OSSZEFUGGelemei = [];

function jelszetszedes(mit) {
  mit.forEach(feloszt);
}

function feloszt(item) {
  for (let letter = 0; letter < item.length; letter++) {
    if (!OSSZEFUGGelemei.includes(item[letter]))
      OSSZEFUGGelemei.push(item[letter]);
  }
}

const JELENTESEK = ["/", "(", ")", "|", "'", "[", "]", "{", "}", ".", "*"];

function leghosszabbJel() {
  let a = 0;
  for (let i = 0; i < OSSZEFUGG.length; i++) {
    if (OSSZEFUGG[i].length > a) {
      a = OSSZEFUGG[i].length;
    }
  }
  return a;
}
let osszefuggLength = leghosszabbJel();

/* /[^a-zA-Z ]/g */
const out = document.getElementById("out");

const start = document.getElementById("in");

const listaDiv = document.getElementById("lista");
const eltunes = document.getElementById("eltunes");
const inputTorol = document.getElementById("inputTorol");
const copyEzt = document.getElementById("copy");

document.getElementById("kiirat").addEventListener("click", function (e) {
  if (start.value === "") {
    return alert("Adatot kérek!");
  } else {
    e.preventDefault();

    szavak = [];
    szavakForditasa = [];
    //!sortörések:
    /*   numberOfLineBreaks = (start.value.match(/\n/g) || []).length; */
    eltunes.style.display = "block";
    let toresek = [];
    /* console.log(start.value.length);
  console.log(start.value.replace(/^\s+|\s+$/g, "").length); */

    for (
      let item = 0;
      item < start.value.replace(/^\s+|\s+$/g, "").length;
      item++
    ) {
      if (start.value[item] === "\n") {
        toresek.push(item);
      }
    }

    /*   console.log("toresek: " + toresek); */
    /*  console.log(numberOfLineBreaks); */

    let str = start.value.replace(/  +/g, " "); // teljes egybefüggő szoveg // teljes szoveg masolata atalakitasra eltüntetve a felesleges szóközöket

    /* egy → ketto */

    let szoveg = [];

    for (let letter = 0; letter < str.length; letter++) {
      szoveg.push(str[letter]);
    }
    //szoveg :
    /*  ['e', 'g', 'y', ' ', '→', ' ', 'k', 'e', 't', 't', 'o'] */

    /* console.log(szoveg); */

    /*  let regex = /\W/g; */
    let regex = /[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g;

    let result = str.match(regex); // a teljes szovegbol ami nem betű és szám, felosztva

    // unique nem szöveg és szám listában:
    let uniqueRes = [];

    result.forEach((c) => {
      if (!uniqueRes.includes(c) && c !== " ") {
        uniqueRes.push(c);
      }
    });

    for (let i = 0; i < JELENTESEK.length; i++) {
      const JelentesekIndex = uniqueRes.indexOf(JELENTESEK[i]);
      if (JelentesekIndex > -1) {
        uniqueRes.splice(JelentesekIndex, 1);
      }
    }

    syntaxFordito(szoveg);
 
    function syntaxFordito(szovegDarabolva) {
      jelszetszedes(OSSZEFUGG);
   
      let osszefuz = [];

      let osszefuggo = "";
      let nyilakHelye = [];

      for (let i = 0; i < szovegDarabolva.length; i++) {
        function check() {
          if (osszefuggo.length <= osszefuggLength && osszefuggo.length > 0) {
            let pos = OSSZEFUGG.indexOf(osszefuggo);

            if (pos !== -1) {
              if (osszefuz[osszefuz.length - 1] !== " ") {
                //negalni
              } else {
                osszefuz.splice(osszefuz.length - 1, 1);
              }
              //! ITT MANUALISAN KELL BEALLITANI MEG AZ ELVALASZTOT:
              if (pos < 6) {
                osszefuz.push(" →");
                osszefuz.push(" ");

                /* console.log(osszefuz[osszefuz.length-1]); */
              } else {
                osszefuz.push(" ←");
                osszefuz.push(" ");
                /* console.log(osszefuz[osszefuz.length-1]); */
              }
            } else {
              osszefuz.push(osszefuggo);
              osszefuggo = "";
            }
          } else {
            osszefuz.push(" ");
            osszefuz.push(osszefuggo);
            osszefuz.push(" ");
            osszefuggo = "";
          }
        }
        if (
          szovegDarabolva[i] === "\n" &&
          (szovegDarabolva[i + 1] !== "\n" || szovegDarabolva[i + 1] !== " ")
        ) {
          osszefuz.push("\n");
        }

        /*  if (toresek.includes(i)) {
        console.log(toresek);
        console.log("itt torjon: "+i);
        osszefuz.push("\n");
      } */

        if (
          !uniqueRes.includes(szovegDarabolva[i]) &&
          szovegDarabolva[i] !== " "
        ) {
          osszefuz.push(szovegDarabolva[i]);
        } // betuk hozzaadasa

        //köztes szóköz megtartása
        if (
          osszefuz[osszefuz.length - 1] === " " &&
          szovegDarabolva[i] === " "
        ) {
          continue;
        }

        if (
          szovegDarabolva[i] === " " &&
          szovegDarabolva[i + 1] !== " " &&
          i < szovegDarabolva.length
        ) {
          osszefuz.push(szovegDarabolva[i]);
        }

        if (
          OSSZEFUGGelemei.includes(szovegDarabolva[i]) &&
          OSSZEFUGGelemei.includes(szovegDarabolva[i + 1])
        ) {
          osszefuggo = osszefuggo + szovegDarabolva[i];

          /* continue; */
        }
        if (
          OSSZEFUGGelemei.includes(szovegDarabolva[i]) &&
          !OSSZEFUGGelemei.includes(szovegDarabolva[i + 1])
        ) {
          osszefuggo = osszefuggo + szovegDarabolva[i];

          check();
          osszefuggo = "";

          continue;
        }
      }

      let osszefuzve = "";
      for (let i = 0; i < osszefuz.length; i++) {
        osszefuzve = osszefuzve + osszefuz[i];
      }

      out.value = osszefuzve;
      /*  */

      for (let item = 0; item < out.value.length; item++) {
        if (out.value[item] === "→") {
          nyilakHelye.push(item);
        }
      }
      // sorok, értékek összefűzése:
      let torespontok = [0, ...nyilakHelye, ...toresek, osszefuzve.length - 1];
      //
      torespontok.sort((a, b) => a - b);

      /*  console.log("torespontok: " + torespontok); */

      let feloszt = [0, ...nyilakHelye];

      function felosztas() {
        function checkNyil(mondat) {
          return mondat.includes("→") ? mondat.replace("→", "") : mondat;
        }
        let hova = true;
        function melyikre(hova) {
          if (hova) {
            /*  console.log(hova); */
            return szavak;
          } else {
            /* console.log(hova); */
            return szavakForditasa;
          }
        }

        for (let i = 0; i < feloszt.length; i++) {
          /* console.log(feloszt); */
          let kovetkezo = i + 1;
          if (kovetkezo > feloszt.length) {
            kovetkezo = feloszt.length - 1;
          }
          let ebbol = osszefuzve.slice(feloszt[i], feloszt[i + 1]).trim();
          if (ebbol.includes("\n") === false) {
            let beilleszt = osszefuzve
              .slice(feloszt[i], feloszt[kovetkezo])
              .trim();

            melyikre(hova).push(checkNyil(beilleszt).trim());
          } else {
            let forduloIndex = ebbol.indexOf("\n");
            let beilleszt = ebbol.slice(0, forduloIndex).trim();

            melyikre(hova).push(checkNyil(beilleszt).trim());
            hova = !hova;
            let beilleszt2 = ebbol.slice(forduloIndex + 1, ebbol.length).trim();
            melyikre(hova).push(checkNyil(beilleszt2).trim());
          }
        }
        console.log(szavak);
        console.log(szavakForditasa);
      }
      felosztas();
     
      // 2 array-bol készítjük a kiíratást:
      function osszerendeles(ezt, erre) {
        
       
        /* listaDiv */
        tbl = document.createElement("table");
        

        let ids = new Date().getTime();
        tbl.setAttribute("id", ids);
        tbl.setAttribute('class',"tbl");
        tbl.style.minWidth = "min-content";
        tbl.style.border = "1px solid black";

        for (let i = 0; i < szavak.length; i++) {
          const tr = tbl.insertRow();
          for (let cella = 0; cella < 2; cella++) {
            let td = tr.insertCell();
            if (cella === 0) {
              td.appendChild(document.createTextNode(`${ezt[i]}`));
            } else {
              td.appendChild(document.createTextNode(`${erre[i]}`));
            }
          }
        }
       
        listaDiv.appendChild(tbl);
        let del = document.createElement("button");

        del.innerHTML = "Tábla törlése";
        del.type = "submit";
        del.name = "formBtn";
        
        del.setAttribute('class',"del");
 /*        del.setAttribute('onClick', "torlomEzt(this.id);" ); */
 function torlomEzt(idek){
  console.log(idek);
  document.getElementById(idek).remove();
 /*  console.log(tbl.id); */
}
        /* del.setAttribute('onclick', 'torlomEzt();' ); */
        del.onclick = function() {torlomEzt(ids);};
        
        tbl.appendChild(del);
        
         
      }
     
      osszerendeles(szavak, szavakForditasa);
    }
  }
});

document.getElementById("torol").addEventListener("click", function (e) {
  e.preventDefault();
  eltunes.style.display = "none";
  start.value = "";
  out.value = "";
  listaDiv.innerHTML = "";
});
document.getElementById("inputTorol").addEventListener("click", function (e) {
  e.preventDefault();
  /* eltunes.style.visibility = 'hidden'; */
  start.value = "";
  out.value = "";
});
//
function selectElementContents(el) {
  const dels = document.querySelectorAll('.del');
  dels.forEach(item => item.style.display = "none");
  
console.log(dels);
  var body = document.body, range, sel;
  if (document.createRange && window.getSelection) {
      range = document.createRange();
      sel = window.getSelection();
      sel.removeAllRanges();
      try {
          range.selectNodeContents(el);
          sel.addRange(range);
      } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
      }
  } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
  }
  document.execCommand("Copy");
  dels.forEach(item => item.style.display = "block");
}

