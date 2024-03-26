selectVariables()
createEvents()

var t = []
var cards = 0
const body = document.querySelector("body")





function selectVariables () {
    playButton = document.querySelectorAll(".play")
    resetButton = document.querySelectorAll(".restart")
    editButton = document.querySelectorAll(".edit")
}

function createEvents () {

    playButton.forEach(elemento => {
        elemento.addEventListener("click", evento => {
            evento.stopImmediatePropagation()
    
            let caixa_alvo = (elemento.parentElement.parentElement.querySelector(".timer"))
    
            
            if (elemento.classList.contains("play")) {
                iniciarTimer(caixa_alvo)
                elemento.querySelector(".material-symbols-outlined").innerText = "pause"
            } else if (elemento.classList.contains("pause")) {
                pausaTimer(caixa_alvo)
                elemento.querySelector(".material-symbols-outlined").innerText = "play_arrow"
            }
            elemento.classList.toggle("play")
            elemento.classList.toggle("pause")
    
        })
    });
    
    resetButton.forEach(elemento => {
        elemento.addEventListener("click", e => {
            e.stopImmediatePropagation()
            reset(e.target.parentElement.parentElement.parentElement.parentElement)
    
        })
    })

    editButton.forEach(elemento => {
        elemento.addEventListener("click", e => {
            e.stopImmediatePropagation()
            editCardTitle(e.target)
        })
    })
}

function criaCard () {
    let card = body.appendChild(document.createElement("section"))
    card.classList.add("card_room")
    card.innerHTML = `
    <h1 class="card_title">
            <input type="text" class="card_title_changer">
            <span>sala</span>
            <button><span class="material-symbols-outlined edit">
                edit
                </span></button>
        </h1>

        <main>
            <span class="timer">
                <input type="number" name="minutos" class="minutos" value="60">
                <span>:</span>
                <input type="number" name="segundos" class="segundos" value="00">
            </span>
            <span>
                <button class="play" data-timer-index="${cards}">
                    <span class="material-symbols-outlined">
                    play_arrow
                    </span>
                </button>
                    <button class="restart"><span class="material-symbols-outlined">
                        restart_alt
                    </span>
                </button>
            </span>
        </main>
        
        <footer>
            <span class="dica_holder">
                <input type="number" name="dica" class="dica" value="3" min="0">
                <label>Dicas</label>
            </span>
            <select name="nivel" id="level">
                <option value="easy">Fácil</option>
                <option value="medium">Médio</option>
                <option value="hard">Difícil</option>
                <option value="hardcore">Hardcore</option>
            </select>
        </footer>
    `

    cards++
    selectVariables()
}

function reset (card) {
    let minutos = card.querySelector(".minutos");
    let segundos = card.querySelector(".segundos");
    let dicas = card.querySelector(".dica")
    let nivel = card.querySelector(".level")
    let timerIndex = card.querySelector(".play") ? card.querySelector(".play").getAttribute("data-timer-index") : card.querySelector(".pause").getAttribute("data-timer-index");
    
    minutos.value = 60;
    segundos.value = "00";
    dicas.value = 3
    nivel.value = "easy"
    clearInterval(t[timerIndex]);
}

function iniciarTimer (caixa) {
    let minutos = caixa.querySelector(".minutos")
    let segundos = caixa.querySelector(".segundos")
    let timerIndex = caixa.parentElement.querySelector(".play").getAttribute("data-timer-index")
    console.log(timerIndex)
    
    if (!t[timerIndex]) {
        timer (segundos, minutos, timerIndex)

        t[timerIndex] = setInterval(() =>{
            minutos = caixa.querySelector(".minutos")
            segundos = caixa.querySelector(".segundos")
            timer(segundos, minutos, timerIndex)
        }, 1000)
        stop = true    
    } else {
        window.alert("erro 001")
    }
    
}

function timer (segundos_raw, minutos_raw, index) {
    minutos = minutos_raw.value
    segundos = segundos_raw.value

    if (minutos == 0 && segundos == 0) {
        clearInterval(t[index])
        return;
    } else if (segundos == 0){
        segundos = 59
        minutos--
        if (minutos < 10) {
            minutos = "0" + minutos        
        }
    } else {
        segundos--
        if (segundos < 10) {
            segundos = "0" + segundos
        }
    }

    
    minutos_raw.value = minutos
    segundos_raw.value = segundos
}

function pausaTimer (elemento) {
    console.log(elemento)
    let index = elemento.parentElement.querySelector(".pause") ? elemento.parentElement.querySelector(".pause").getAttribute("data-timer-index") : elemento.parentElement.querySelector(".play").getAttribute("data-timer-index");
    clearInterval(t[index]);
    delete t[index];
}

function editCardTitle(alvo) {
    input = alvo.parentElement.parentElement.querySelector(".card_title_changer")
    span = alvo.parentElement.parentElement.querySelector("span")
    
    if (alvo.classList.contains("edit")) {
        span.style.display = "none"
        input.style.display = "flex"
        input.value = span.innerText
        input.focus()
        alvo.innerText = "done"
    } else {
        input.style.display = "none"
        span.style.display ="inline"
        span.innerText = input.value
        alvo.innerText = "edit"
    }

    alvo.classList.toggle("edit")


}