import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Main from './components/Main';
import Join from './components/Join';
import Login from './components/Login';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />} />
      
          {/* 회원가입, 로그인 콤포넌트 */}
          <Route path="/login" element={<Login />} />
          <Route path="join/" element={<Join />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
