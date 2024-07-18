"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Defina o tipo para o contexto
interface EmailContextType {
  email: string;
  setEmail: (email: string) => void;
}

// Crie o contexto com um valor padrão
const EmailContext = createContext<EmailContextType | undefined>(undefined);

// Crie o provedor de contexto
export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Crie um hook personalizado para usar o contexto
export const useEmail = (): EmailContextType => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
