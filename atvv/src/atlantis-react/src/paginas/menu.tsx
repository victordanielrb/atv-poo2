import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Instancia from '../components/instancia/instancia';
import { Cliente, Acomodacao, Servico } from '../interface/interfaces';

export default function Menu() {
    const navigate = useNavigate();
    const [dados, setDados] = useState<{
        clientes: Cliente[];
        acomodacoes: Acomodacao[];
        servicos: Servico[];
    }>({
        clientes: [],
        acomodacoes: [],
        servicos: []
    });
    const [loading, setLoading] = useState(true);    useEffect(() => {
        const carregarDados = async () => {
            try {
                const dados = await Instancia.getDados();
                
                setDados({
                    clientes: dados.clientes,
                    acomodacoes: dados.acomodacoes,
                    servicos: dados.servicos || [] // Mantém vazio por enquanto
                });
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando na porta 5000.');
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96 p-8">
                <div className="text-xl text-gray-600">Carregando dados...</div>
            </div>
        );
    }

    const { clientes, acomodacoes, servicos } = dados;
    
    return (
        <div className="flex flex-col items-center justify-center min-h-96 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                     Bem-vindo ao Atlantis
                </h1>
                <p className="text-xl text-center mb-12 text-gray-600">
                    Sistema completo de gestão para hotéis, resorts e clubes
                </p>
                
                {/* Exibir estatísticas do sistema */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
                    <div className="bg-green-100 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold text-green-600">{clientes.length}</h3>
                        <p className="text-green-800">Clientes Cadastrados</p>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold text-purple-600">{acomodacoes.length}</h3>
                        <p className="text-purple-800">Acomodações</p>
                    </div>
                    <div className="bg-orange-100 p-4 rounded-lg">
                        <h3 className="text-2xl font-bold text-orange-600">{servicos.length}</h3>
                        <p className="text-orange-800">Serviços</p>
                    </div>
                </div>
                
                <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <button 
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => navigate("/clientes")}
                    >
                        👥 Clientes
                        <div className="text-sm mt-1 opacity-80">
                            {clientes.length} cadastrados
                        </div>
                    </button>
                    
                    <button 
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => navigate("/acomodacoes")}
                    >
                        🏨 Acomodações
                        <div className="text-sm mt-1 opacity-80">
                            {acomodacoes.length} disponíveis
                        </div>
                    </button>
                    
                    
                    
                     
                </nav>
            </div>
        </div>
    );
}