import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/register", form);
    login(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
