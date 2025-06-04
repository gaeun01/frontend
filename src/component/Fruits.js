import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertContext';

function Fruits(props) {
  // 1. 상태 변수 선언
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { setFruitsCount } = useContext(AlertContext);

  // 페이지 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1); // 초기값
  const itemPerPage = 5; // 한페이지에 보여지는 게시물 개수

  // 페이지 계산공식 56개 /5 =11 페이지
  const indexOfLast = currentPage * itemPerPage;

  const indexOfFirst = indexOfLast - itemPerPage;

  // data 배열 중 현재 페이지에 해당하는 부분만 잘라냄
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  // 전체 페이지수 totalpage = Math.ceil(13/ 5) = 3, 무조건 올림
  const totalPage = Math.ceil(data.length / itemPerPage);

  // 시작번호와 끝번호를 계산해야한다.
  let startPage = Math.max(1, currentPage-2);
  let lastPage = Math.min(totalPage, startPage + 4);

  // 페이지 번호 배열 (1~5를 동적으로 변환, 또는 totalpages까지 제한 가능)
  const pageNumbers = Array.from({length:lastPage - startPage +1},(_,i)=> startPage+i);
  


  // 2. 상품리스트 조회 (출력)
  const loadData=()=>{
    // React 비동기 통신
    axios
  .get('http://localhost:9070/fruit')
  .then(res => {
    setData(res.data);          // 기존 코드
    setFruitsCount(res.data.length); //  추가 코드
  })
  .catch(err => console.log(err));
  }

  // 래액트 훅인 useEffect를 사용하여 콤포넌트가 처음 마운트 되었을 경우에만 loadData()함수를 실행함.
  // 리액트의 생병주기 함수인 componentDidMount()와 같다고 보면 됨
  useEffect(()=>{
    loadData();
  },[]);

  if ((currentPage - 1) * itemPerPage >= data.length -1 &&
currentPage > 1) {
  setCurrentPage(currentPage - 1);
}


  return (
    <section>
      <h2>Fruits 페이지</h2>

      <table>
        <caption>Fruits Data</caption>
        <thead>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>color</th>
            <th>country</th>
          </tr>
        </thead>
        <tbody>
          {
            // db 데이터가 저장된 data 변수
            currentItems.map(item=>(
              <tr key={item.num}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.color}</td>
                <td>{item.country}</td>
                <td>
                  <button onClick={()=> navigate(`/fruit/update/${item.name}`)}>수정</button>&nbsp;&nbsp;
                  <button>삭제</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {/* 페이지 번호가 출력되는 곳 */}
      <p style={{marginTop:'20px', textAlign:'center', width:'450px'}}>

        {/* 이전 버튼 들어가는곳 */}
        {currentPage > 1 && (
          <button
            onClick={()=>setCurrentPage(currentPage-1)}
          >이전</button>
        )}
        {/* 페이지 번호 (1,2,3,4,5) 가 출력되는곳 */}
        {pageNumbers.map(number=>(
          <button
            key={number}
            style={{
              marginRight:'5px',
              backgroundColor: currentPage === number ? '#4caf50' : '#f0f0f0',
              color: currentPage === number ? '#ffff' : '#000',
              padding: '5px 10px',
              border:'1px solid #ccc',
              borderRadius:'4px',
            }}
            onClick={()=>setCurrentPage(number)}
          >
            {number}
          </button>
        ))
        }

        {/* 다음 버튼 들어가는곳 */}
        {currentPage < totalPage &&(
          <button
            onClick={()=>setCurrentPage(currentPage+1)}
          >다음</button>
        )}
      </p>

      {/* 상품등록 버튼 */}
      <p>

      </p>
      <p>
        <button onClick={()=> navigate('/fruit/create')} style={{float:'right'}}>상품등록</button>
      </p>
    </section>
  );
}

export default Fruits;