// Interface para dados do formulário de cadastro

// Interface baseada em telefone.ts
export interface Telefone {
    ddd: string;
    numero: string;
}

// Interface baseada em endereco.ts
export interface Endereco {
    rua: string;
    bairro: string;
    cidade: string;
    numero: number; 
    estado: string;
    pais: string;
    codigoPostal: string;

}

// Interface baseada em documento.ts
export interface Documento {
    numero: string;
    tipo: string; // Pode ser enum depois
    dataExpedicao: Date;
}

// Interface baseada em acomodacao.ts
export interface Acomodacao {
    nomeAcomodacao: string;
    camaSolteiro: number;
    camaCasal: number;
    suite: number;
    climatizacao: boolean;
    garagem: number;
    cliente?: Cliente;
}

// Interface baseada em cliente.ts
export interface Cliente {
    nome: string;
    nomeSocial: string;
    dataNascimento: string; // string para formulários (YYYY-MM-DD)
    dataCadastro: string;
    telefones: Telefone[];
    endereco: Endereco;
    documentos: Documento[];
    dependentes: Cliente[];
    titular: Cliente | undefined; // Cliente que é titular, se for dependente
    acomodacao?: Acomodacao;
}

