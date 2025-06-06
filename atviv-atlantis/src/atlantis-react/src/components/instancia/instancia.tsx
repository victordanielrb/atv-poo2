import { useState } from "react"
import { Acomodacao, Cliente } from "../../interface/interfaces"
import { Servico } from "../../context/StateContext"
import clientes from "../../paginas/clientes";
import { log } from "node:console";

export default  class  Instancia {
    
    private static clientes: Cliente[] = [];
    private static acomodacoes: Acomodacao[]  = [];
    private static servicos: Servico[]  = [];

   

    static getDados() {
        return {
            clientes: Instancia.clientes,
            acomodacoes: Instancia.acomodacoes,
            servicos: Instancia.servicos
        };
    }
    static adicionarCliente(cliente: Cliente) {
        Instancia.clientes.push(cliente);
    }

    static adicionarAcomodacao(acomodacao: Acomodacao) {
        Instancia.acomodacoes.push(acomodacao);
    }
 
            


 
    static setClientes(clientes: Cliente[]) {
        Instancia.clientes = clientes;
    }
    static setAcomodacoes(acomodacoes: Acomodacao[]) {
        Instancia.acomodacoes = acomodacoes;
    }
    static setServicos(servicos: Servico[]) {
        Instancia.servicos = servicos;
    }
    static anexarDependente(dependente: Cliente, titular: Cliente) {
        // Encontra o titular na lista de clientes
        const titularData = Instancia.clientes.find(c => c.nome === titular.nome && c.dataCadastro === titular.dataCadastro);
        const titularIndex = Instancia.clientes.indexOf(titularData) 
        console.log("Titular encontrado:", titularData);
        console.log("Titular index:", titularIndex);
        console.log("Dependente a ser anexado:", Instancia.clientes[titularIndex]);
        

            Instancia.clientes[titularIndex].dependentes.push(dependente);
            // Atualiza o titular do dependente
            dependente.titular = Instancia.clientes[titularIndex];
            Instancia.adicionarCliente(dependente);
            console.log("Dependente anexado com sucesso:", dependente);
       
    }
       private constructor() {}
}