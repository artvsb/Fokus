const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const botoes = [focoBtn, curtoBtn, longoBtn]

function ativarBotao(btnSelecionado) {
    botoes.forEach((btn) => {
        btn.classList.remove('active')
    })
    btnSelecionado.classList.add('active')
}

focoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco')
    banner.setAttribute('src', '/imagens/foco.png')
    ativarBotao(focoBtn)
})

curtoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto')
    banner.setAttribute('src', '/imagens/descanso-curto.png')
    
    ativarBotao(curtoBtn)
})

longoBtn.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
    banner.setAttribute('src', '/imagens/descanso-longo.png')
    ativarBotao(longoBtn)
})