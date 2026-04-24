const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title') 
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.getElementById('alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const finish = new Audio('/sons/beep.mp3')
musica.loop = true // faz com que a musica fique se repetindo 
startPauseBt = document.querySelector('.app__card-primary-button')
const textoBotaoStartPause = document.querySelector('#start-pause span')
const imagemBotaoStartPause = document.querySelector('#start-pause img')
const timer = document.querySelector('#timer')
let tempoDecorridoEmSegundos = 1500 // 25 minutos
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

function alterarContexto(contexto) {
    exibirTempo()
    botoes.forEach( (contexto) => {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML =  `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `           
            break;
        default:
            break;        
    }
}

focoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBtn.classList.add('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBtn.classList.add('active')
})

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        finish.play()
        alert('Tempo finalizado!')
        zerar()
        textoBotaoStartPause.textContent = 'Começar'
        imagemBotaoStartPause.setAttribute('src', '/imagens/play_arrow.png')
        return
    }
    tempoDecorridoEmSegundos -= 1
    exibirTempo()
}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    if (intervaloId) {
        pause.play()
        zerar()
        textoBotaoStartPause.textContent = 'Continuar'
        imagemBotaoStartPause.setAttribute('src', '/imagens/play_arrow.png')
        return
    }
    play.play()
    imagemBotaoStartPause.setAttribute('src', '/imagens/pause.png')    
    textoBotaoStartPause.textContent = 'Pausar'
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
}

function exibirTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit'
    })

    timer.innerHTML = `${tempoFormatado}`
}

exibirTempo() // chamamos o método para que o tempo seja sempre exibido em tela