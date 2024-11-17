import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 가져오기
import './App.css'; // 커스텀 CSS

function App() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState({});

  // 특정 날짜에 메모를 추가하는 함수
  const addMemo = (date, memo) => {
    const formattedDate = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [formattedDate]: memo,
    }));
  };

  const handleDateClick = () => {
    const memo = prompt('메모를 입력하세요:');
    if (memo) {
      addMemo(value, memo);
    }
  };

  return (
    <div className="app">
      <h1>React Calendar with Memos</h1>
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={({ date }) => {
          const memo = events[date.toDateString()];
          return memo ? <div className="tile-content">{memo}</div> : null;
        }}
      />
      <p>선택한 날짜: {value.toDateString()}</p>
      <button onClick={handleDateClick}>메모 추가</button>
    </div>
  );
}

export default App;