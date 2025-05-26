import Processo from "../abstracoes/processo";
import DiretorCasal from "../diretores/diretorCasal";
import DiretorFamilia from "../diretores/diretorFamilia";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import Armazem from "../dominio/armazem";
import Acomodacao from "../modelos/acomodacao";

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        
        console.clear()
        console.log('Iniciando o Cadastro de Acomodação...')
        console.log(`
            Qual o tipo de acomodação? \n 
            1 - Solteiro Simples \n
            2 - Solteiro Mais \n
            3 - Família  \n
            4 - Família Mais \n
            5 - Família Super \n
            6 - Casal \n`);
        
        let input = this.entrada.receberTexto(`Qual a opção desejada?`)
            let diretor : any
        switch (input) {
            
            case '1':
                 diretor = new DiretorSolteiroSimples()
                break
            case '2':
                 diretor = new DiretorSolteiroMais()
                break
            case '3':
                 diretor = new DiretorFamilia()
                break
            case '4':
                 diretor = new DiretorFamiliaMais()
                break
            case '5':
                diretor = new DiretorFamiliaSuper()
                break
            case '6':
                 diretor = new DiretorCasal()
                break
            default:
                console.log('Opção inválida')
                break
                
        
    }
    this.acomodacoes.push(diretor.construir())
}}