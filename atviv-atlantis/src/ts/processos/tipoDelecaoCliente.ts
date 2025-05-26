
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class TipoDelecaoCliente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a Deleção do cliente...')
        let input = this.entrada.receberTexto('Qual o nome do cliente?')
        let cliente = this.clientes.find(cliente => cliente.Nome == input)
        if (cliente == undefined) {
            console.log('Cliente não encontrado')
        }
        else {
            let index = this.clientes.indexOf(cliente)
            let dependentes = cliente.Dependentes
            if (dependentes != undefined) {
                dependentes.forEach(dependente => {
                    let indexDependente = this.clientes.indexOf(dependente)
                    dependente.Titular = undefined

                })
                
            }
            if (cliente.Titular != undefined) {
                let dependentesTitular = cliente.Titular.Dependentes
                dependentesTitular = dependentesTitular?.filter(dependente => dependente.Nome != cliente.Nome)
                cliente.Titular.Dependentes = dependentesTitular 
                
                
               
            }
           
            this.clientes.splice(index, 1)
            console.log('Cliente deletado com sucesso')
        }
        
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }
}