import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Menu from './paginas/menu';
import Clientes from './paginas/clientes';
import Quartos from './paginas/quartos';
import Instancia from './components/instancia/instancia';

function App() {
  

  return (
   
      <div className="App">
      <Router>
        {/* Header/Navbar */}
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold">🏨 Atlantisasd - Sistema de Gestão</h1>
            <p className="text-blue-200">Sistema completo para hotéis, resorts e clubes</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/acomodacoes" element={<Quartos />} />
            <Route path="/servicos" element={<></>} />
        
          </Routes>
        </main>        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2024 Atlantis - Sistema de Gestão. Todos os direitos reservados.</p>
          </div>
        </footer>
      </Router>
    </div>
   
  );
}

export default App;