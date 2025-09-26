import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user");

  const [todos, setTodos] = useState(() => {
    if (!userEmail) return [];
    const saved = localStorage.getItem(`todos_${userEmail}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    }
  }, [userEmail, navigate]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(`todos_${userEmail}`, JSON.stringify(todos));
    }
  }, [todos, userEmail]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="todo-container">
        <h1>Danh sách công việc</h1>
        <p className="user-email">{userEmail}</p>

        <div className="input-group">
          <input
            type="text"
            value={input}
            placeholder="Thêm công việc..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTodo}>Thêm</button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.done ? "done" : ""}`}
              onClick={() => toggleTodo(todo.id)} // 🔑 entire item is clickable
            >
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // prevent toggle when deleting
                  removeTodo(todo.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button className="logout" onClick={logout}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
