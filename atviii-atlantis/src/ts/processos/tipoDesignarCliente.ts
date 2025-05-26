
import { log } from "console";
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";

export default class TipoDesignarCliente extends Processo {
    private clientes: Cliente[]
    private acomodacao: Acomodacao
    private acomodacoes: Acomodacao[]
    constructor(acomodacao: Acomodacao) {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
        this.acomodacao = this.acomodacoes.find(acomodacao => acomodacao == acomodacao && acomodacao.Cliente == undefined) as Acomodacao
        
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a Designação do cliente...')
        let input = this.entrada.receberTexto('Qual o nome do cliente?')
        let cliente = this.clientes.find(cliente => cliente.Nome == input)
        if (cliente == undefined) {
            console.log('Cliente não encontrado')
        }
        else {
           
           
           
            if (this.acomodacao.Cliente == undefined ) {
                this.acomodacao.Cliente = cliente
                cliente.Acomodacao = this.acomodacao
                console.log('Cliente designado com sucesso!') 
                
                
               
        }
        
        
    }
    
}}