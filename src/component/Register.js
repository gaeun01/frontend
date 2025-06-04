import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 입력값 변경 처리
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // 에러 초기화
    setSuccess(''); // 성공 초기화
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:9070/register', {
        username: form.username,
        password: form.password,
      });
      setSuccess('회원가입이 성공적으로 완료되었습니다.');
    } catch (err) {
      setError('회원가입 실패: 아이디가 이미 존재하거나 서버 오류입니다.');
    }
  };

  return (
    <section>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="아이디"
            value={form.username}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="confirmPassword">패스워드 확인 : </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </p>
        <button type="submit">회원가입</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </section>
  );
}

export default Register;