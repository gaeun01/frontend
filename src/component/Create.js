import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create=() => {
  const [form, setForm] = useState({
    g_name:'',
    g_cost:''
  });
  
  // url주소 관리
  const navigate = useNavigate();

  // 사용자가 입력박스에 입력하면 함수 호출
  const handleChange=(e)=>{
    setForm({
      ...form, // 기존 배열 값에 추가하여 저장한다.
      [e.target.name]:e.target.value
    });
  };

  // 신규상품등록하기 버튼 클릭시 호출되는 함수
  const handleSubmit=(e)=>{
    e.prventDefault(); // 새로고침 방지

    axios.post('http://localhost:9070/goods', form)
      .then(()=>{ // 서버와 통신이 성공하면
        alert('상품이 등록되었습니다.');
        navigate('/goods'); // 상품 목록 페이지로 이동
      })
      .catch(err=>console.log(err));
  }
  return (
    <section>
      <h2>상품 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>상풍명 : </label>
          <input 
            name="g_name" 
            value={form.g_name}
            onChange={handleChange}
            required
          />
        </p>
        <p>
          <label>가격정보 : </label>
          <input 
            type="number"
            name="g_cost"
            value={form.g_cost}
            onChange={handleChange}
            required
          />
        </p>
        <button type="submit">신규 상품 등록하기</button>
      </form>
    </section>
  );
}

export default Create;