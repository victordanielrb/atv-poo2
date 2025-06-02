import React from 'react';
import { Cliente } from '../../interface/interfaces';



const ListagemTitulares = ({ titulares, onEditar, onExcluir, onVoltar }) => {
    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-600">Clientes Titulares ({titulares.length})</h2>
                <button
                    onClick={onVoltar}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                >
                    Voltar
                </button>
            </div>
              {titulares.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">Titulares</div>
                    <p className="text-gray-500 text-lg">Nenhum titular cadastrado ainda.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {titulares.map((titular : Cliente) => (
                        <div  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {titular.nome}
                                        {titular.nomeSocial && (
                                            <span className="text-gray-600 font-normal"> ({titular.nomeSocial})</span>
                                        )}
                                    </h3>                                    <p className="text-gray-600">Nascimento: {titular.dataNascimento}</p>
                                    <p className="text-sm text-gray-500">Cadastro: {titular.dataCadastro}</p>
                                    <p className="text-blue-600">Telefone: {titular.telefones.map(t => `${t.ddd} ${t.numero}`).join(', ')}</p>
                                    <p className='text-sm text-gray-500'>
                                        Endereço: Rua {titular.endereco.rua}, {titular.endereco.numero}  - {titular.endereco.bairro}, {titular.endereco.cidade}/{titular.endereco.estado} - CEP: {titular.endereco.codigoPostal}
                                    </p>
                                    {titular.endereco.pais && (
                                        <p className="text-sm text-gray-500">País: {titular.endereco.pais}</p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        Documentos: {titular.documentos.map(doc => `${doc.tipo}: ${doc.numero}`).join(', ')}
                                    </p>
                                    {titular.documentos && titular.documentos.length > 0 && (
                                        <p className="text-sm text-gray-500">
                                            Documentos: {titular.documentos.map(doc => `${doc.tipo}: ${doc.numero}`).join(', ')}
                                        </p>
                                    )}

                                    
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditar(titular)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Tem certeza que deseja excluir ${titular.nome}?`)) {
                                                onExcluir(titular.nome);
                                            }
                                        }}                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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

export default ListagemTitulares;