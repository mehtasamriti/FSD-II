import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if(username === "admin" && password === "1234"){

      const token = "jwt-token-example";

      localStorage.setItem("token", token);

      navigate("/dashboard");

    }
    else{
      alert("Invalid Username or Password");
    }

  };


  return (
    <div>
      <h2>Login Page</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;