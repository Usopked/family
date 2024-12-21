import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {
  const [value, setValue] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEvents, setShowEvents] = useState(false);

  const handleDateClick = (date) => {
    const dateStr = date.toDateString();
    setSelectedDate(dateStr);
    setShowEvents(true);
  };

  const closeEvents = () => {
    setShowEvents(false);
  };

  const handleRegisterUser = () => {
    const name = prompt("사용자 이름을 입력하세요:");
    const password = prompt("비밀번호를 입력하세요:");
    if (name && password) {
      setUsers((prev) => [...prev, { name, password }]);
      alert(`${name}님이 등록되었습니다.`);
    }
  };

  const deleteUser = () => {
    const userName = prompt("삭제할 사용자 이름을 입력하세요:");
    if (!userName) return;
    const confirmation = window.confirm(`${userName}님을 삭제하시겠습니까?`);
    if (confirmation) {
      setUsers((prev) => prev.filter((user) => user.name !== userName));
      setEvents((prev) => {
        const updatedEvents = {};
        for (const date in prev) {
          updatedEvents[date] = prev[date].filter((event) => event.user !== userName);
        }
        return updatedEvents;
      });
      alert(`${userName}님이 삭제되었습니다.`);
    }
  };

  const addPost = (user) => {
    const password = prompt(`${user}님의 비밀번호를 입력하세요:`);
    const userObj = users.find((u) => u.name === user && u.password === password);
    if (userObj) {
      const newPost = prompt("새 포스트 내용을 입력하세요:");
      if (newPost) {
        setEvents((prev) => {
          const updatedEvents = { ...prev };
          updatedEvents[selectedDate] = updatedEvents[selectedDate] || [];
          updatedEvents[selectedDate].push({ user, content: newPost });
          return updatedEvents;
        });
      }
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="app">
      <h1>React Calendar with Memos</h1>
      <div className="header-buttons">
        <button onClick={handleRegisterUser}>사용자 등록</button>
        <button onClick={deleteUser} className="delete-user-button">
          사용자 삭제
        </button>
      </div>
      <Calendar onChange={setValue} value={value} onClickDay={handleDateClick} />

      {showEvents && (
        <>
          <div className="overlay" onClick={closeEvents}></div>
          <div className="events-container">
            <h2>선택한 날짜: {selectedDate}</h2>
            {users.map((user) => (
              <div key={user.name} className="user-block">
                <div className="user-header">
                  <span>{user.name}</span>
                  <button onClick={() => addPost(user.name)}>포스트 작성</button>
                </div>
                <div className="posts">
                  {(events[selectedDate] || [])
                    .filter((post) => post.user === user.name)
                    .map((post, index) => (
                      <div key={index} className="post">
                        {post.content}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;