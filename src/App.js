import React, { useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 가져오기
import "./App.css"; // 커스텀 CSS

Modal.setAppElement("#root");

function App() {
  const [value, setValue] = useState(new Date());
  const [users, setUsers] = useState([]); // 사용자 리스트
  const [events, setEvents] = useState({}); // 날짜별 이벤트 저장 { date: [{user, content}] }
  const [selectedDate, setSelectedDate] = useState(null);
  const [editDeletePopup, setEditDeletePopup] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const handleDateClick = (date) => {
    const dateStr = date.toDateString(); // 날짜를 문자열로 변환
    setSelectedDate(dateStr); // 선택된 날짜 설정
  };

  // 사용자 추가
  const handleRegisterUser = () => {
    const name = prompt("사용자 이름을 입력하세요:");
    const password = prompt("비밀번호를 입력하세요:");
    if (name && password) {
      setUsers((prev) => [...prev, { name, password }]);
      alert(`${name}님이 등록되었습니다.`);
    }
  };

  // 사용자 삭제
  const handleDeleteUser = () => {
    const name = prompt("삭제할 사용자 이름을 입력하세요:");
    const password = prompt("비밀번호를 입력하세요:");
    setUsers((prev) => {
      const user = prev.find((u) => u.name === name && u.password === password);
      if (user) {
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          // 모든 날짜의 해당 사용자 포스트 삭제
          Object.keys(updatedEvents).forEach((date) => {
            updatedEvents[date] = updatedEvents[date].filter(
              (post) => post.user !== name
            );
            if (updatedEvents[date].length === 0) delete updatedEvents[date];
          });
          return updatedEvents;
        });
        alert(`${name}님이 삭제되었습니다.`);
        return prev.filter((user) => user.name !== name);
      } else {
        alert("이름 또는 비밀번호가 잘못되었습니다.");
        return prev;
      }
    });
  };

  // 포스트 추가
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

  // 포스트 수정 및 삭제 팝업
  const handlePostClick = (index, post) => {
    const password = prompt(`${post.user}님의 비밀번호를 입력하세요:`);
    const userObj = users.find((u) => u.name === post.user && u.password === password);
    if (userObj) {
      setEditingPost({ index, post });
      setEditDeletePopup(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleEdit = () => {
    const updatedContent = prompt("수정할 내용을 입력하세요:", editingPost.post.content);
    if (updatedContent) {
      setEvents((prev) => {
        const updatedEvents = { ...prev };
        updatedEvents[selectedDate][editingPost.index].content = updatedContent;
        return updatedEvents;
      });
    }
    setEditDeletePopup(false);
  };

  const handleDelete = () => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      updatedEvents[selectedDate].splice(editingPost.index, 1);
      if (updatedEvents[selectedDate].length === 0) delete updatedEvents[selectedDate];
      return updatedEvents;
    });
    setEditDeletePopup(false);
  };

  return (
    <div className="app">
      <h1>React Calendar with Memos</h1>
      <div className="header-buttons">
        <button onClick={handleRegisterUser}>사용자 등록</button>
        <button onClick={handleDeleteUser}>사용자 삭제</button>
      </div>
      <Calendar onChange={setValue} value={value} onClickDay={handleDateClick} />
      <p>선택한 날짜: {selectedDate}</p>

      {/* 선택된 날짜의 사용자별 블록 */}
      {selectedDate && (
        <div className="events-container">
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
                    <div
                      key={index}
                      className="post"
                      onClick={() => handlePostClick(index, post)}
                    >
                      {post.content}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 수정/삭제 Modal */}
      <Modal
        isOpen={editDeletePopup}
        onRequestClose={() => setEditDeletePopup(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>수정 또는 삭제</h2>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <button onClick={() => setEditDeletePopup(false)}>닫기</button>
      </Modal>
    </div>
  );
}

export default App;