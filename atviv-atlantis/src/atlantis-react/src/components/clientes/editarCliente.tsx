import React, { useState, useEffect } from 'react';
import { Cliente, Telefone, Endereco, Documento } from '../../interface/interfaces';

interface EditarClienteProps {
    cliente: Cliente;
    onSalvar: (clienteEditado: Cliente) => void;
    onCancelar: () => void;
}

const EditarCliente: React.FC<EditarClienteProps> = ({ cliente, onSalvar, onCancelar }) => {
    const [dados, setDados] = useState<Cliente>(cliente);
    const [telefoneAtual, setTelefoneAtual] = useState<Telefone>({ ddd: '', numero: '' });
    const [documentoAtual, setDocumentoAtual] = useState<Documento>({ 
        numero: '', 
        tipo: '', 
        dataExpedicao: new Date() 
    });

    // Atualizar dados quando o cliente prop mudar
    useEffect(() => {
        setDados(cliente);
    }, [cliente]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!dados.nome || !dados.dataNascimento) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar se tem pelo menos um telefone
        if (dados.telefones.length === 0) {
            alert('É necessário ter pelo menos um telefone.');
            return;
        }

        onSalvar(dados);
    };

    const handleChange = (field: keyof Cliente, value: string) => {
        setDados(prev => ({ ...prev, [field]: value }));
    };

    const handleEnderecoChange = (field: keyof Endereco, value: string | number) => {
        setDados(prev => ({
            ...prev,
            endereco: { ...prev.endereco, [field]: value }
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

    const editarTelefone = (index: number, telefone: Telefone) => {
        setDados(prev => ({
            ...prev,
            telefones: prev.telefones.map((tel, i) => i === index ? telefone : tel)
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

    const editarDocumento = (index: number, documento: Documento) => {
        setDados(prev => ({
            ...prev,
            documentos: prev.documentos.map((doc, i) => i === index ? documento : doc)
        }));
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-orange-600">
                Editar Cliente - {cliente.nome}
                {cliente.titular ? ' (Dependente)' : ' (Titular)'}
            </h2>
            
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                    
                    {/* Lista de telefones existentes */}
                    {dados.telefones.length > 0 && (
                        <div className="space-y-2 mb-4">
                            <h4 className="font-medium text-gray-700">Telefones cadastrados:</h4>
                            {dados.telefones.map((telefone, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded border">
                                    <input
                                        type="text"
                                        value={telefone.ddd}
                                        onChange={e => editarTelefone(index, { ...telefone, ddd: e.target.value })}
                                        placeholder="DDD"
                                        maxLength={2}
                                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <input
                                        type="text"
                                        value={telefone.numero}
                                        onChange={e => editarTelefone(index, { ...telefone, numero: e.target.value })}
                                        placeholder="Número"
                                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removerTelefone(index)}
                                        className="text-red-500 hover:text-red-700 px-2 py-1"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Adicionar novo telefone */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div>
                            <input
                                type="text"
                                value={telefoneAtual.ddd}
                                onChange={e => handleTelefoneChange('ddd', e.target.value)}
                                placeholder="DDD (ex: 11)"
                                maxLength={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={telefoneAtual.numero}
                                onChange={e => handleTelefoneChange('numero', e.target.value)}
                                placeholder="Número (ex: 99999-9999)"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={adicionarTelefone}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Adicionar
                        </button>
                    </div>
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Nome da rua"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                            <input
                                type="number"
                                value={dados.endereco.numero}
                                onChange={e => handleEnderecoChange('numero', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Número"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                            <input
                                type="text"
                                value={dados.endereco.bairro}
                                onChange={e => handleEnderecoChange('bairro', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Bairro"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                            <input
                                type="text"
                                value={dados.endereco.cidade}
                                onChange={e => handleEnderecoChange('cidade', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Cidade"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <input
                                type="text"
                                value={dados.endereco.estado}
                                onChange={e => handleEnderecoChange('estado', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Estado"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                            <input
                                type="text"
                                value={dados.endereco.codigoPostal}
                                onChange={e => handleEnderecoChange('codigoPostal', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="CEP"
                            />
                        </div>
                    </div>
                </div>

                {/* Documentos */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Documentos</h3>
                    
                    {/* Lista de documentos existentes */}
                    {dados.documentos.length > 0 && (
                        <div className="space-y-2 mb-4">
                            <h4 className="font-medium text-gray-700">Documentos cadastrados:</h4>
                            {dados.documentos.map((documento, index) => (
                                <div key={index} className="flex items-center gap-2 bg-white p-3 rounded border">
                                    <select
                                        value={documento.tipo}
                                        onChange={e => editarDocumento(index, { ...documento, tipo: e.target.value })}
                                        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    >
                                        <option value="">Tipo</option>
                                        <option value="RG">RG</option>
                                        <option value="CPF">CPF</option>
                                        <option value="Passaporte">Passaporte</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={documento.numero}
                                        onChange={e => editarDocumento(index, { ...documento, numero: e.target.value })}
                                        placeholder="Número"
                                        className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />                                    <input
                                        type="date"
                                        value={documento.dataExpedicao instanceof Date ? 
                                            documento.dataExpedicao.toISOString().split('T')[0] : 
                                            new Date(documento.dataExpedicao).toISOString().split('T')[0]}
                                        onChange={e => editarDocumento(index, { ...documento, dataExpedicao: new Date(e.target.value) })}
                                        className="w-32 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removerDocumento(index)}
                                        className="text-red-500 hover:text-red-700 px-2 py-1"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Adicionar novo documento */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                            <select
                                value={documentoAtual.tipo}
                                onChange={e => handleDocumentoChange('tipo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="">Selecione o tipo</option>
                                <option value="RG">RG</option>
                                <option value="CPF">CPF</option>
                                <option value="Passaporte">Passaporte</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={documentoAtual.numero}
                                onChange={e => handleDocumentoChange('numero', e.target.value)}
                                placeholder="Número do documento"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>                            <input
                                type="date"
                                value={documentoAtual.dataExpedicao instanceof Date ? 
                                    documentoAtual.dataExpedicao.toISOString().split('T')[0] : 
                                    new Date(documentoAtual.dataExpedicao).toISOString().split('T')[0]}
                                onChange={e => handleDocumentoChange('dataExpedicao', new Date(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={adicionarDocumento}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Adicionar
                        </button>
                    </div>
                </div>

                {/* Titular Info (para dependentes) */}
                {cliente.titular && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Informações do Titular</h3>
                        <div className="text-gray-700">
                            <p><strong>Nome:</strong> {cliente.titular.nome}</p>
                            <p><strong>Data de Nascimento:</strong> {cliente.titular.dataNascimento}</p>
                        </div>
                    </div>
                )}

                {/* Botões de Ação */}
                <div className="flex gap-4 pt-6">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Salvar Alterações
                    </button>
                    <button
                        type="button"
                        onClick={onCancelar}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarCliente;