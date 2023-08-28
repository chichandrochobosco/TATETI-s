//document.querySelectorAll("button").forEach(obj => obj.addEventListener("click", btnPulsado));


const x = "X";
const o = "O";
let estadoJuego = "P1";

const cuadrados = document.querySelectorAll("cuadrado");

cuadrados.forEach((cuadrados, i) => {
    cuadrado.addEventListener("click", ()=>{
        cuadrado.innerText = estadoJuego === "P1" ? x : o;
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1";

    })

})