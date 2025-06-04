import React, { useState } from 'react';
import { Cliente, Telefone, Endereco, Documento } from '../../interface/interfaces';
import { ClienteUtils } from '../../utils/clienteUtils';
import Instancia from '../instancia/instancia';


interface CadastroClienteTitularProps {
    onCadastrar: (cliente: Cliente) => void;
    onVoltar: () => void;
}

export function CadastroClienteTitular({ onCadastrar, onVoltar }: CadastroClienteTitularProps) {
    
    
    
    const [dados, setDados] = useState<Cliente>(ClienteUtils.criarClienteVazio());
    
    const [telefoneAtual, setTelefoneAtual] = useState<Telefone>({ ddd: '', numero: '' });
    const [documentoAtual, setDocumentoAtual] = useState<Documento>({ 
        numero: '', 
        tipo: '', 
        dataExpedicao: new Date() 
    });    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        if (!dados.nome || !dados.dataNascimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar se tem pelo menos um telefone
        if (dados.telefones.length === 0) {
            alert('É necessário adicionar pelo menos um telefone.');
            return;
        }

        // Criar o titular completo
        const novoTitular: Cliente = {
            ...dados,
            dependentes: [] // Inicia sem dependentes
        };

        onCadastrar(novoTitular);
        alert('Cliente cadastrado com sucesso!');
        
        // Limpar formulário
        setDados(ClienteUtils.criarClienteVazio());
    };const handleChange = (field: keyof Cliente, value: string) => {
        setDados(prev => ({ ...prev, [field]: value }));
    };    const handleEnderecoChange = (field: keyof Endereco, value: string) => {
        setDados(prev => ({
            ...prev,
            endereco: { 
                ...prev.endereco, 
                [field]: field === 'numero' ? Number(value) || 0 : value 
            }
        }));
    };

    const handleTelefoneChange = (field: keyof Telefone, value: string) => {
        setTelefoneAtual(prev => ({ ...prev, [field]: value }));
    };

    const adicionarTelefone = () => {
        if (telefoneAtual.ddd && telefoneAtual.numero) {
            setDados(prev => ({
                ...prev,
                telefones: [...prev.telefones, { ...telefoneAtual }]
            }));
            setTelefoneAtual({ ddd: '', numero: '' });
        }
    };

    const removerTelefone = (index: number) => {
        setDados(prev => ({
            ...prev,
            telefones: prev.telefones.filter((_, i) => i !== index)
        }));
    };

    const handleDocumentoChange = (field: keyof Documento, value: string | Date) => {
        setDocumentoAtual(prev => ({ ...prev, [field]: value }));
    };

    const adicionarDocumento = () => {
        if (documentoAtual.numero && documentoAtual.tipo) {
            setDados(prev => ({
                ...prev,
                documentos: [...prev.documentos, { ...documentoAtual }]
            }));
            setDocumentoAtual({ numero: '', tipo: '', dataExpedicao: new Date() });
        }
    };

    const removerDocumento = (index: number) => {
        setDados(prev => ({
            ...prev,
            documentos: prev.documentos.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Cadastrar Cliente Titular</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome Completo *
                            </label>
                            <input
                                type="text"
                                value={dados.nome}
                                onChange={e => handleChange('nome', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Digite o nome completo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome Social
                            </label>
                            <input
                                type="text"
                                value={dados.nomeSocial}
                                onChange={e => handleChange('nomeSocial', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nome social (opcional)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data de Nascimento *
                            </label>
                            <input
                                type="date"
                                value={dados.dataNascimento}
                                onChange={e => handleChange('dataNascimento', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Data de Cadastro
                            </label>
                            <input
                                type="date"
                                value={dados.dataCadastro}
                                onChange={e => handleChange('dataCadastro', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                {/* Telefones */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Telefones *</h3>
                    
                    {/* Adicionar telefone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                        <div>
                            <input
                                type="text"
                                value={telefoneAtual.ddd}
                                onChange={e => handleTelefoneChange('ddd', e.target.value)}
                                placeholder="DDD (ex: 11)"
                                maxLength={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={telefoneAtual.numero}
                                onChange={e => handleTelefoneChange('numero', e.target.value)}
                                placeholder="Número (ex: 99999-9999)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>                        <button
                            type="button"
                            onClick={adicionarTelefone}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* Lista de telefones */}
                    {dados.telefones.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">Telefones cadastrados:</h4>
                            {dados.telefones.map((telefone, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                    <span>({telefone.ddd}) {telefone.numero}</span>                                    <button
                                        type="button"
                                        onClick={() => removerTelefone(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Endereço */}
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Endereço</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                            <input
                                type="text"
                                value={dados.endereco.rua}
                                onChange={e => handleEnderecoChange('rua', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rua, Avenida, etc."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                            <input
                                type="number"
                                value={dados.endereco.numero}
                                onChange={e => handleEnderecoChange('numero', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Número"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                            <input
                                type="text"
                                value={dados.endereco.bairro}
                                onChange={e => handleEnderecoChange('bairro', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Bairro"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input
                                type="text"
                                value={dados.endereco.cidade}
                                onChange={e => handleEnderecoChange('cidade', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Cidade"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input
                                type="text"
                                value={dados.endereco.estado}
                                onChange={e => handleEnderecoChange('estado', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Estado/UF"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                            <input
                                type="text"
                                value={dados.endereco.pais}
                                onChange={e => handleEnderecoChange('pais', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="País"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                            <input
                                type="text"
                                value={dados.endereco.codigoPostal}
                                onChange={e => handleEnderecoChange('codigoPostal', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="CEP/Código Postal"
                            />
                        </div>
                    </div>
                </div>

                {/* Documentos */}
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Documentos</h3>
                    
                    {/* Adicionar documento */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
                        <div>
                            <select
                                value={documentoAtual.tipo}
                                onChange={e => handleDocumentoChange('tipo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Tipo do documento</option>
                                <option value="CPF">CPF</option>
                                <option value="RG">RG</option>
                                <option value="CNH">CNH</option>
                                <option value="Passaporte">Passaporte</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={documentoAtual.numero}
                                onChange={e => handleDocumentoChange('numero', e.target.value)}
                                placeholder="Número do documento"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                value={documentoAtual.dataExpedicao instanceof Date ? 
                                    documentoAtual.dataExpedicao.toISOString().split('T')[0] : 
                                    documentoAtual.dataExpedicao}
                                onChange={e => handleDocumentoChange('dataExpedicao', new Date(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>                        <button
                            type="button"
                            onClick={adicionarDocumento}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Adicionar
                        </button>
                    </div>

                    {/* Lista de documentos */}
                    {dados.documentos.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="font-medium text-gray-700">Documentos cadastrados:</h4>
                            {dados.documentos.map((documento, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                    <span>
                                        {documento.tipo}: {documento.numero} 
                                        (Expedição: {documento.dataExpedicao instanceof Date ? 
                                            documento.dataExpedicao.toLocaleDateString() : 
                                            new Date(documento.dataExpedicao).toLocaleDateString()})
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removerDocumento(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        🗑️ Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Botões de ação */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                    >
                        ✅ Cadastrar Titular
                    </button>
                    <button
                        type="button"
                        onClick={onVoltar}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                    >
                        ◀️ Voltar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CadastroClienteTitular;

