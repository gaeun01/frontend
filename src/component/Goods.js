import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Goods(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setGoodsCount } = useContext(AlertContext); // goodsCount 제거, set만 사용됨

  // loadData를 useCallback으로 감싸면 useEffect 의존성 경고 해결
  const loadData = useCallback(() => {
    axios
      .get('http://localhost:9070/goods')
      .then(res => {
        setData(res.data);
        setGoodsCount(res.data.length);
      })
      .catch(err => console.log(err));
  }, [setGoodsCount]); // setGoodsCount는 변경되지 않지만, 명시적으로 포함

  useEffect(() => {
    loadData();
  }, [loadData]); // 경고 해결됨

  const deleteData = (g_code) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios
        .delete(`http://localhost:9070/goods/${g_code}`)
        .then(() => {
          alert('삭제되었습니다.');
          loadData(); // 삭제 후 재로드
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <section>
      <h2>Goods페이지</h2>
      <dl>
        <dt>기능 추가 사항</dt>
        <dd>1. create메뉴 : 새로운 페이지로 이동하여 자료 입력할 수 있도록 함.</dd>
        <dd>2. update메뉴 : 수정페이지로 이동하여 자료 수정할 수 있도록 함.</dd>
        <dd>3. delete메뉴 : 해당 id값에 일치하는 자료 삭제 요청(axios.delete)</dd>
        <dd>4. 삭제 후 목록 다시 불러오기(자동 갱신)</dd>
      </dl>

      <table>
        <caption>Goods Data</caption>
        <thead>
          <tr>
            <th>g_code(코드번호)</th>
            <th>g_name(상품명)</th>
            <th>g_cost(상품가격)</th>
            <th>메뉴</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.g_code}>
              <td>{item.g_code}</td>
              <td>{item.g_name}</td>
              <td>{Number(item.g_cost).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/goods/update/${item.g_code}`)}>수정</button>
                &nbsp;
                <button onClick={() => deleteData(item.g_code)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: 'right', width: '440px' }}>
        <button onClick={() => navigate('/goods/create')}>상품 등록</button>
      </p>
    </section>
  );
}

export default Goods;
