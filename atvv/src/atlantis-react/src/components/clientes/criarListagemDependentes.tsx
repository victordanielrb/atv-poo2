import React from 'react';
import { Cliente } from '../../interface/interfaces';



const ListagemDependentes = ({ dependentes, onEditar, onExcluir, onVoltar }) => {
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-600">Dependentes ({dependentes.length})</h2>
                <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar
                </button>
            </div>
            
            {dependentes.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">Dependentes</div>
                    <p className="text-gray-500 text-lg">Nenhum dependente cadastrado ainda.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {dependentes.map((dependente, index) => (
                        <div key={`${dependente.nome}-${index}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {dependente.nome}
                                        {dependente.nomeSocial && (
                                            <span className="text-gray-600 font-normal"> ({dependente.nomeSocial})</span>
                                        )}
                                    </h3>
                                    <p className="text-gray-600">📅 Nascimento: {dependente.dataNascimento}</p>
                                    <p className="text-blue-600">Titular: {dependente.titular?.nome}</p>
                                    <p className="text-sm text-gray-500">📅 Cadastro: {dependente.dataCadastro}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditar(dependente)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Tem certeza que deseja excluir ${dependente.nome}?`)) {
                                                onExcluir(dependente.nome);
                                            }
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListagemDependentes;