import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";


export default class CadastroDependente extends Processo {
    titular: Cliente;
    
    constructor(titular: Cliente) {
        super()
        this.titular = titular
    }
    processar( ): void {
        
        console.log('Iniciando o cadastro de um novo cliente dependente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        let dependente = new Cliente(nome, nomeSocial, dataNascimento)
        this.titular.setDependentes(dependente)
    }
    
    
}