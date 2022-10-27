let container = document.querySelector(".contenedor");
let clicks = [];
let cardToBlack = [];

document.addEventListener("DOMContentLoaded", () =>{
    container.addEventListener("click", elemento);
});

construirCard();

function construirCard(){
    const arregloCartas = seleccionarCartas();

    let randomPositionDom = [...arregloCartas, ...arregloCartas];
    for (let i = 0; i < arregloCartas.length; i++) {
        
        /*let divCard =  document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute("id", arregloCartas[i] +"-1");

        let divCard2 =  document.createElement("div");
        divCard2.classList.add("card");
        divCard2.setAttribute("id", arregloCartas[i] +"-2");


        container.appendChild(divCard);
        container.appendChild(divCard2);*/
    }    
    console.log(randomPositionDom);
    randomPositionDom = randomPositionDom.sort(() => Math.random() - 0.5);
    let index = 0;
    for (let i = 0; i < 16; i++) {
        let divCard =  document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute("id", randomPositionDom[i]+"-"+index);
        
        container.appendChild(divCard);
        index++;
    }

    console.log(randomPositionDom);
    
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
                <img src="./img/${id_Revelar}.jpg" height="120px" width="200px">
            `;

            if(clicks.length == 2){
                container.removeEventListener("click", elemento);
                setTimeout(function(){
                    if (clicks[0] != clicks[1]) {
                        if (cardToBlack.length == 2) {
                            for(let i = 0; i < cardToBlack.length; i++){
                                let backToBlack = document.getElementById(cardToBlack[i]);
                                backToBlack.style.backgroundColor = "black";
                                id_DOM.innerHTML = "";
                                backToBlack.innerHTML = ``;
                            }
                        }
                    }
                    clicks = [];
                    cardToBlack = [];
                    container.addEventListener("click", elemento);
                }, 2000); 
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
                console.log(valorRepetido);
                randomSelection.push(numeroRandom);
            }
            
        } else {
            randomSelection.push(numeroRandom);
        }
    }

    return randomSelection;
}