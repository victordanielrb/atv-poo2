import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class TipoEdicaoCliente extends Processo {
    private clientes: Cliente[]
    constructor() {
            super()
            this.clientes = Armazem.InstanciaUnica.Clientes
        }
    processar(): void {
        
        console.log ("Edição de cliente ")
        let input = '0'

        while (input !="n"){
            let nome = this.entrada.receberTexto('Qual o nome do cliente?')
            if (this.clientes.length == 0) {
                console.log('Nenhum cliente cadastrado')
            }
            else {
               let cliente = this.clientes.find(cliente => cliente.Nome == nome)
                  if (cliente == undefined) {
                    console.log('Cliente não encontrado')
                    input = this.entrada.receberTexto('Deseja continuar editando? (s/n)')
                  }
                    else {
                        console.log('Cliente encontrado')
                        console.log(cliente)
                        
                        console.log('Cliente editado com sucesso')
                        input = this.entrada.receberTexto('Deseja continuar editando? (s/n)')
                    }
            }
        }

    }
}
   