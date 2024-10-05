import React, { useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import InputGroup from '../molecules/InputGroup';
import { Button } from '@mui/material';

const LoginForm = () => {
  const { login } = useContext(LoginContext);

  const onLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    login(username, password);
  };

  return (
    <div className='form'>
      <h2 className='login-title'>Login</h2>
      <form className='login-form' onSubmit={onLogin}>
        <InputGroup
          label='username'
          type='text'
          id='username'
          name='username'
          placeholder='username'
          autoComplete='username'
          required
        />
        <InputGroup
          label='password'
          type='password'
          id='password'
          name='password'
          placeholder='password'
          autoComplete='password'
          required
        />
        <Button
          type='submit'
          variant='contained'
          disableElevation
          color='primary'
        >
          로그인
        </Button>
      </form>
    </div>
  );
};
export default LoginForm;
