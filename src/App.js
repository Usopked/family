// App.js
import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";
import UserManagement from "./UserManagement";
import EventCalendar from "./EventCalendar";
import Events from "./Events";

function App() {
  const [value, setValue] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEvents, setShowEvents] = useState(false);

  // Firebase에서 사용자 목록 가져오기
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  // 선택된 날짜에 맞는 포스트 가져오기
  useEffect(() => {
    if (!selectedDate) return;

    const postsQuery = query(
      collection(db, "posts"),
      where("date", "==", selectedDate) // 선택된 날짜에 해당하는 포스트만 가져오기
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => doc.data());
      setEvents((prev) => ({
        ...prev,
        [selectedDate]: postsData,
      }));
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 리스너 제거
  }, [selectedDate]); // selectedDate가 변경될 때마다 다시 실행

  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setShowEvents(true);
  };

  const closeEvents = () => setShowEvents(false);

  const handleRegisterUser = async () => {
    const name = prompt("사용자 이름을 입력하세요:");
    const password = prompt("비밀번호를 입력하세요:");
    if (name && password) {
      const user = { name, password };
      await addDoc(collection(db, "users"), user);
      setUsers((prev) => [...prev, user]);
      alert(`${name}님이 등록되었습니다.`);
    }
  };

  const deleteUser = async () => {
    const userName = prompt("삭제할 사용자 이름을 입력하세요:");
    if (!userName) return;
    const confirmation = window.confirm(`${userName}님을 삭제하시겠습니까?`);
    if (confirmation) {
      const userDoc = users.find((user) => user.name === userName);
      if (userDoc) {
        await deleteDoc(doc(db, "users", userDoc.id));
        setUsers((prev) => prev.filter((user) => user.name !== userName));
        alert(`${userName}님이 삭제되었습니다.`);
      }
    }
  };

  const addPost = async (user) => {
    const password = prompt(`${user}님의 비밀번호를 입력하세요:`);
    const userObj = users.find((u) => u.name === user && u.password === password);
    if (userObj) {
      const newPost = prompt("새 포스트 내용을 입력하세요:");
      if (newPost) {
        const post = { user, content: newPost, date: selectedDate };
        await addDoc(collection(db, "posts"), post);
      }
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="app">
      <h1>Family Calendar</h1>
      <UserManagement onRegister={handleRegisterUser} onDelete={deleteUser} />
      <EventCalendar value={value} onChange={setValue} onDateClick={handleDateClick} />
      {showEvents && (
        <Events
          selectedDate={selectedDate}
          users={users}
          events={events}
          onAddPost={addPost}
          onClose={closeEvents}
        />
      )}
    </div>
  );
}

export default App;