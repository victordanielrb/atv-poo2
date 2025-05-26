
import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"
import Entrada from "../io/entrada"
import Acomodacao from "./acomodacao"
export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes!: Cliente[]
    private titular!: Cliente | undefined
    private acomodacao!: Acomodacao | undefined
   
    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public get Nome() { return this.nome }
    public get NomeSocial() { return this.nomeSocial }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular(): Cliente | undefined { 
        if (this.titular == undefined) {
            return undefined
        }
        else {
            return this.titular
        }
       }

    public set Nome(nome: string) {
        this.nome = nome;
    }
    public set NomeSocial(nomeSocial: string) {
        this.nomeSocial = nomeSocial;
    }
    public set DataNascimento(dataNascimento: Date) {
        this.dataNascimento = dataNascimento;
    }
    public set Telefones(telefones: Telefone[]) {
        this.telefones = telefones;
    }
    
    public set Documentos(documentos: Documento[]) {
        this.documentos = documentos;
    }
    public set Dependentes(dependentes: Cliente[]) {
        this.dependentes = dependentes;
    }
    public set Acomodacao(acomodacao: Acomodacao | undefined) {
        this.acomodacao = acomodacao
    }
    public getNome() { 
        if (this.nome == undefined || null ){
            return undefined
        }
        return this.nome }

    public set Endereco(endereco: Endereco) { this.endereco = endereco }
    /**
     * name
     */
    public setDependentes(dependente:Cliente) { 
        if (this.dependentes == undefined || null ){
            this.dependentes = [] 
        }
        
            this.dependentes.push(dependente);
            dependente.titular = this;
            dependente.acomodacao = this.acomodacao;
        
    }
    public getDependentes(): Cliente[] | null {
        if (this.dependentes == undefined || null ){
            return null 
        }
        
        return this.dependentes;
        
    }
   
    public set Titular(titularcli:Cliente|undefined) {
        this.titular = titularcli

    }
}   
