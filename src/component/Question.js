import React, {useState, useContext} from 'react'; // 리액트 hooks 상태 변수 사용
import axios from 'axios'; // 서버측과 통신하기 위함
import '../css/question.css' // 서버측과 통신하기 위함
import { AlertContext } from '../AlertContext';

const Question=()=> {
  // const [변수명, 함수명] = useState({ // useState 공식
  //   변수1:'값',
  //   변수2:'값',
  //   변수3:'값',
  //   변수4:'값',
  // }); 

  // 1. 상태변수 선언
  const [FormData, setFormData] = useState({
    name:'',
    tel:'',
    email:'',
    txtbox:'',
  });

  const { setQuestionCount } = useContext(AlertContext);

  // 2. 입력양식에 사용자가 입력시 함수 호출
  const handleChange=(e)=>{
    const{name, value} = e.target;
    setFormData(prev => ({...prev, [name]:value}));
  }

  // 3. 입력완료, 전송하기, send 버튼 클릭시 실행되는 함수
  // 서버측에 post방식으로 데이터를 넘기기 위한 내용
  const handleSubmit= async e => {
    e.preventDefault();
    try{ // 데이터 전송 성공시
      await axios.post('http://localhost:9070/question', FormData);
      alert('질문이 등록되었습니다.');

      // 데이터 보내고 나면 변수값 초기화
      setFormData({name:'',tel:'',email:'',txtbox:''});

    }catch{ // 데이터 전송 실패시
      alert('질문 등록에 실패하셨습니다.')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="formbox">
      <section>
        <h2>정성을 다해 답변을 해드리겠습니다.</h2>
        <div className="left_form">
          <p>
            <label htmlFor="name">성함 </label>
            <input type="text" id="name" name="name" required onChange={handleChange} value={FormData.name} placeholder="성함을 입력해주세요."/>
          </p>
          <p>
            <label htmlFor="tel">전화번호</label>
            <input type="tel" id="tel" name="tel" required placeholder="전화번호을 입력해주세요." value={FormData.tel} onChange={handleChange}/>
          </p>
          <p>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" required onChange={handleChange} value={FormData.email} placeholder="이메일을 입력해주세요."/>
          </p>
        </div>
        <div className="right_form">
          <label htmlFor="txtbox">내용</label>
          <textarea 
          id="txtbox" 
          name="txtbox" 
          rows="10" 
          cols="50" 
          maxLength={300} // 300자 제한 추가
          required 
          placeholder="내용을 입력해주세요."
          value={FormData.txtbox}
          onChange={handleChange}>
          </textarea>
        </div>
        <div>
          <input type="checkbox" id="agree" required />
          <label htmlFor="agree">개인정보처리 방침에 동의합니다.</label>
        </div>
        <input type="submit" value="보내기" />
      </section>
    </form>
  );
}

export default Question;