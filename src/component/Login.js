import React, {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Login(props) {
  const [form, setForm] = useState({
    username:'', // 아이디를 저장하기 위한 변수
    password:'' // 패스워드를 저장하기 위한 변수
  });

  const [error, setError] = useState('');

  // 2. 입력시 발생되는 함수
  const handleChange=(e) =>{
    setForm({...form, [e.target.name]:e.target.value});
  };

  // 3. 로그인 버튼 클릭시 실행되는 함수
  const handleSubmit = async e =>{
    e.preventDefault();
    // console(username,password);
    try{ // 성공시 실행 내용
      const res = await axios.post('http://localhost:9070/login', form);

      // 사용자 인증이 끝나면  '토큰'을 발급한다.
      localStorage.setItem('token', res.data.token);

      alert('로그인 성공');
    }catch{ // 실패시 실행 내용
      setError('로그인 실패 : 아이디와 패스워드를 다시 확인하세요.')

    }
  }
  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label for="username">아이디 : </label>
          <input type="text" id="username" name="username" value={form.username} placeholder="아이디" required onChange={handleChange} />
        </p>
        <p>
          <label for="password">패스워드 : </label>
          <input type="password" id="password" name="password" value={form.userpassword} placeholder="패스워드" required onChange={handleChange} />
        </p>
        <p>
          <input type="submit" value="로그인" />
        </p>
        <p>{error&&<p style={{color:'red'}}>{error}</p>}</p>
        <p>
          <Link to='/id_search'>아이디 찾기</Link> &#10072;
          <Link to='/pw_search'>비밀번호 찾기</Link> &#10072;
          <Link to='/Register'>회원가입</Link>
        </p>



        {/* 
          카카오 api로그인
        */}

        <dl>
          <dt>로그인 구현 전체 구성</dt>
          <dd>1. 프론트엔드(React) : 로그인 폼 작성, 로그인 버튼 클릭시 서버에 인증 요청</dd>
          <dd>2. 백엔드(Node.js + Express) : 로그인 처리, JWT 토큰 발급</dd>
          <dd>3. 데이터 베이스(MYSQL) : DB 입/출력</dd>
          <dd>4. 보안 : 비밀번호는 brcypt 로 암호화, JWT로 인증을 유지</dd>
        </dl>

        <pre>
          //1. 데이터 베이스 테이블 설계
          CREATE TABLE users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(225) UNIQUE NOT NULL,
            password VARCHAR(225) NOT NULL,
            datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          )
          //2. 데이터베이스에 회원정보 입력하기
          INSERT INTO users VALUES(1, 'seo', '1234', '2025-05-26');
          INSERT INTO users VALUES(2, 'kim', '5678', '2025-05-26');
          INSERT INTO users VALUES(3, 'jeon', '4321', '2025-05-26');
          INSERT INTO users VALUES(4, 'lee', '8765', '2025-05-26');
          //3. UI 화면 설계 - 로그인 폼 구현
        </pre>

      </form>
    </section>
  );
}

export default Login;