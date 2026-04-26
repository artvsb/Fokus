// encontrar o botão Adicionar tarefa
const btnAddTarefa = document.querySelector('.app__button--add-task')
const formAddTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')
ulTarefas = document.querySelector('.app__section-task-list')
const btnCancelar = document.querySelector(".app__form-footer__button--cancel")
const tarefaEmAndamento = document.querySelector(".app__section-active-task-description")
const btnLimparConcluidas = document.getElementById("btn-remover-concluidas")
const btnLimparTodasTarefas = document.getElementById("btn-remover-todas")

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSecionada = null

function attTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    
    `

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt('Informe o nome da tarefa: ')

        tarefaSelecionada = tarefa

        /* serve para bloquear strings vazias e valores null
        só vai atualizar o localStorage se houver valor verdadeiro */ 
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao // att front end
            tarefa.descricao = novaDescricao // att back end
            attTarefas() // att localStorage            
        }

    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    if (tarefa.completa) {
        li.classList.add("app__section-task-list-item-complete")
        botao.setAttribute('disabled', 'disabled')
    } else {
        li.onclick = () => {
            // desmarca todas as atividades selecionadas
            document.querySelectorAll(".app__section-task-list-item-active")
                .forEach(elemento => {
                    elemento.classList.remove("app__section-task-list-item-active")
            })
            // verifica se a atividade selecionada é igual a que já está selecionada
            if (tarefaSelecionada == tarefa) {
                tarefaEmAndamento.textContent = ''
                tarefa.classList.remove("app__section-task-list-item-active")
                tarefaSelecionada = null
                liTarefaSecionada = null
                return
            }

            tarefaSelecionada = tarefa
            liTarefaSecionada = li
            tarefaEmAndamento.textContent = tarefa.descricao

            li.classList.add("app__section-task-list-item-active")
        
        }
    }    
    return li
}

function limparForm() {
    textArea.value = ''
    formAddTarefa.classList.toggle('hidden')
}

btnAddTarefa.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden')
})

btnCancelar.addEventListener('click', limparForm)

formAddTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault()
    /* const descricaoTarefa = textArea.value -> não é necessária, pois estamos
    um objeto 'tarefa' e inserindo 'descricao' dentro */
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)

    const elementoTarefa = criarElementoTarefa(tarefa) // a function retorna um 'li' que foi criado
    ulTarefas.append(elementoTarefa)
    attTarefas()

    // hora de limpar e esconder o formulário
    textArea.value = '' // zera a string do form
    formAddTarefa.classList.add('hidden') // esconde o form
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)    
})

document.addEventListener('focoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSecionada) {
        liTarefaSecionada.classList.remove("app__section-task-list-item-active")
        liTarefaSecionada.classList.add("app__section-task-list-item-complete")
        liTarefaSecionada.querySelector('button').setAttribute('disabled', 'disabled')
        tarefaSelecionada.completa = true
        attTarefas() // atualiza e joga no localStorage
    }
})

/* Na funcao abaixo, temos que soCompletas representa um boolean de valor true
Entao, quando executamos o método removerTarefas devemos passar true ou false
se o valor for true, vamos dizer que o selector vai ser a string que representa
a classe de items completos e consequentemente remover apenas as tarefas concluidas
se for false, o selector vai ser igual a classe que contem todas as tarefas 
indiscriminadamente. Sendo assim, deletamos todas as tarefas ao executar o metodo 
com valor false. */

const removerTarefas = (soCompletas) => {
    const selector = soCompletas ? ".app__section-task-list-item-complete" : ".app__section-task-list-item"
    // camada visual
    document.querySelectorAll(selector).forEach(elemento => {
        elemento.remove()
    })
    // persistencia de dados
    tarefas = soCompletas ? tarefas.filter(tarefa => !tarefa.completa) : []
    attTarefas()
}

btnLimparConcluidas.onclick = () => removerTarefas(true)

btnLimparTodasTarefas.onclick = () => removerTarefas(false)
