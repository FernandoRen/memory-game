let container = document.querySelector(".contenedor");
let intentosDOM = document.querySelector("#intentos");
let clicks = [];
let cardToBlack = [];
let intentos = 0;

document.addEventListener("DOMContentLoaded", () =>{
    container.addEventListener("click", elemento);
});

construirCard();

function construirCard(){
    const arregloCartas = seleccionarCartas();

    let randomPositionDom = [...arregloCartas, ...arregloCartas];
    randomPositionDom = randomPositionDom.sort(() => Math.random() - 0.5);
    let index = 0;
    for (let i = 0; i < 16; i++) {
        let divCard =  document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute("id", randomPositionDom[i]+"-"+index);
        
        container.appendChild(divCard);
        index++;
    }
}

function elemento(e){
    let tag;
    if(clicks.length < 3){
        
        if (e.srcElement){
            tag = e.srcElement.id;
        } else if (e.target) {
            tag = e.target.id;
        }

        if (tag != "contenedor") {
            //return tag;
            console.log("El elemento selecionado ha sido " + tag);

        
            let id_DOM = document.getElementById(tag);
            let id_Revelar = revelar(tag);
        
            clicks.push(id_Revelar);
            cardToBlack.push(tag);
        
            id_DOM.style.backgroundColor = "transparent";
            id_DOM.innerHTML = `
                <img src="./img/${id_Revelar}.jpg" height="120px" width="200px" class="pXY-10">
            `;

            if(clicks.length == 2){
                container.removeEventListener("click", elemento);
               // setTimeout(function(){
                    if (clicks[0] != clicks[1]) {
                        for (let i = 0; i < cardToBlack.length; i++) {
                           let addFrame = document.getElementById(cardToBlack[i]);
                            addFrame.style.border = "3px solid red";
                        }
                        
                        if (cardToBlack.length == 2) {
                            for(let i = 0; i < cardToBlack.length; i++){
                                let backToBlack = document.getElementById(cardToBlack[i]);
                                setTimeout(function(){
                                    backToBlack.style.backgroundColor = "black";
                                    id_DOM.innerHTML = "";
                                    backToBlack.innerHTML = ``;
                                    backToBlack.style.border = "none";
                                    container.addEventListener("click", elemento);
                                }, 1200);
                            }
                        }
                
                    } else {
                        
                        for (let i = 0; i < cardToBlack.length; i++) {
                            let addFrame = document.getElementById(cardToBlack[i]);
                            addFrame.style.border = "3px solid green";
                        }
                        setTimeout(function(){
                        container.addEventListener("click", elemento);
                    }, 1200);
                    }
                    clicks = [];
                    cardToBlack = [];
                    avoidSameCard = [];
                   // container.addEventListener("click", elemento);
               // }, 500);
               intentos++;
               intentosDOM.innerHTML = `Intentos: ${intentos}`;
            } 
        }
    }
}


function revelar(tag){
    let elementoClickeado = tag;
    let id = elementoClickeado.split("-");
    return id[0];
}

function seleccionarCartas(){
    let randomSelection = [];
    const min = 0;
    const max = 31;
    let numeroRandom;

    for (let i = 0; randomSelection.length < 8; i++) {
        numeroRandom = Math.floor(Math.random()*(max-min+1)+min);
        if (randomSelection.length > 0) {
            let valorRepetido = randomSelection.includes(numeroRandom);
            
            if (!valorRepetido) {
                randomSelection.push(numeroRandom);
            }
            
        } else {
            randomSelection.push(numeroRandom);
        }
    }

    return randomSelection;
}