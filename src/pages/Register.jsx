import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      message.error("Email đã tồn tại!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", email);
    localStorage.setItem(`todos_${email}`, JSON.stringify([]));

    message.success("Đăng ký thành công!");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="todo-container" style={{ maxWidth: 400 }}>
        <h2>Đăng ký</h2>

        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Nhập mật khẩu!" },
              {
                pattern: /^[A-Za-z0-9]{6,}$/,
                message: "Mật khẩu ít nhất 6 ký tự!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form>

        <Button
          type="link"
          onClick={() => navigate("/login")}
          style={{ marginTop: 10 }}
          block
        >
          Đã có tài khoản? Đăng nhập ngay
        </Button>
      </div>
    </div>
  );
}

export default Register;
