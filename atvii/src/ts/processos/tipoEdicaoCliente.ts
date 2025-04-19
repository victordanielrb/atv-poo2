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

export default class TipoEdicaoCliente extends Processo {
    private clientes: Cliente[]
    constructor() {
            super()
            this.clientes = Armazem.InstanciaUnica.Clientes
        }
    processar(): void {
        let entrada = new Entrada()
        console.log ("Edição de cliente ")
        let input = '0'

        while (input !="n"){
            let nome = this.entrada.receberTexto('Qual o nome do cliente?')
            if (this.clientes.length == 0) {
                console.log('Nenhum cliente cadastrado')
            }
            else {
               let cliente  = this.clientes.find(cliente => cliente.Nome == nome)
                  if (cliente == undefined) {
                    console.log('Cliente não encontrado')
                    input = this.entrada.receberTexto('Deseja continuar editando? (s/n)')
                  }
                    else {
                        console.log('Cliente encontrado')
                        let novoNome = this.entrada.receberTexto('Qual o novo nome do cliente?')
                        let novoNomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?')
                        let novaDataNascimento = this.entrada.receberTexto('Qual a nova data de nascimento do cliente?')
                        let novaData = new Date(novaDataNascimento)
                        let telefones = []
                        console.log("Atualização de lista de telefones ! \n")
                        while (input != 'n'){
                            
                            let novoDdd = entrada.receberTexto("DDD do novo número \n")
                            let novoTel = entrada.receberTexto("Novo número de telefone\n")
                            telefones.push(new Telefone(  novoDdd,novoTel))
                            input = entrada.receberTexto("Deseja adicionar mais um número? (s/n)\n")
                            
                          
                        }
                        input = entrada.receberTexto("Deseja editar o endereço? (s/n) ")
                        if (input == 's') {
                            let rua = entrada.receberTexto("Rua ")
                            let bairro = entrada.receberTexto("Bairro ")
                            let cidade = entrada.receberTexto("Cidade ")
                            let estado = entrada.receberTexto("Estado ")
                            let pais = entrada.receberTexto("País ")
                            let codigoPostal = entrada.receberTexto("Código postal ")
                            let novoEndereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal)
                            cliente.Endereco = novoEndereco
                        }
                        input = entrada.receberTexto("Deseja editar os documentos? (s/n)")
                        if (input == 's') {
                            let documentos = []
                            while (input != 'n'){
                                let numero = entrada.receberTexto("Número do documento")
                                let tipotext  = entrada.receberTexto(`Tipo do documento
                                    1 - CPF \n
                                    2 - RG \n
                                    3 - Passaporte \n`)
                                let tipo: TipoDocumento = TipoDocumento.CPF
                                switch (tipotext) {
                                    case '1':
                                        tipo = TipoDocumento.CPF
                                        break
                                    case '2':
                                        tipo = TipoDocumento.RG
                                        break
                                    case '3':
                                        tipo = TipoDocumento.Passaporte
                                        break
                                    default:
                                        console.log('Tipo de documento inválido')
                                }
                                let dataExpedicao = entrada.receberTexto("Data de expedição do documento")
                                let novoDocumento = new Documento(numero, tipo , new Date(dataExpedicao))
                                documentos.push(novoDocumento)
                                input = entrada.receberTexto("Deseja adicionar mais um documento? (s/n)")
                            
                            }

                            cliente.Documentos = documentos}
                        
                        input = entrada.receberTexto("Deseja editar os dependentes? (s/n)")
                        if (input == 's') {
                            let dependentes = []
                            while (input != 'n'){
                                let nome = entrada.receberTexto("Nome do dependente : ")
                                let novoDependente = this.clientes.find(cliente => cliente.Nome == nome)
                                if (novoDependente == undefined) {
                                    console.log('Dependente não encontrado')
                                }
                                else {
                                    dependentes.push(novoDependente)
                                    cliente.setDependentes(novoDependente)
                                    console.log('Dependente adicionado com sucesso , dependente: ' + novoDependente.Nome)
                                }
                                input = entrada.receberTexto("Deseja adicionar mais um dependente? (s/n) ")
                            }
                            cliente.Dependentes = dependentes
                        }
                        input = entrada.receberTexto("Deseja editar o titular? (s/n)")
                        if (input === 's') {
                            let nome = entrada.receberTexto("Nome do titular\n")
                            let novoTitular = this.clientes.find(cliente => cliente.Nome == nome)
                            if (novoTitular == undefined) {
                                console.log('Titular não encontrado')
                            }
                            else {
                                cliente.Titular = novoTitular
                                cliente.Dependentes = []
                                console.log('Titular adicionado com sucesso , titular: ' + novoTitular.Nome)
                            }
                        }
                        cliente.Nome = novoNome
                        cliente.NomeSocial = novoNomeSocial
                        cliente.DataNascimento = novaData
                        cliente.Telefones = telefones
                        
                        
                        console.log('Cliente editado com sucesso')
                        input = this.entrada.receberTexto('Deseja continuar editando? (s/n)')
                    }
            }
        }

    }
}
