import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Cliente } from '../interface/interfaces';

// Interfaces para os tipos de dados
interface Quarto {
  id: number;
  numero: string;
  tipo: string;
  preco: number;
  disponivel: boolean;
}

interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
}





export type { Quarto, Servico };
