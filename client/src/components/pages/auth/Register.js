import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register({ history }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/users/register", { ...user });
      localStorage.setItem("first_login", true);
      history.push("/");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={registerSubmit}>
        <input type='text' name='name' required placeholder='Name' value={user.name} onChange={onChangeInput} />
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
          <button type='submit'>Register</button>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
