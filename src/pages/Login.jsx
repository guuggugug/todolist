import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      message.error("Sai email hoặc mật khẩu!");
      return;
    }

    localStorage.setItem("user", email);
    message.success("Đăng nhập thành công!");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="todo-container" style={{ maxWidth: 400 }}>
        <h2>Đăng nhập</h2>

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
            rules={[{ required: true, message: "Nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>

        <Button
          type="link"
          onClick={() => navigate("/register")}
          style={{ marginTop: 10 }}
          block
        >
          Chưa có tài khoản? Đăng ký ngay
        </Button>
      </div>
    </div>
  );
}

export default Login;
