import { log } from "console";
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDepentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        let input = this.entrada.receberTexto('Deseja listar um dependete em específico? (s/n)')
        if (input == 's') {
            let nome = this.entrada.receberTexto('Qual o nome do Titular?')
            let titular = this.clientes.find(cliente => cliente.Titular?.Nome == nome)
            if (titular == undefined) {
                console.log('Cliente não encontrado')
            }
            else {
                console.log('Iniciando a listagem dos dependentes de ' + titular.Nome);
                
                titular.Dependentes?.forEach(cliente => {
                    this.impressor = new ImpressaorCliente(cliente)
                    console.log(this.impressor.imprimir())
                })
               
            }
        }
        else {
            console.log('Iniciando a listagem dos clientes dependentes...')
            this.clientes.forEach(cliente => {
                if (this.dependente(cliente)) {
                    this.impressor = new ImpressaorCliente(cliente)
                    console.log(this.impressor.imprimir())
                }
            })
        }
    }
    private dependente(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular !== undefined) {
            verificacao = true
        }
        return verificacao
    }
}