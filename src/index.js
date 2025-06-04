import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AlertProvider } from './AlertContext';  // ✅ import 되어 있음

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AlertProvider>     {/* ✅ 이걸 추가해야 useContext가 정상 작동함 */}
      <App />
    </AlertProvider>
  </React.StrictMode>
);