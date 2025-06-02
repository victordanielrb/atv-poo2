// Utilitários para trabalhar com interfaces do Cliente
import { Cliente, Telefone, Endereco, Documento } from '../interface/interfaces';

export class ClienteUtils {
    // Criar cliente vazio com valores padrão
    static criarClienteVazio(): Cliente {
        return {
            nome: '',
            nomeSocial: '',
            dataNascimento: '',
            dataCadastro: new Date().toISOString().split('T')[0],
            telefones: [],
            endereco: {
                rua: '',
                bairro: '',
                cidade: '',
                numero: 0, 
                estado: '',
                pais: 'Brasil',
                codigoPostal: ''
            },
            documentos: [],
            dependentes: [],
            titular: undefined,
        };
    }

    // Validar cliente completo
    static validarCliente(cliente: Cliente): string[] {
        const erros: string[] = [];
        
        // Validação de nome
        if (!cliente.nome || cliente.nome.trim().length < 2) {
            erros.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        // Validação de data de nascimento
        if (!cliente.dataNascimento) {
            erros.push('Data de nascimento é obrigatória');
        } else {
            const nascimento = new Date(cliente.dataNascimento);
            const hoje = new Date();
            if (nascimento >= hoje) {
                erros.push('Data de nascimento deve ser anterior à data atual');
            }
        }
        
        // Validação de telefones
        if (!cliente.telefones || cliente.telefones.length === 0) {
            erros.push('Cliente deve ter pelo menos um telefone');
        } else {
            cliente.telefones.forEach((tel, index) => {
                if (!this.validarTelefone(tel)) {
                    erros.push(`Telefone ${index + 1} é inválido`);
                }
            });
        }
        
        // Validação de endereço
        if (!this.validarEndereco(cliente.endereco)) {
            erros.push('Endereço deve estar completo');
        }
        
        // Validação de documentos
        if (!cliente.documentos || cliente.documentos.length === 0) {
            erros.push('Cliente deve ter pelo menos um documento');
        } else {
            cliente.documentos.forEach((doc, index) => {
                if (!this.validarDocumento(doc)) {
                    erros.push(`Documento ${index + 1} é inválido`);
                }
            });
        }
        
        return erros;
    }

    // Validar telefone
    static validarTelefone(telefone: Telefone): boolean {
        return telefone.ddd.length >= 2 && telefone.numero.length >= 8;
    }

    // Validar endereço
    static validarEndereco(endereco: Endereco): boolean {
        return !!(endereco.rua && endereco.cidade && endereco.estado && 
                 endereco.pais && endereco.codigoPostal);
    }

    // Validar documento
    static validarDocumento(documento: Documento): boolean {
        if (!documento.numero || documento.numero.trim().length === 0) {
            return false;
        }
        
        // Validações específicas por tipo
        switch (documento.tipo) {
            case 'Cadastro de Pessoas Física':
                return this.validarCPF(documento.numero);
            case 'Registro Geral':
                return documento.numero.length >= 7;
            case 'Passaporte':
                return documento.numero.length >= 6;
            default:
                return false;
        }
    }

    // Validação básica de CPF (apenas formato)
    static validarCPF(cpf: string): boolean {
        const cpfLimpo = cpf.replace(/\D/g, '');
        return cpfLimpo.length === 11;
    }

    // Formatação de telefone
    static formatarTelefone(telefone: Telefone): string {
        return `(${telefone.ddd}) ${telefone.numero}`;
    }

    // Formatação de endereço completo
    static formatarEndereco(endereco: Endereco): string {
        return `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.pais}, CEP: ${endereco.codigoPostal}`;
    }

    // Calcular idade
    static calcularIdade(dataNascimento: string): number {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        
        if (mesAtual < nascimento.getMonth() || 
            (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())) {
            idade--;
        }
        
        return idade;
    }

    // Criar telefone vazio
    static criarTelefoneVazio(): Telefone {
        return {
            ddd: '',
            numero: ''
        };
    }

    // Criar endereço vazio
    static criarEnderecoVazio(): Endereco {
        return {
            rua: '',
            bairro: '',
            cidade: '',
            numero: 0, // Pode ser opcional
            estado: '',
            pais: 'Brasil',
            codigoPostal: ''
        };
    }

    // Criar documento vazio
    static criarDocumentoVazio(): Documento {
        return {
            numero: '',
            tipo: 'Cadastro de Pessoas Física',
            dataExpedicao: new Date()
        };
    }

    // Clonar cliente (deep copy)
    static clonarCliente(cliente: Cliente): Cliente {
        return {
            ...cliente,
            telefones: cliente.telefones.map(t => ({ ...t })),
            endereco: { ...cliente.endereco },
            documentos: cliente.documentos.map(d => ({ ...d })),
            dependentes: cliente.dependentes?.map(dep => this.clonarCliente(dep))
        };
    }
}

// Utilitários para formatação
export class FormatUtils {
    // Formatar CPF
    static formatarCPF(cpf: string): string {
        const cpfLimpo = cpf.replace(/\D/g, '');
        if (cpfLimpo.length === 11) {
            return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return cpf;
    }

    // Formatar CEP
    static formatarCEP(cep: string): string {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length === 8) {
            return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return cep;
    }

    // Formatar data para exibição
    static formatarData(data: string): string {
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR');
    }
}
