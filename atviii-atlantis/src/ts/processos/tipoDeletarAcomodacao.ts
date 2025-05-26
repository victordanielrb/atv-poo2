
import { log } from "console";
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";

export default class TipoDelecaoAcomodacao extends Processo {
    private clientes: Cliente[]
    private acomodacoes: Acomodacao[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a Deleção do cliente...')
       log("Deseja deletar uma acomodação com Cliente? (S/N)")
       let input = this.entrada.receberTexto('Qual a opção desejada?')
        if (input == 'S' || input == 's') {
            let nome = this.entrada.receberTexto('Qual o nome do cliente?')
            console.log('Iniciando a Deleção da Acomodação...');
            let acomodacao = this.acomodacoes.find(acomodacao => acomodacao.Cliente?.Nome == nome)
            
        }
    }

}