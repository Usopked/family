import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 가져오기
import './App.css'; // 커스텀 CSS

function App() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 특정 날짜에 메모를 추가하는 함수
  const addMemo = (date, memo) => {
    const formattedDate = date.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [formattedDate]: prevEvents[formattedDate]
        ? [...prevEvents[formattedDate], memo]
        : [memo],
    }));
  };

  // 날짜 클릭 시 팝업 열기
  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setShowPopup(true);
  };

  // 메모 추가 버튼 클릭
  const handleAddMemo = () => {
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
        onClickDay={handleDateClick}
        tileContent={({ date }) => {
          const memos = events[date.toDateString()];
          return memos ? (
            <div className="tile-content">{memos.length}개의 메모</div>
          ) : null;
        }}
      />
      <p>선택한 날짜: {value.toDateString()}</p>
      <button onClick={handleAddMemo}>메모 추가</button>

      {showPopup && selectedDate && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedDate}</h2>
            <ul>
              {events[selectedDate]?.map((memo, index) => (
                <li key={index}>{memo}</li>
              )) || <p>메모가 없습니다.</p>}
            </ul>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;