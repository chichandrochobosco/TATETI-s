
const x = "X";
const o = "O";
let estadoJuego = "P1";
const modal = document.querySelector("dialog"); //defino al modal por el elemento dialog del html
const textoModal = modal.querySelector("h2"); //defino al texto del modal por el h2 del mismo

const cuadrados = Array.from(document.querySelectorAll(".cuadrado")); /*creo un array de todos los cuadrados de la grilla(selecciono la clase cuadrado)*/ 

cuadrados.forEach((cuadrado, i) /*cuadrado cada elemento en el arreglo e i el indice */ => {
    cuadrado.addEventListener("click", ()=> /*funcion flecha*/{
        /*evento que cuando se clickea en algun cuadrado se ejecuta lo siguiente*/
        if(estadoJuego === "pausa") return; /*si esta en pausa se sale de la funcion*/
        if(cuadrado.textContent !== "") return; /*lo mismo si el cuadrado ya tiene contenido X u O respectivamente*/
        cuadrado.innerText = estadoJuego === "P1" ? x : o; /*le asigno al cuadrado un texto segun el estado del juego*/
        
        const posicionGanadora = revisarSiHayGanador(); /*devuelve y guardo la posicion o "empate" */
        if(typeof posicionGanadora === "object"){ /*si la posicion es un objeto y no "empate"*/
            ganar(posicionGanadora); /*llamo a ganar y le paso la posicion, luego salgo de la funcion*/
            return;
        }
        if(posicionGanadora === "empate"){
            mostrarModal("empate"); /*llamo al modal y le paso "empate para que muestre" */
        }
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1"; /*cambio el estado del juego */
    })

}   )

function revisarSiHayGanador(){
    const tablero = cuadrados.map(cuadrado => cuadrado.textContent); /*uso el map para crear un array con los contenidos (X u O) de cada cuadrado y en orden */
    console.log(tablero)

    /*luego utilizo el tablero, que seria mi grilla que contiene los movimientos y analizo si hubo ganador*/
    //horizontal
    for(let i=0; i <=9; i +=3){/*al ser un array, incremento cada tres, lo que viene siendo la fila de la grilla y reviso si los tres elementos de la fila son iguales*/
        if( tablero[i] &&
            tablero[i] === tablero[i+1] &&
            tablero[i] === tablero[i+2] ){
                return [i, i+1, i+2];
            }
    }

    //vertical
    for(let i=0; i <=3; i++){/*aca recorro de a uno pq analizo las columnas y verifico que cada 3 de mi indice sean iguales, o sea toda la columna tenga el mismo valor (X u O)*/
        if( tablero[i] &&
            tablero[i] === tablero[i+3] &&
            tablero[i] === tablero[i+6] ){
                return [i, i+3, i+6];
            }
    }

    //diagonal 
    if( tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8] ){
            return [0, 4, 8];
        }
    if( tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6] ){
            return [2, 4, 6];
        }
    if(tablero.includes("")) return false; /*analiza que no hayan posiciones vacias del tablero para que luego si esta completo y no hubo ganador, marque empate*/
    return "empate";
    
}

function ganar(posicionGanadora){
    console.log("Ganador", posicionGanadora)
    
    posicionGanadora.forEach(posicion => {
        cuadrados[posicion].classList.toggle("ganador", true); /*le agrego la clase ganador a los cuadrados ganadores, para luego en esa clase en css cambiarles el fondo */
    })
    mostrarModal("Ganador: "+estadoJuego) /*llamo al modal y le paso al ganador */
    estadoJuego = "pausa"; /*pongo el juego en pausa ya que se gano asi no se sigue jugando*/
    
}

function mostrarModal(texto){
    textoModal.innerText = texto; /*le paso el h2*/
    modal.showModal(); /*muestro el modal*/
}

modal.querySelector("button").addEventListener("click",() => { /*si al elemento button del modal le hacen click, le asigno la funcion de resetear el juego*/
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = ""; //vacio los cuadrados
        cuadrado.classList.toggle("ganador", false); //borro  la clase ganador de los cuadrados anteriores
        modal.close(); //cierro el modal
        estadoJuego = "P1"; //el estado del juego vuelve como al comienzo, al jugador 1
    });

})
