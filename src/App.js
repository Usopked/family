// App.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 가져오기

function App() {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <h1>React Calendar</h1>
      <Calendar 
        onChange={setValue} 
        value={value} 
      />
      <p>선택한 날짜: {value.toDateString()}</p>
    </div>
  );
}

export default App;