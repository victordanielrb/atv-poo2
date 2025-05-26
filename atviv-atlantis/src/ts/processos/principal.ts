import Processo from "../abstracoes/processo"
import DiretorCasal from "../diretores/diretorCasal"
import DiretorFamilia from "../diretores/diretorFamilia"
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais"
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper"
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais"
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples"
import Armazem from "../dominio/armazem"
import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao"
import MenuPrincipal from "../menus/menuPricipal"
import Acomodacao from "../modelos/acomodacao"
import CadastroAcomodacoes from "./cadastroAcomodacoes"
import ListagemAcomodacoes from "./listagemAcomodacoes"
import TipoCadastroCliente from "./tipoCadastroCliente"
import TipoDesignarCliente from "./tipoDesignarCliente"
import TipoListagemClientes from "./tipoListagemClientes"

export default class Principal extends Processo {
    private armazem = Armazem.InstanciaUnica
    constructor() {
        super()
        this.execucao = true
        this.menu = new MenuPrincipal()
    }
    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual opção desejada?')
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente()
                this.processo.processar()
                break
            case 3:
                this.processo = new TipoListagemClientes()
                this.processo.processar()
                break
            case 5:
                this.processo = new ListagemAcomodacoes()
                this.processo.processar()
                break
            case 6:
                console.log('Iniciando a Designação de Acomodação...');
                console.log(`Tipos de Acomodação disponíveis: \n
                1 - Solteiro Simples \n
                2 - Solteiro Mais \n
                3 - Família  \n
                4 - Família Mais \n
                5 - Família Super \n
                6 - Casal \n`);
                
                let input = this.entrada.receberNumero('Qual acomodação foi escolhida ?')
                let acomodacao: Acomodacao 
                let pesquisa:any
                switch (input) {
                    case 1:
                     pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.SolteiroSimples && acomodacao.Cliente == undefined)
                    
                    
                    
                    break
                    case 2:
                    pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.SolteiroMais && acomodacao.Cliente == undefined)
                    break
                    case 3:
                    pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.FamilaSimples && acomodacao.Cliente == undefined)
                    break
                    case 4:
                    pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.FamiliaMais && acomodacao.Cliente == undefined)
                    break
                    case 5:
                    pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.FamiliaSuper && acomodacao.Cliente == undefined)
                    break
                    case 6:
                    pesquisa = this.armazem.Acomodacoes.find(acomodacao => acomodacao.NomeAcomadacao == NomeAcomadacao.CasalSimples && acomodacao.Cliente == undefined)
                    break}
                if (pesquisa == undefined) {
                    console.log(pesquisa);
                    
                    console.log('Acomodação não encontrada ou já ocupada')
                    break
                }
                else {
                    acomodacao = pesquisa
                    console.log('Acomodação encontrada:');
                    this.processo = new TipoDesignarCliente(acomodacao)
                }
                this.processo.processar()
                break
            case 7 :
                this.processo = new CadastroAcomodacoes()
                this.processo.processar()
                break
            case 8:
                this.processo = new tipoDeletarAcomodação()
                this.processo.processar()
                break
            case 0:
                this.execucao = false
                console.log('Até logo!')
                console.clear()
                break
            default:
                console.log('Opção não entendida :(')
        }
    }
}