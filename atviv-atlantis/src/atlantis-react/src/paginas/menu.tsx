import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col items-center justify-center min-h-96 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                     Bem-vindo ao Atlantis
                </h1>
                <p className="text-xl text-center mb-12 text-gray-600">
                    Sistema completo de gestão para hotéis, resorts e clubes
                </p>
                
                <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    
                    <button 
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => navigate("/clientes")}
                    >
                        Clientes
                    </button>
                    
                    <button 
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => navigate("/acomodacoes")}
                    >
                         Acomodações
                    </button>
                    
                    <button 
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => navigate("/servicos")}
                    >
                        Serviços
                    </button>
                    
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-6 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                        onClick={() => alert("Relatórios em desenvolvimento")}
                    >
                         Relatórios
                    </button>
                    
             
                </nav>
            </div>
        </div>
    );
}