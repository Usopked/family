import React, { useState } from "react";
import Modal from "react-modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일 가져오기
import "./App.css"; // 커스텀 CSS

// Modal의 root element 설정
Modal.setAppElement("#root");

function App() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [editDeletePopup, setEditDeletePopup] = useState(false);
  const [editingPost, setEditingPost] = useState(null); // 현재 수정/삭제할 포스트 정보

  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setEditDeletePopup(true);
  };

  const handleEdit = () => {
    const updatedPost = prompt("수정할 내용을 입력하세요:", editingPost);
    if (updatedPost) {
      // 수정 로직
      setEvents((prev) => {
        const updatedEvents = { ...prev };
        const userPosts = [...updatedEvents[selectedDate]];
        userPosts[editingPost.index] = updatedPost; // 포스트 수정
        updatedEvents[selectedDate] = userPosts;
        return updatedEvents;
      });
    }
    setEditDeletePopup(false);
  };

  const handleDelete = () => {
    setEvents((prev) => {
      const updatedEvents = { ...prev };
      const userPosts = [...updatedEvents[selectedDate]];
      userPosts.splice(editingPost.index, 1); // 포스트 삭제
      if (userPosts.length === 0) {
        delete updatedEvents[selectedDate]; // 모든 포스트가 삭제되면 날짜 제거
      } else {
        updatedEvents[selectedDate] = userPosts;
      }
      return updatedEvents;
    });
    setEditDeletePopup(false);
  };

  return (
    <div className="app">
      <h1>React Calendar with Memos</h1>
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDateClick}
      />
      <p>선택한 날짜: {selectedDate}</p>

      {/* 수정/삭제 Modal */}
      <Modal
        isOpen={editDeletePopup}
        onRequestClose={() => setEditDeletePopup(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <h2>{selectedDate} - 수정 또는 삭제</h2>
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
        <button onClick={() => setEditDeletePopup(false)}>닫기</button>
      </Modal>
    </div>
  );
}

export default App;