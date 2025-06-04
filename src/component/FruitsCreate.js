import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FruitsCreate() {
  // 상태 변수 선언
  const [form, setForm] = useState({
    name: '',
    price: '',
    color: '',
    country: '',
  });

  const navigate = useNavigate();

  // 입력값 변경 처리
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    axios
      .post('http://localhost:9070/fruit', form) // 서버로 데이터 전송
      .then(() => {
        alert('상품 등록이 완료되었습니다.');
        navigate('/fruit'); // 등록 후 이동할 페이지
      })
      .catch((err) => console.log(err)); // 에러 처리
  };

  return (
    <div>
      <h3>상품등록</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">상품명(name)</label> : 
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="price">가격정보(price)</label> :
          <input
            type="text"
            name="price"
            id="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="color">컬러(color)</label> :
          <input
            type="text"
            name="color"
            id="color"
            value={form.color}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label htmlFor="country">원산지(country)</label> :
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            required
          >
            <option value="">원산지를 선택하세요.</option>
            <option value="대한민국">대한민국</option>
            <option value="필리핀">필리핀</option>
            <option value="중국">중국</option>
            <option value="미국">미국</option>
            <option value="일본">일본</option>
            <option value="말레이시아">말레이시아</option>
          </select>
        </p>
        <button type="submit">상품등록</button>
      </form>
    </div>
  );
}

export default FruitsCreate;