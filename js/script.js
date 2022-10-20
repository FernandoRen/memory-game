let container = document.querySelector(".contenedor");
let clicks = [];
let cardToBlack = [];

construirCard();

function construirCard(){
    for (let i = 0; i < 8; i++) {
        /*container.innerHTML += `
            <div class="card" id="${i}-1">
                <img src="./img/${i}.jpg" height="120px" width="200px" class="d-none">
            </div>
            <div class="card" id="${i}-2">
                <img src="./img/${i}.jpg" height="120px" width="200px" class="d-none">
            </div>
        `;*/
        
        let divCard =  document.createElement("div");
        divCard.classList.add("card");
        divCard.setAttribute("id", i+"-1");

        let divCard2 =  document.createElement("div");
        divCard2.classList.add("card");
        divCard2.setAttribute("id", i+"-2");


        container.appendChild(divCard);
        container.appendChild(divCard2);
    }    
}


container.addEventListener("click", elemento);


function elemento(e){
    let tag;
    if(clicks.length < 3){

        if (e.srcElement){
            tag = e.srcElement.id;
        } else if (e.target) {
            tag = e.target.id;
        }
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

        setTimeout(function(){
            if(clicks.length == 2){
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
            } 
        }, 3000);
        
         
    }
    

    
    
}

function revelar(tag){
    let elementoClickeado = tag;
    let id = elementoClickeado.replace("-1", "");
    id = id.replace("-2", "");

    return id;
    //console.log("id: " +id);
}

