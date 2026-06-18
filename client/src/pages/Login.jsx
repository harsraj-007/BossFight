import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();   // ← HERE

  const handleLogin = async () => {

    const response = await fetch(
      `${BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    localStorage.setItem("token", data.token);

    alert("Login successful");

    navigate("/dashboard");

    console.log(data);
  };

  return (
    <div>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;