// AlertContext.js
import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [questionCount] = useState(3);
  const [goodsCount, setGoodsCount] = useState(5);
  const [fruitsCount, setFruitsCount] = useState(2);

  return (
    <AlertContext.Provider value={{ questionCount, goodsCount, setGoodsCount, fruitsCount, setFruitsCount }}>
      {children}
    </AlertContext.Provider>
  );
}

