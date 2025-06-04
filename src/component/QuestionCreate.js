import React, { useState } from 'react';
import axios from 'axios';

function QuestionCreate({ onQuestionAdded }) {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:9070/question', form)
      .then(() => {
        alert('질문이 성공적으로 등록되었습니다!');
        onQuestionAdded(); // 질문 추가 시 부모 컴포넌트에 알림
      })
      .catch((err) => {
        console.error(err);
        alert('질문 등록에 실패했습니다.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="질문 제목"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="질문 내용"
        value={form.content}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">질문 등록</button>
    </form>
  );
}

export default QuestionCreate;