import React from 'react';
import { Acomodacao, Cliente } from '../../interface/interfaces';
import CadastroAcomodacao from './cadastroAcomodacao';

interface EditarAcomodacaoProps {
    acomodacao: Acomodacao;
    onSalvar: (acomodacaoEditada: Acomodacao) => void;
    onCancelar: () => void;
    clientes?: Cliente[];
}

export default function EditarAcomodacao({ acomodacao, onSalvar, onCancelar, clientes = [] }: EditarAcomodacaoProps) {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">
                        Editar Acomodação
                    </h1>
                    <p className="text-gray-700">
                        Você está editando a acomodação: <strong>{acomodacao.nomeAcomodacao}</strong>
                    </p>
                </div>
                
                <CadastroAcomodacao
                    onCadastrar={onSalvar}
                    onVoltar={onCancelar}
                    clientes={clientes}
                    acomodacaoParaEditar={acomodacao}
                />
            </div>
        </div>
    );
}
