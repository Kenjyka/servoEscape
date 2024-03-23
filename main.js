playButton = document.querySelectorAll(".play")

var t = []

playButton.forEach(elemento => {
    elemento.addEventListener("click", evento => {
        evento.stopImmediatePropagation()
        caixa_alvo = (elemento.parentElement.parentElement.querySelector(".timer"))
        console.log(elemento)
        if (elemento.classList.contains("play")) {
            let index = iniciarTimer(caixa_alvo)
        }
        elemento.classList.toggle("play")
        elemento.classList.toggle("pause")
    })
});

function iniciarTimer (caixa) {
    minutos = caixa.querySelector(".minutos")
    segundos = caixa.querySelector(".segundos")

    let stop = false
    for (let i = 0; stop != true; i++) {
        if (!t[i]) {
            timer (segundos, minutos, i)
        
            t[0] = setInterval(() =>{
                minutos = caixa.querySelector(".minutos")
                segundos = caixa.querySelector(".segundos")
                timer(segundos, minutos, i)
            }, 1000)
            stop = true
            return i    
        }
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
    } else {
        segundos--
    }
    
    minutos_raw.value = minutos
    segundos_raw.value = segundos
}

function pausaTimer (elemento, index) {
    clearInterval(t[index])
    delete t[index]
}