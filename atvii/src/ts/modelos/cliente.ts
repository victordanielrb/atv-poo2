import { log } from "console"
import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes!: Cliente[]
    private titular!: Cliente

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
    public get Titular() { return this.titular }

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
        
    }
    public getDependentes(): Cliente[] | null {
        if (this.dependentes == undefined || null ){
            return null 
        }
        
        return this.dependentes;
        
    }
    public set Titular(titularcli:Cliente){
        this.titular = titularcli

    }
}   
