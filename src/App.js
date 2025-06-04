import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Main from './component/Main';
import Goods from './component/Goods';
import Update from './component/Update';
import Create from './component/Create';
import Fruits from './component/Fruits';
import FruitsUpdate from './component/FruitsUpdate';
import FruitsCreate from './component/FruitsCreate';
import Question from './component/Question';
import QuestionCreate from './component/QuestionCreate';
import Login from './component/Login';
import Register from './component/Register';
import { AlertContext } from './AlertContext'; // AlertContext를 import

function App() {
  const {goodsCount,questionCount,fruitsCount} = React.useContext(AlertContext);


  return (
    <>
      <BrowserRouter> {/* 브라우저의 라우터 범위를 설정 */}
        <header>
          <h1>Frontend셋팅 - React + MySQL(메인페이지)</h1>
          {/* localhost: 3000 === index.html
              localhost:9070/goods
          */}
          <nav>
            <Link to='/'>Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/goods'>
              Goods{
                goodsCount > 0 && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: '6px',
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    fontSize: '14px',
                    textAlign: 'center',
                    lineHeight: '22px',
                    fontWeight: 'bold',
                  }}>
                    {goodsCount}
                  </span>
                )
              }
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            {/* <Link to='/Books'>Books</Link> */}
            <Link to='/fruit'>
            Fruits{
              fruitsCount > 0&& (
                <span style={{
                  display: 'inline-block',
                  marginLeft: '6px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  fontSize: '14px',
                  textAlign: 'center',
                  lineHeight: '22px',
                  fontWeight: 'bold'
                }}>
                  {fruitsCount}
                </span>
              )
            }
            </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/question'>
                Question
                {questionCount > 0 && (
                  <span style={{
                    display: 'inline-block',
                    marginLeft: 6,
                    background: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    fontSize: 14,
                    textAlign: 'center',
                    lineHeight: '22px',
                    fontWeight: 'bold'
                  }}>
                    {questionCount}
                  </span>
                )}
              </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/login'>Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/goods' element={<Goods />} />
            <Route path='/goods/Update/:g_code' element={<Update />} />
            <Route path='/goods/create' element={<Create />} />

            {/* <Route path='/goods/create' element={<Books />} />
            <Route path='/goods/create' element={<BookUpdate />} />
            <Route path='/goods/create' element={<BooksCreate />} /> */}

            <Route path='/fruit' element={<Fruits />} />
            <Route path='/fruit/Update/:name' element={<FruitsUpdate />} />
            <Route path='/fruit/create' element={<FruitsCreate />} />
            <Route path='/question' element={<Question />} />
            <Route path='/question/create' element={<QuestionCreate/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/Register' element={<Register />} />
          </Routes>
        </main>

        <footer>
          <address>Copyright&copy;2025 Backend&Frontend allrights reserved.</address>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
