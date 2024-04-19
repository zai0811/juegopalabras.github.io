
let nroIntentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let caracteresAcertados = 0;

// Palabra seleccionada de la lista para comparar
//const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];




let palabra = "";
const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es";
fetch(API)
    .then((response) => response.json())
    .then((response) => {
        palabra = response[0].toUpperCase();
        console.log(palabra);


    })
    .catch((err) => {
        console.log(err);
        deshabilitarBoton(true, "gray");
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)].toUpperCase();
        console.log(palabra);

        setTimeout(() => {
            deshabilitarBoton(false, "#0CBABA");; // Habilita el botón y restaura su color normal después de un cierto tiempo (puedes ajustar el tiempo según tus necesidades)
        }, 2000); // Habilita el botón después de 2 segundos (ejemplo)
    });


function deshabilitarBoton(estado, color) {
    const button = document.getElementById("guess-button");
    button.disabled = estado;
    button.style.backgroundColor = color;
}


// Matriz para rastrear las posiciones de los caracteres acertados
const caracteresAcertadosPosiciones = new Array(palabra.length).fill(false);



// Función para actualizar la vista con los intentos restantes
function actualizarIntentos() {
    const intentosRestantes = document.getElementById("idIntentos");
    intentosRestantes.innerHTML = nroIntentos;
}

// Función para manejar el intento del jugador
function intentar() {
    const GRID = document.getElementById("grid");
    //crea la etiqueta "div" que va contener el numero de columnas de una fila y pone el estilo "row"(style.css)
    const ROW = document.createElement('div');
    ROW.className = 'row';
    let palabraIngresada = document.getElementById("guess-input").value.toUpperCase(); // Convertir a mayúsculas para comparar


    if (nroIntentos > 0 && (palabraIngresada.length == palabra.length)) {
        for (let i = 0; i < palabraIngresada.length; i++) {
            //crea la etiqueta "spam" que son cada uno de los elementos de l fila  y llama al estilo  "letter"(style.css)
            const SPAN = document.createElement('span');
            SPAN.style.borderRadius = '5px';
            SPAN.className = 'letter';
            //va cambiando el color dependiendo del estado
            //si acierta la letra en esa posicion "caracteresAcertados" suma 1
            if (palabraIngresada[i] === palabra[i]) {
                //si la posicion es true significa que ya esta pintado y no cuenta ese caracter
                if (caracteresAcertadosPosiciones[i]) {
                    SPAN.innerHTML = palabraIngresada[i];
                    SPAN.style.backgroundColor = 'green';
                    //caso contrario cuenta
                } else {
                    caracteresAcertados++;
                    caracteresAcertadosPosiciones[i] = true; // Marcar como acertado
                    console.log("caracteresAcertados " + caracteresAcertados);
                    SPAN.innerHTML = palabraIngresada[i];
                    SPAN.style.backgroundColor = 'green';
                }
            } else if (palabra.includes(palabraIngresada[i])) {
                SPAN.innerHTML = palabraIngresada[i];
                SPAN.style.backgroundColor = 'yellow';
            } else {
                SPAN.innerHTML = palabraIngresada[i];
                SPAN.style.backgroundColor = 'gray';
            }

            ROW.appendChild(SPAN);
        }
        //agrega una fila a la grilla cuando termina de comparar todas las letras
        GRID.appendChild(ROW);
        nroIntentos--;
        actualizarIntentos();

        if (caracteresAcertados === palabra.length) {
            terminar("GANASTE");
        } else if (nroIntentos === 0) {
            terminar("PERDISTE");
        }
    } else {
        // si ingresa una palabra mayor a numero que deberia muestra un mensaje
        mostrarMensaje("debes ingresar " + palabra.length + " letras")
    }
}

function terminar(mensaje) {
    mostrarMensaje(mensaje);
    //deshabilita el boton  y la caja de texto
    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-button").disabled = true;
}

function mostrarMensaje(mensaje) {

    const modal = document.getElementById("myModal");
    const mensajeModal = document.getElementById("modal-message");
    //dispara un modal cuanndo termine el juego
    if (mensaje == "PERDISTE") {
        mensajeModal.style.color = 'red'
        mensajeModal.innerHTML = mensaje;
    }
    else if (mensaje == "GANASTE") {
        mensajeModal.style.color = 'green'
        mensajeModal.innerHTML = mensaje;
    }
    else {
        // si ingresa una palabra mayor a numero que deberia muestra un mensaje
        mensajeModal.innerHTML = mensaje;
    }
    modal.style.display = "block";
    //accion que realiza para cerrar el modal
    const closeModalButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeModalButtons.length; i++) {
        closeModalButtons[i].addEventListener("click", function () {
            const modal = document.getElementById(this.getAttribute("data-target"));
            modal.style.display = "none";
        });
    }
}
// Agregar un event listener al botón de "Intentar"
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const reiniciar = document.getElementById("reiniciar");
reiniciar.addEventListener("click", function () {
    // Recarga la página
    location.reload();
});
// inicialmente va mostrar los intentos disponibles
actualizarIntentos();


