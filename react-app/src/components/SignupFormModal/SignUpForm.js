import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({setShowModal}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-form-wrapper'>
      <div className='login-title-wrapper'>
        <button className='edt-and-del-btns exit-btn' onClick={() => setShowModal(false)}>X</button>
        <div className='login-title'>ThereBnB Sign up</div>
      </div>
      <form className='login-form' onSubmit={onSignUp}>
        <div className='login-email'>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            className='login-input'
          ></input>
        </div>
        <div className='login-email'>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            className='login-input'
          ></input>
        </div>
        <div className='login-email'>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            className='login-input'
          ></input>
        </div>
        <div className='login-email'>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className='login-input'
          ></input>
        </div>
        <button className='signup-btn' type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
