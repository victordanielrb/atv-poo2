import React, { useState } from 'react';
import { Acomodacao, Cliente } from '../../interface/interfaces';

interface AnexarAcomodacaoProps {
    onAnexar: (acomodacao: Acomodacao, cliente: Cliente) => void;
    onVoltar: () => void;
    acomodacoes: Acomodacao[];
    clientes: Cliente[];
}

export default function AnexarAcomodacao({ onAnexar, onVoltar, acomodacoes, clientes }: AnexarAcomodacaoProps) {
    const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState<string>('');
    const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
    const [observacoes, setObservacoes] = useState<string>('');

    // Filtrar apenas acomodações disponíveis (sem cliente associado)
    const acomodacoesDisponiveis = acomodacoes.filter(acomodacao => !acomodacao.cliente);
    
    // Filtrar apenas clientes sem acomodação
    const clientesDisponiveis = clientes.filter(cliente => !cliente.acomodacao);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!acomodacaoSelecionada || !clienteSelecionado) {
            alert('Por favor, selecione uma acomodação e um cliente.');
            return;
        }

        const acomodacao = acomodacoesDisponiveis.find(a => a.nomeAcomodacao === acomodacaoSelecionada);
        const cliente = clientesDisponiveis.find(c => c.nome === clienteSelecionado);

        if (!acomodacao || !cliente) {
            alert('Erro ao encontrar acomodação ou cliente selecionado.');
            return;
        }

        // Associar cliente à acomodação
        const acomodacaoAtualizada = { ...acomodacao, cliente };
        onAnexar(acomodacaoAtualizada, cliente);
        
        alert('Acomodação anexada com sucesso!');
        
        // Limpar formulário
        setAcomodacaoSelecionada('');
        setClienteSelecionado('');
        setObservacoes('');
    };

    const acomodacaoDetalhes = acomodacaoSelecionada 
        ? acomodacoesDisponiveis.find(a => a.nomeAcomodacao === acomodacaoSelecionada)
        : null;

    const clienteDetalhes = clienteSelecionado 
        ? clientesDisponiveis.find(c => c.nome === clienteSelecionado)
        : null;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-600">Anexar Acomodação a Cliente</h2>
                <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar
                </button>
            </div>

            {acomodacoesDisponiveis.length === 0 ? (
                <div className="text-center py-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p className="text-yellow-800 text-lg font-medium">
                            ⚠️ Nenhuma acomodação disponível para anexar
                        </p>
                        <p className="text-yellow-600 mt-2">
                            Todas as acomodações já estão ocupadas ou não há acomodações cadastradas.
                        </p>
                    </div>
                </div>
            ) : clientesDisponiveis.length === 0 ? (
                <div className="text-center py-8">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p className="text-yellow-800 text-lg font-medium">
                            ⚠️ Nenhum cliente disponível para anexar
                        </p>
                        <p className="text-yellow-600 mt-2">
                            Todos os clientes já possuem acomodação ou não há clientes cadastrados.
                        </p>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Seleção de Acomodação */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Selecionar Acomodação</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Acomodação Disponível *
                                </label>
                                <select
                                    value={acomodacaoSelecionada}
                                    onChange={(e) => setAcomodacaoSelecionada(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione uma acomodação</option>
                                    {acomodacoesDisponiveis.map((acomodacao, index) => (
                                        <option key={index} value={acomodacao.nomeAcomodacao}>
                                            {acomodacao.nomeAcomodacao}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {acomodacaoDetalhes && (
                                <div className="bg-white p-3 rounded border">
                                    <h4 className="font-semibold text-gray-800 mb-2">Detalhes da Acomodação</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>Camas Solteiro:</strong> {acomodacaoDetalhes.camaSolteiro}</p>
                                        <p><strong>Camas Casal:</strong> {acomodacaoDetalhes.camaCasal}</p>
                                        <p><strong>Suítes:</strong> {acomodacaoDetalhes.suite}</p>
                                        <p><strong>Climatização:</strong> {acomodacaoDetalhes.climatizacao ? 'Sim' : 'Não'}</p>
                                        <p><strong>Vagas Garagem:</strong> {acomodacaoDetalhes.garagem}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Seleção de Cliente */}
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Selecionar Cliente</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cliente sem Acomodação *
                                </label>
                                <select
                                    value={clienteSelecionado}
                                    onChange={(e) => setClienteSelecionado(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="">Selecione um cliente</option>
                                    {clientesDisponiveis.map((cliente, index) => (
                                        <option key={index} value={cliente.nome}>
                                            {cliente.nome} {cliente.nomeSocial && `(${cliente.nomeSocial})`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {clienteDetalhes && (
                                <div className="bg-white p-3 rounded border">
                                    <h4 className="font-semibold text-gray-800 mb-2">Detalhes do Cliente</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>Nome:</strong> {clienteDetalhes.nome}</p>
                                        {clienteDetalhes.nomeSocial && (
                                            <p><strong>Nome Social:</strong> {clienteDetalhes.nomeSocial}</p>
                                        )}
                                        <p><strong>Data Nascimento:</strong> {clienteDetalhes.dataNascimento}</p>
                                        <p><strong>Telefones:</strong> {clienteDetalhes.telefones.length}</p>
                                        <p><strong>Tipo:</strong> {clienteDetalhes.titular ? 'Dependente' : 'Titular'}</p>
                                        {clienteDetalhes.dependentes.length > 0 && (
                                            <p><strong>Dependentes:</strong> {clienteDetalhes.dependentes.length}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Observações */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">Observações (Opcional)</h3>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Observações sobre a anexação
                            </label>
                            <textarea
                                value={observacoes}
                                onChange={(e) => setObservacoes(e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="Digite observações sobre esta anexação (opcional)..."
                            />
                        </div>
                    </div>

                    {/* Resumo da Anexação */}
                    {acomodacaoSelecionada && clienteSelecionado && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Resumo da Anexação</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p><strong>Acomodação:</strong> {acomodacaoSelecionada}</p>
                                    <p><strong>Cliente:</strong> {clienteSelecionado}</p>
                                </div>
                                <div>
                                    <p><strong>Data da Anexação:</strong> {new Date().toLocaleDateString()}</p>
                                    {observacoes && (
                                        <p><strong>Observações:</strong> {observacoes.substring(0, 50)}{observacoes.length > 50 ? '...' : ''}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botões */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                        >
                            Anexar Acomodação
                        </button>
                        
                        <button
                            type="button"
                            onClick={onVoltar}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            {/* Estatísticas */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Estatísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-blue-100 p-3 rounded">
                        <div className="text-2xl font-bold text-blue-600">{acomodacoesDisponiveis.length}</div>
                        <div className="text-xs text-gray-600">Acomodações Disponíveis</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                        <div className="text-2xl font-bold text-green-600">{clientesDisponiveis.length}</div>
                        <div className="text-xs text-gray-600">Clientes sem Acomodação</div>
                    </div>
                    <div className="bg-red-100 p-3 rounded">
                        <div className="text-2xl font-bold text-red-600">{acomodacoes.length - acomodacoesDisponiveis.length}</div>
                        <div className="text-xs text-gray-600">Acomodações Ocupadas</div>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded">
                        <div className="text-2xl font-bold text-yellow-600">{clientes.length - clientesDisponiveis.length}</div>
                        <div className="text-xs text-gray-600">Clientes com Acomodação</div>
                    </div>
                </div>
            </div>
        </div>
    );
}