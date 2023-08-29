//document.querySelectorAll("button").forEach(obj => obj.addEventListener("click", btnPulsado));


const x = "X";
const o = "O";
let estadoJuego = "P1";

const cuadrados = document.querySelectorAll(".cuadrado");

cuadrados.forEach((cuadrado, i) => {
    cuadrado.addEventListener("click", ()=>{
        if(estadoJuego === "pausa") return;
        if(cuadrado.textContent !== "") return;
        cuadrado.innerText = estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
        const posicionGanadora = revisarSiHayGanador();
        if(typeof posicionGanadora === "object"){
            ganar(posicionGanadora);
            return;
        }
        if(posicionGanadora === "empate"){
            console.log("empate")
        }
    })

}   )

function revisarSiHayGanador(){
    const tablero = Array.from(cuadrados).map(cuadrado => cuadrado.textContent);
    console.log(tablero)


    //horizontal
    for(let i=0; i <=9; i +=3){
        if( tablero[i] &&
            tablero[i] === tablero[i+1] &&
            tablero[i] === tablero[i+2] ){
                return [i, i+1, i+2];
            }
    }

    //vertical
    for(let i=0; i <=3; i++){
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
    if(tablero.includes("")) return false;
    return "empate";
}

function ganar(posicionGanadora){
    console.log("Ganador", posicionGanadora)
    estadoJuego = "pausa";
    posicionGanadora.forEach(posicion => {
        cuadrados[posicion].classList.toggle("ganador", true);
    })
}