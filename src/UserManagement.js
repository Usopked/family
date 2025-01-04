import React from "react";

function UserManagement({ onRegister, onDelete }) {
  return (
    <div className="header-buttons">
      <button onClick={onRegister}>사용자 등록</button>
      <button onClick={onDelete} className="delete-user-button">
        사용자 삭제
      </button>
    </div>
  );
}

export default UserManagement;