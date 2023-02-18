// Aufgabe 3
"use strict"
let request = new XMLHttpRequest();
function requestData() { // fordert die Daten asynchron an
    "use strict";
    let frage = document.getElementById("meineFrage").value;
    //frage = frage.replace(/ /g, "%20");
    console.log(frage);
    request.open("GET", "ExamAPI.php?Question="+frage);
    request.onreadystatechange = processData;
    request.send(null);
}

function processData() {
    "use strict";
    if (request.status === 404) { // Be aware! readyState is 2 for 404 !
        console.log("word not found");
    }
    if (request.readyState === 4) { // Uebertragung = DONE
        if (request.status === 200) { // HTTP-Status = OK
            if (request.responseText != null) {
                updateView(request.responseText); // Daten verarbeiten
            } else console.error("Dokument ist leer");
        } else console.error("Uebertragung fehlgeschlagen");
    } // else; // Uebertragung laeuft noch
}




function updateView(jsonData){
    "use strict";
    console.log(jsonData);

    let dataObject = JSON.parse(jsonData);
    let chatAusgabe = document.getElementById("chatAusgabe");

    let date = new Date();
    let time= date.getHours() + ":" + date.getMinutes() + ":"+ date.getSeconds();

    if(jsonData === null){
       chatAusgabe.innerText ="";
    }else {
        let Ergebnis = time + ": " + dataObject.answer + "\n";
        chatAusgabe.innerText += Ergebnis ;
    }
        //chatAusgabe.firstChild.nodeValue =  dataObject.answer +"\n";


}

function pollData(){
    "use strict"
    requestData();
}

window.onload = pollData;
