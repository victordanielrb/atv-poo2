import React, { useState } from 'react';
import { Cliente } from '../../interface/interfaces';
import CadastroClienteTitular from './cadastroClienteTitular';
import ListagemDependentes from './criarListagemDependentes';
import AnexarClienteDependente from './anexarDependente';
import ListagemTitulares from './criarListagemTitular';
import EditarCliente from './editarCliente';
import Instancia from '../instancia/instancia';
import { Navigate, useNavigate } from 'react-router-dom';


export default function MenuClientes() {
    const [view, setView] = useState<string>('menu');
    const [clienteParaEditar, setClienteParaEditar] = useState<Cliente | null>(null);
    const [clientes, setClientes] = useState<Cliente[]>(Instancia.getDados().clientes || []);
    const navigate = useNavigate();
;    const handleCadastrarTitular = (cliente: Cliente) => {
        const novoTitular: Cliente = {
            ...cliente,
            titular: undefined // Confirma que é titular (não tem titular)
        };
        Instancia.adicionarCliente( novoTitular);
        setView('menu');
    };    const handleAnexarDependente = (dependenteData: Cliente, titularNome: string) => {
        const titular = clientes.find(c => c.nome === titularNome);
        if (titular) {
            const novoDependente: Cliente = {
                nome: dependenteData.nome!,
                nomeSocial: dependenteData.nomeSocial!,
                dataNascimento: dependenteData.dataNascimento!,
                dataCadastro: new Date().toISOString().split('T')[0],
                telefones: dependenteData.telefones || [],
                endereco: dependenteData.endereco || {
                    rua: '',
                    bairro: '',
                    cidade: '',
                    numero: 0, 
                    estado: '',
                    pais: '',
                    codigoPostal: ''
                },
                documentos: dependenteData.documentos || [],
                dependentes: [],
                titular : titular, // Define o titular do dependente
            };
            
            Instancia.adicionarCliente( novoDependente);
            setView('menu');
        }    };

    const handleEditarCliente = (clienteEditado: Cliente) => {
        const clientesAtualizados = clientes.map((c) => {
            // Use a more specific identifier - check multiple fields for better matching
            if (c.nome === clienteEditado.nome && c.dataCadastro === clienteEditado.dataCadastro) {
                return {
                    ...clienteEditado
                };
            }
            return c; 
        });
        
        Instancia.setClientes(clientesAtualizados);
        setView('menu');
        setClienteParaEditar(null);
    };

    const handleIniciarEdicao = (cliente: Cliente) => {
        setClienteParaEditar(cliente);
        setView('editar');
    };

    const handleCancelarEdicao = () => {
        setClienteParaEditar(null);
        setView('menu');
    };

    const handleExcluirCliente = (nome: string) => {
        Instancia.setClientes(clientes.filter(c => c.nome !== nome));
    };
    const onVoltar = () => {
        navigate('/'); // Redireciona para a página inicial
        setClienteParaEditar(null);
    };
    const titulares = clientes.filter(c => !c.titular);
    const dependentes = clientes.filter(c => c.titular);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar
                </button>
            {view === 'menu' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
                            Gerenciamento de Clientes
                        </h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <button 
                                onClick={() => setView('cadastroTitular')}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Cadastrar Titular
                            </button>
                            <button 
                                onClick={() => setView('cadastroDependente')}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Anexar Dependente
                            </button>
                            <button 
                                onClick={() => setView('listarTitulares')}
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Ver Titulares
                            </button>
                            <button 
                                onClick={() => setView('listarDependentes')}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Ver Dependentes
                            </button>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-600">{clientes.length}</div>
                                <div className="text-gray-600">Total de Clientes</div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-purple-600">{titulares.length}</div>
                                <div className="text-gray-600">Titulares</div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-orange-600">{dependentes.length}</div>
                                <div className="text-gray-600">Dependentes</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {view === 'cadastroTitular' && (
                <CadastroClienteTitular 
                    onCadastrar={handleCadastrarTitular}
                    onVoltar={() => setView('menu')}
                />
            )}

            {view === 'cadastroDependente' && (
                <AnexarClienteDependente 
                    onCadastrar={handleAnexarDependente}
                    titulares={titulares}
                    onVoltar={() => setView('menu')}
                />
            )}            {view === 'listarTitulares' && (
                <ListagemTitulares 
                    titulares={titulares}
                    onEditar={handleIniciarEdicao}
                    onExcluir={handleExcluirCliente}
                    onVoltar={() => setView('menu')}
                />
            )}

            {view === 'listarDependentes' && (
                <ListagemDependentes 
                    dependentes={dependentes}
                    onEditar={handleIniciarEdicao}
                    onExcluir={handleExcluirCliente}
                    onVoltar={() => setView('menu')}
                />
            )}

            {view === 'editar' && clienteParaEditar && (
                <EditarCliente
                    cliente={clienteParaEditar}
                    onSalvar={handleEditarCliente}
                    onCancelar={handleCancelarEdicao}
                />
            )}
        </div>
    );
}