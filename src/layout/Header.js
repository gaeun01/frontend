import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'; // 아이콘 import
import '../style/common.css'; // common.css

function Header(props) {

  // const username = localhost.getItem('username'); // 로컬 스토리지 값을 변수에 담는다.
  // 로그아웃 클릭시 호출되는 함수
  // const handleLogout = () => {
  //   localStorage.removeItem('token'); // 기존 데이터 지우기
  //   localStorage.removeItem('username'); // 기존 데이터 비우기
  //   navigate('/login'); // 로그인 페이지로 이동
  //   window.location.reload(); // 상태 갱신을 위해 새로 고침
  // }
  return (
    

    <header className="header">
      <button className="icon-button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div className="logo-wrap">
        <img src="/images/logo_clr.png" alt="logo" /> 
      </div>

      <button className="icon-button">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </header>

    // 사용자가 로그인시 이름, 로그아웃 버튼이 나옴
    // 삼항조건 연산자 => 조건식?참인값:거짓인값;
    // 조건부 렌더링 => 조건식 && 참인값:거짓인값
    
    // {username ? (
    //   <span>
    //     <b>{username}</b>님 환영합니다.
    //     <button onClick={handleLogout} style-{{marginLeft:'10px'}}>로그아웃</button>
    //   </span>
    // ) : (
    //   <Link to="/login">로그인</Link>
    // )}

  );
};
export default Header;