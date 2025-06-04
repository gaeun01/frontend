import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FruitsUpdate(props) {
  // 1. 변수 선언 상품명, 가격정보
  const {name} = useParams();
  const [form, setForm] = useState({
    name:'',
    price:'',
    color:'',
    country:''
  });

  const navigate = useNavigate();

  // 2. 서버측에 넘길 데이터(name)를 통신해서 성공, 실패여부 출력
  useEffect(()=>{
    axios.get('http://Localhost:9070/fruit/${name}')
    // 성공이면 출력
    .then(res=>{
      console.log('서버 응답값 : ',res.data);
      setForm(res.data);
    })
    // 실패면 오류 메세지
    .catch(err=> console.log('조회 오류 : ',err));
  },[name]);

  // 사용자가 입력양식에 데이터를 입력했을 경우 상태 변수에 저장하기
  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  // 수정하기 메뉴 클릭시 실행되는 함수
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios.put('http://Localhost:9070/fruit/${name}',{
      name:form.name,
      price:form.price,
      color:form.color,
      country:form.country
    })
    .then(()=>{
      alert('상품저옵가 수정되었습니다.');
      navigate('/fruit');
    })
    .catch(err=> console.log('수정 오류 : ',err));
  }
  return (
    <div>
      <h3>fruits 상품 수정 페이지입니다.</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label for="name">상품명 : </label>
          <input name="name" id="name" value={form.name}/>
        </p>

        <p>
          <label for="price">상품가격 : </label>
          <input name="price" id="price" value={form.price}/>
        </p>

        <p>
          <label for="color">컬러 : </label>
          <input name="color" id="color" value={form.color}/>
        </p>

        <p>
          <label for="country">원산지 : </label>
          <input name="country" id="country" value={form.country}/>
        </p>
        <butotn type="submit">수정하기</butotn>
      </form>
    </div>
  );
}

export default FruitsUpdate;