import React, { useState, useEffect } from 'react';
import { Acomodacao, Cliente } from '../../interface/interfaces';
import CadastroAcomodacao from './cadastroAcomodacao';
import ListarAcomodacao from './listarAcomodacao';
import EditarAcomodacao from './editarAcomodacao';
import VerificarDisponibilidade from './verificarDisponibilidade';
import AnexarAcomodacao from './anexarAcomodacao';
import Instancia from '../instancia/instancia';
import { useNavigate } from 'react-router-dom';

export default function MenuCadastro() {
    const [view, setView] = useState<string>('menu');
    const [acomodacaoParaEditar, setAcomodacaoParaEditar] = useState<Acomodacao | null>(null);
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();    // Carregar dados ao inicializar o componente
    useEffect(() => {
        const carregarDados = async () => {
            try {
                setLoading(true);
                const dados = await Instancia.getDados();
                setClientes(dados.clientes);
                setAcomodacoes(dados.acomodacoes);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                alert('Erro ao conectar com o servidor. Verifique se o servidor está rodando na porta 5000.');
            } finally {
                setLoading(false);
            }
        };

        carregarDados();
    }, []);    const handleCadastrarAcomodacao = async (acomodacao: Acomodacao) => {
        try {
            await Instancia.adicionarAcomodacao(acomodacao);
            
            // Recarregar acomodações
            const dados = await Instancia.getDados();
            setAcomodacoes(dados.acomodacoes);
            
            setView('menu');
        } catch (error) {
            console.error('Erro ao cadastrar acomodação:', error);
            alert('Erro ao cadastrar acomodação');
        }
    };    const handleEditarAcomodacao = async (acomodacaoEditada: Acomodacao) => {
        try {
            if (acomodacaoParaEditar?._id) {
                await Instancia.atualizarAcomodacao(acomodacaoParaEditar._id.toString(), acomodacaoEditada);
                
                // Recarregar acomodações
                const dados = await Instancia.getDados();
                setAcomodacoes(dados.acomodacoes);
            }
            setView('menu');
            setAcomodacaoParaEditar(null);
        } catch (error) {
            console.error('Erro ao editar acomodação:', error);
            alert('Erro ao editar acomodação');
        }
    };    const handleExcluirAcomodacao = async (acomodacao: Acomodacao) => {
        if (window.confirm('Tem certeza que deseja excluir esta acomodação?')) {
            try {
                await Instancia.removerAcomodacao(acomodacao._id!.toString());
                
                // Recarregar acomodações
                const dados = await Instancia.getDados();
                setAcomodacoes(dados.acomodacoes);
            } catch (error) {
                console.error('Erro ao excluir acomodação:', error);
                alert('Erro ao excluir acomodação');
            }
        }
    };

    const handleIniciarEdicao = (acomodacao: Acomodacao) => {
        setAcomodacaoParaEditar(acomodacao);
        setView('editar');
    };    const handleCancelarEdicao = () => {
        setView('menu');
        setAcomodacaoParaEditar(null);
    };    const handleAnexarAcomodacao = async (acomodacao: Acomodacao, cliente: Cliente) => {
        try {
            // Usar o método específico da Instancia para anexar acomodação
            await Instancia.anexarAcomodacao(acomodacao._id!.toString(), cliente._id!.toString());
            
            // Recarregar dados
            const dados = await Instancia.getDados();
            setClientes(dados.clientes);
            setAcomodacoes(dados.acomodacoes);
            
            setView('menu');
        } catch (error) {
            console.error('Erro ao anexar acomodação:', error);
            alert('Erro ao anexar acomodação');
        }
    };

    const onVoltar = () => {
        navigate('/');
        setAcomodacaoParaEditar(null);
    };    // Estatísticas
    const acomodacoesComCliente = acomodacoes.filter(a => a.cliente);
    const acomodacoesSemCliente = acomodacoes.filter(a => !a.cliente);
    const totalVagasGaragem = acomodacoes.reduce((total, a) => total + (a.garagem || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <div className="text-xl text-gray-600">Carregando dados...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={onVoltar}
                className="bg-gray-500 hover:bg-gray-600 m-4 text-white font-bold py-2 px-4 rounded-md"
            >
                Voltar
            </button>

            {view === 'menu' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
                            Gerenciamento de Acomodações
                        </h1>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <button 
                                onClick={() => setView('cadastro')}
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Cadastrar Acomodação
                            </button>
                            <button 
                                onClick={() => setView('listar')}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Ver Acomodações
                            </button>
                           
                            <button 
                                onClick={() => setView('anexar')}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Anexar Acomodação
                            </button>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">{acomodacoes.length}</div>
                                <div className="text-gray-600">Total de Acomodações</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-green-600">{acomodacoesSemCliente.length}</div>
                                <div className="text-gray-600">Disponíveis</div>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-red-600">{acomodacoesComCliente.length}</div>
                                <div className="text-gray-600">Ocupadas</div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">{totalVagasGaragem}</div>
                                <div className="text-gray-600">Vagas de Garagem</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {view === 'cadastro' && (
                <CadastroAcomodacao 
                    onCadastrar={handleCadastrarAcomodacao}
                    onVoltar={() => setView('menu')}
                    clientes={clientes}
                />
            )}            {view === 'listar' && (
                <ListarAcomodacao 
                    acomodacoes={acomodacoes}
                    onEditar={handleIniciarEdicao}
                    onExcluir={handleExcluirAcomodacao}
                    onVoltar={() => setView('menu')}
                />
            )}

                    {view === 'editar' && acomodacaoParaEditar && (
                <EditarAcomodacao
                    acomodacao={acomodacaoParaEditar}
                    onSalvar={handleEditarAcomodacao}
                    onCancelar={handleCancelarEdicao}
                    clientes={clientes}
                />
            )}

            {view === 'anexar' && (
                <AnexarAcomodacao
                    acomodacoes={acomodacoes}
                    clientes={clientes}
                    onAnexar={handleAnexarAcomodacao}
                    onVoltar={() => setView('menu')}
                />
            )}        </div>
    );
}