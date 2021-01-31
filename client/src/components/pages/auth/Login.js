import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login({ history }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/users/login", { ...user });
      localStorage.setItem("first_login", true);
      history.push("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <input
          type='email'
          name='email'
          required
          placeholder='Email address'
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
        />
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
