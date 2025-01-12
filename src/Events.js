// Events.js
import React from "react";

function Events({ selectedDate, users, events, onAddPost, onClose }) {
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="events-container">
        <h2>{selectedDate}</h2>
        {users.map((user) => (
          <div key={user.name} className="user-block">
            <div className="user-header">
              <span>{user.name}</span>
              <button onClick={() => onAddPost(user.name)}>포스트 작성</button>
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
  );
}

export default Events;