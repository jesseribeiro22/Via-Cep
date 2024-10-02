//Import do arquivo de dados para manipular a busca do CEP
import { dadosCep } from "./dados.js"

//Recebe o botão pesquisa do HTML no JS
const botaoPesquisar = document.getElementById('pesquisar')

//Função tradicional
function validarDados () {
    //Recebe a caixa de texto do HTML
    let caixaCep = String(document.getElementById('input-cep').value)
    //Cria um variavel do tipo boolean (true ou false)
    let status = false

      //Validação de entrada em branco
    if(caixaCep == ''){
        alert('Não é possível validar o CEP, se a caixa estiver em branco.')
        status = true
    //Validação de quantidade de caracteres
    }else if(caixaCep.length > 9){
        alert('O CEP informado não tem a quantidade de caracteres corretamente')
        status = true
    }

    return status
}

//Função anonima
//Realiza a busca do cep no arquivo de dados local
const getBuscarCep = function(){
    let status = false

    //Pega o cep digitado no formulário
    let caixaCep = document.getElementById('input-cep').value

    dadosCep.dados.forEach(function(item){
        if(caixaCep == item.cep){
            status = true
            //Chama a função para colocar os dados no formulário
            setDadosForm(item)  
        }
        //console.log(item.logradouro)
    })
    return status
}

//Realiza a busca do na API do via cep
const getBuscarCepAPI = async function(){
    //Pega o cep digitado no formulário
    let caixaCep = document.getElementById('input-cep').value

    //variavel que guarda a URL da API do via cep
    //let url = 'https://viacep.com.br/ws/'+caixaCep+'/json/'
    
    let url = `https://viacep.com.br/ws/${caixaCep}/json/`

    //response = resposta

    //Realiza a requisição na API e aguarda (await) a resposta do servidor
    let response = await fetch(url)

    //Converte os dados recebidos em formato JSON
    let dados = await response.json()

    setDadosForm(dados)

}

//Arrow Function (Função de seta)
const setDadosForm = (dadosCep) => {

            //Caixa de texto do form                = dados do CEP
    document.getElementById('logradouro').value     = dadosCep.logradouro
    document.getElementById('complemento').value    = dadosCep.complemento
    document.getElementById('bairro').value         = dadosCep.bairro
    document.getElementById('cidade').value         = dadosCep.localidade
    document.getElementById('estado').value         = dadosCep.uf
}



//Adiciona um evento de escuta (click) no botão Pesquisa
botaoPesquisar.addEventListener('click', function(){
    //Validação para verificar se a função validarDados()
    //retornar false, ai vamos pesquisar o CEP
    if(!validarDados()){
        /*if(!getBuscarCep()){
            alert('Não foi possível encontrar o CEP informado.')
        }*/
        getBuscarCepAPI()

    }
})