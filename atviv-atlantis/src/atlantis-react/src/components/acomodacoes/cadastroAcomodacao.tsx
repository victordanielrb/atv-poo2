import React, { useState, useEffect } from 'react';
import { Acomodacao, Cliente } from '../../interface/interfaces';

interface CadastroAcomodacaoProps {
    onCadastrar: (acomodacao: Acomodacao) => void;
    onVoltar: () => void;
    clientes?: Cliente[]; // Lista de clientes disponíveis para associar
    acomodacaoParaEditar?: Acomodacao; // Dados da acomodação para edição
}

enum TipoAcomodacao {
    SolteiroSimples = 'Acomodação simples para solteiro(a)',
    CasalSimples = 'Acomodação simples para casal',
    FamiliaSimples = 'Acomodação para família com até duas crianças',
    FamiliaMais = 'Acomodação para família com até cinco crianças',
    SolteiroMais = 'Acomodação com garagem para solteiro(a)',
    FamiliaSuper = 'Acomodação para até duas familias, casal e três crianças cada'
}

const configuracoesAcomodacao = {
    [TipoAcomodacao.SolteiroSimples]: {
        camaCasal: 0,
        camaSolteiro: 1,
        climatizacao: true,
        garagem: 0,
        suite: 1
    },
    [TipoAcomodacao.CasalSimples]: {
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    [TipoAcomodacao.FamiliaSimples]: {
        camaCasal: 1,
        camaSolteiro: 2,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    [TipoAcomodacao.FamiliaMais]: {
        camaCasal: 2,
        camaSolteiro: 5,
        climatizacao: true,
        garagem: 2,
        suite: 2
    },
    [TipoAcomodacao.SolteiroMais]: {
        camaCasal: 1,
        camaSolteiro: 0,
        climatizacao: true,
        garagem: 1,
        suite: 1
    },
    [TipoAcomodacao.FamiliaSuper]: {
        camaCasal: 2,
        camaSolteiro: 6,
        climatizacao: true,
        garagem: 2,
        suite: 2
    }
};

export default function CadastroAcomodacao({ onCadastrar, onVoltar, clientes = [], acomodacaoParaEditar }: CadastroAcomodacaoProps) {
    const [dados, setDados] = useState<Acomodacao>({
        nomeAcomodacao: '',
        camaSolteiro: 0,
        camaCasal: 0,
        suite: 0,
        climatizacao: false,
        garagem: 0,
        cliente: undefined
    });    const [tipoSelecionado, setTipoSelecionado] = useState<string>('');
    const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
    const [modoPersonalizado, setModoPersonalizado] = useState<boolean>(false);

    // useEffect para carregar dados quando estiver editando
    useEffect(() => {
        if (acomodacaoParaEditar) {
            setDados(acomodacaoParaEditar);
            setTipoSelecionado(acomodacaoParaEditar.nomeAcomodacao);
            setClienteSelecionado(acomodacaoParaEditar.cliente?.nome || '');
            setModoPersonalizado(true); // Sempre personalizado quando editando
        }
    }, [acomodacaoParaEditar]);

    const handleTipoChange = (tipo: string) => {
        setTipoSelecionado(tipo);
        if (tipo && !modoPersonalizado) {
            const config = configuracoesAcomodacao[tipo as TipoAcomodacao];
            setDados(prev => ({
                ...prev,
                nomeAcomodacao: tipo,
                ...config
            }));
        }
    };

    const handleChange = (field: keyof Acomodacao, value: string | number | boolean) => {
        setDados(prev => ({ ...prev, [field]: value }));
    };

    const handleClienteChange = (nomeCliente: string) => {
        setClienteSelecionado(nomeCliente);
        const cliente = clientes.find(c => c.nome === nomeCliente);
        setDados(prev => ({ ...prev, cliente }));
    };

    const handleModoPersonalizadoChange = (personalizado: boolean) => {
        setModoPersonalizado(personalizado);
        if (!personalizado && tipoSelecionado) {
            handleTipoChange(tipoSelecionado);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!dados.nomeAcomodacao) {
            alert('Por favor, selecione um tipo de acomodação.');
            return;
        }

        if (dados.camaSolteiro < 0 || dados.camaCasal < 0 || dados.suite < 0 || dados.garagem < 0) {
            alert('Os valores não podem ser negativos.');
            return;
        }        onCadastrar(dados);
        alert(acomodacaoParaEditar ? 'Acomodação editada com sucesso!' : 'Acomodação cadastrada com sucesso!');
        
        // Limpar formulário apenas se não estiver editando
        if (!acomodacaoParaEditar) {
            setDados({
                nomeAcomodacao: '',
                camaSolteiro: 0,
                camaCasal: 0,
                suite: 0,
                climatizacao: false,
                garagem: 0,
                cliente: undefined
            });
            setTipoSelecionado('');
            setClienteSelecionado('');
            setModoPersonalizado(false);
        }
    };return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">
                {acomodacaoParaEditar ? 'Editar Acomodação' : 'Cadastrar Acomodação'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Acomodação */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Tipo de Acomodação</h3>
                    
                    <div className="mb-4">
                        <label className="flex items-center space-x-2">
                            
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nome da Acomodação *
                            </label>
                            {modoPersonalizado ? (
                                <input
                                    type="text"
                                    value={dados.nomeAcomodacao}
                                    onChange={(e) => handleChange('nomeAcomodacao', e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite o nome da acomodação"
                                />
                            ) : (
                                <select
                                    value={tipoSelecionado}
                                    onChange={(e) => handleTipoChange(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione um tipo</option>
                                    {Object.values(TipoAcomodacao).map((tipo) => (
                                        <option key={tipo} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                </div>

                {/* Configurações da Acomodação */}
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Configurações</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Camas de Solteiro
                            </label>
                            <input
                                type="number"
                                value={dados.camaSolteiro}
                                onChange={(e) => handleChange('camaSolteiro', parseInt(e.target.value) || 0)}
                                min="0"
                                disabled={!modoPersonalizado && !!tipoSelecionado}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    !modoPersonalizado && tipoSelecionado ? 'bg-gray-100' : ''
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Camas de Casal
                            </label>
                            <input
                                type="number"
                                value={dados.camaCasal}
                                onChange={(e) => handleChange('camaCasal', parseInt(e.target.value) || 0)}
                                min="0"
                                disabled={!modoPersonalizado && !!tipoSelecionado}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    !modoPersonalizado && tipoSelecionado ? 'bg-gray-100' : ''
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Suítes
                            </label>
                            <input
                                type="number"
                                value={dados.suite}
                                onChange={(e) => handleChange('suite', parseInt(e.target.value) || 0)}
                                min="0"
                                disabled={!modoPersonalizado && !!tipoSelecionado}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    !modoPersonalizado && tipoSelecionado ? 'bg-gray-100' : ''
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Vagas de Garagem
                            </label>
                            <input
                                type="number"
                                value={dados.garagem}
                                onChange={(e) => handleChange('garagem', parseInt(e.target.value) || 0)}
                                min="0"
                                disabled={!modoPersonalizado && !!tipoSelecionado}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    !modoPersonalizado && tipoSelecionado ? 'bg-gray-100' : ''
                                }`}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="climatizacao"
                                checked={dados.climatizacao}
                                onChange={(e) => handleChange('climatizacao', e.target.checked)}
                                disabled={!modoPersonalizado && !!tipoSelecionado}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="climatizacao" className="text-sm font-medium text-gray-700">
                                Climatização
                            </label>
                        </div>
                    </div>
                </div>

                {/* Associar Cliente */}
                {clientes.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Associar Cliente (Opcional)</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cliente
                                </label>
                                <select
                                    value={clienteSelecionado}
                                    onChange={(e) => handleClienteChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione um cliente</option>
                                    {clientes.map((cliente, index) => (
                                        <option key={index} value={cliente.nome}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resumo da Acomodação */}
                {dados.nomeAcomodacao && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Resumo da Acomodação</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p><strong>Nome:</strong> {dados.nomeAcomodacao}</p>
                                <p><strong>Camas de Solteiro:</strong> {dados.camaSolteiro}</p>
                                <p><strong>Camas de Casal:</strong> {dados.camaCasal}</p>
                            </div>
                            <div>
                                <p><strong>Suítes:</strong> {dados.suite}</p>
                                <p><strong>Climatização:</strong> {dados.climatizacao ? 'Sim' : 'Não'}</p>
                                <p><strong>Vagas de Garagem:</strong> {dados.garagem}</p>
                            </div>
                            {dados.cliente && (
                                <div className="md:col-span-2">
                                    <p><strong>Cliente Associado:</strong> {dados.cliente.nome}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Botões */}
                <div className="flex gap-4 pt-4">                    <button
                        type="submit"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                    >
                        {acomodacaoParaEditar ? 'Salvar Alterações' : 'Cadastrar Acomodação'}
                    </button>
                    
                    <button
                        type="button"
                        onClick={onVoltar}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                    >
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}
