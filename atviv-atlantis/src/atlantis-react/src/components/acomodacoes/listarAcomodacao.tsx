import React from 'react';
import { Acomodacao } from '../../interface/interfaces';

interface ListarAcomodacaoProps {
    acomodacoes: Acomodacao[];
    onEditar: (acomodacao: Acomodacao) => void;
    onExcluir: (acomodacao: Acomodacao) => void;
    onVoltar: () => void;
}

export default function ListarAcomodacao({ acomodacoes, onEditar, onExcluir, onVoltar }: ListarAcomodacaoProps) {
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-600">Lista de Acomodações</h2>
                <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar ao Menu
                </button>
            </div>

            {acomodacoes.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500 text-lg">Nenhuma acomodação cadastrada.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {acomodacoes.map((acomodacao, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {acomodacao.nomeAcomodacao}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p><strong>Camas Solteiro:</strong> {acomodacao.camaSolteiro}</p>
                                    <p><strong>Camas Casal:</strong> {acomodacao.camaCasal}</p>
                                    <p><strong>Suítes:</strong> {acomodacao.suite}</p>
                                    <p><strong>Climatização:</strong> {acomodacao.climatizacao ? 'Sim' : 'Não'}</p>
                                    <p><strong>Garagem:</strong> {acomodacao.garagem} vagas</p>
                                    {acomodacao.cliente && (
                                        <p><strong>Cliente:</strong> {acomodacao.cliente.nome}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className={`mb-3 px-2 py-1 rounded-full text-xs font-medium text-center ${
                                acomodacao.cliente 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {acomodacao.cliente ? 'Ocupada' : 'Disponível'}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEditar(acomodacao)}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => onExcluir(acomodacao)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm font-medium"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
