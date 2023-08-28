//document.querySelectorAll("button").forEach(obj => obj.addEventListener("click", btnPulsado));


const x = "X";
const o = "O";
let estadoJuego = "P1";

const cuadrados = document.querySelectorAll(".cuadrado");

cuadrados.forEach((cuadrado, i) => {
    cuadrado.addEventListener("click", ()=>{
        console.log("cuadrado")
        cuadrado.innerText = estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";
        revisarSiHayGanador()

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
                console.log("ganamos")
            }
    }

    //vertical
    for(let i=0; i <=3; i++){
        if( tablero[i] &&
            tablero[i] === tablero[i+3] &&
            tablero[i] === tablero[i+6] ){
                console.log("ganamos")
            }
    }

    //diagonal 
    if( tablero[0] &&
        tablero[0] === tablero[4] &&
        tablero[0] === tablero[8] ){
            console.log("ganamos")
        }
    if( tablero[2] &&
        tablero[2] === tablero[4] &&
        tablero[2] === tablero[6] ){
            console.log("ganamos")
        }

}