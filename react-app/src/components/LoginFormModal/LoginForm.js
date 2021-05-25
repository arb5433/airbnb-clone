import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import './LoginForm.css'

const LoginForm = ({setShowModal}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
  }

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-form-wrapper'>
      <div className='login-title-wrapper'>
          <button className='edt-and-del-btns exit-btn' onClick={closeModal}>X</button>
        <div className='login-title'>ThereBnB Log in</div>
      </div>
      <form onSubmit={onLogin} className='login-form'>
        <div className='errors-div'>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div className='login-email'>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            className='login-input'
          />
        </div>
        <div className='login-password'>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className='login-input'
          />
          <button className='login-btn' type="submit">Login</button>
          <button className='login-btn' onClick={demoLogin}>Demo User Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
