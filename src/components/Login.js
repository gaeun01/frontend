import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

function Login(props) {
  // 1. 상태 변수 선언
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  // 2. 입력시 실행되는 함수
  // 사용자가 입력폼에 데이터를 입력시 변수에 데이터를 담는다.
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value});
    setError('');
  }

  // 3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e => {
    e.preventDefault();

    try{ // 입력이 성공하면 db server로 전송
      const res = await axios.post('http://localhost:9070/login', form);

      // 사용자 인증이 끝나면 '토큰'을 생성
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', form.username); // 사용자 아이디 저장

      alert('로그인 성공');
      navigate('/')

    }catch(err){
      setError('로그인 실패 : 아이디 또는 비밀번호를 확인하세요.');
    }
  }
  return (
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디</label>
          <input type="text" id="username" name="username"
          placeholder="아이디 입력"
          required
          onChange={handleChange}
          value={form.username}
          />
        </p>
        <p>
          <label htmlFor="password">패스워드</label>
          <input type="password" id="password" name="password"
          placeholder="패스워드 입력"
          required
          onChange={handleChange}
          value={form.password}
          />
        </p>
        <p>
          <input type="submit" value="로그인" />
        </p>
        <p>
          <Link to='/id_search'>아이디 찾기</Link>
          <Link to='/pw_search'>비번찾기</Link>
          <Link to='/register'>회원가입</Link>
        </p>

        {error&&<p style={{color:'red'}}>{error}</p>}
      </form>
    </section>
  );
}

export default Login;