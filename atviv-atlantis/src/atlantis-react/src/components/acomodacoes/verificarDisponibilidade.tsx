import React, { useState } from 'react';
import { Acomodacao } from '../../interface/interfaces';

interface VerificarDisponibilidadeProps {
    acomodacoes: Acomodacao[];
    onVoltar: () => void;
}

export default function VerificarDisponibilidade({ acomodacoes, onVoltar }: VerificarDisponibilidadeProps) {
    const [filtroTipo, setFiltroTipo] = useState<string>('');
    const [filtroClimatizacao, setFiltroClimatizacao] = useState<string>('');

    const acomodacoesFiltradas = acomodacoes.filter(acomodacao => {
        if (acomodacao.cliente) return false; // Só acomodações disponíveis
        
        if (filtroTipo && !acomodacao.nomeAcomodacao.toLowerCase().includes(filtroTipo.toLowerCase())) {
            return false;
        }
        
        if (filtroClimatizacao) {
            const temClimatizacao = acomodacao.climatizacao;
            if (filtroClimatizacao === 'sim' && !temClimatizacao) return false;
            if (filtroClimatizacao === 'nao' && temClimatizacao) return false;
        }
        
        return true;
    });

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-600">Verificar Disponibilidade</h2>
                <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar ao Menu
                </button>
            </div>

            {/* Filtros */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Filtros</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Acomodação
                        </label>
                        <input
                            type="text"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                            placeholder="Digite o tipo desejado..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Climatização
                        </label>
                        <select
                            value={filtroClimatizacao}
                            onChange={(e) => setFiltroClimatizacao(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="">Qualquer</option>
                            <option value="sim">Com climatização</option>
                            <option value="nao">Sem climatização</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Resultados */}
            <div>
                <h3 className="text-lg font-semibold mb-4">
                    Acomodações Disponíveis ({acomodacoesFiltradas.length})
                </h3>
                
                {acomodacoesFiltradas.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 text-lg">Nenhuma acomodação disponível com os filtros aplicados.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {acomodacoesFiltradas.map((acomodacao, index) => (
                            <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    {acomodacao.nomeAcomodacao}
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                    <p><strong>Camas Solteiro:</strong> {acomodacao.camaSolteiro}</p>
                                    <p><strong>Camas Casal:</strong> {acomodacao.camaCasal}</p>
                                    <p><strong>Suítes:</strong> {acomodacao.suite}</p>
                                    <p><strong>Garagem:</strong> {acomodacao.garagem} vagas</p>
                                    <p className="col-span-2">
                                        <strong>Climatização:</strong> {acomodacao.climatizacao ? 'Sim' : 'Não'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
