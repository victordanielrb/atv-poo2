import { log } from "console";
import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Entrada from "../io/entrada";
import entrada from "../io/entrada";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

export default class tipoDesignarDependente extends Processo {
    private clientes: Cliente[]

    constructor( ){
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }
    processar(): void {
        const entrada = new Entrada
        console.log("Bem vinda a designação de dependente");
        let nomeTitular = entrada.receberTexto("Digite o nome do titular : ")

        let titular = this.clientes.find(cliente => cliente.Nome == nomeTitular)
        if (titular == undefined) {
            console.log("Titular não encontrado");
        }
        else {
            let nomeDependente = entrada.receberTexto("Digite o nome do dependente : ")
            let dependente = this.clientes.find(cliente => cliente.Nome == nomeDependente)
            if (dependente == undefined) {
                console.log("Dependente não encontrado");
            }
            else {
                
               
                dependente.Titular = titular
                titular.Dependentes?.push(dependente)
                console.log("Dependente designado com sucesso");
            }
        
             }
   
                       
        }
}
