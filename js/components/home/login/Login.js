import React from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const Login = ({
  email,
  password,
  setEmail,
  setPassword,
  userSubmitsLogin,
  loading
  }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    userSubmitsLogin({ email, password });
  };

  return (<div>
    <h2>Log-in</h2>
    <form onSubmit={ handleSubmit }>
      <FormGroup>
        <ControlLabel>E-mail</ControlLabel>
        <FormControl
          type="text"
          name="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="E-mail"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <FormControl
          type="password"
          name="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
        />
      </FormGroup>
      <div>
        <Button
          type="submit"
          disabled={ loading }
          bsStyle="success"
        >
          { loading ? 'Loading' : 'Login' }
        </Button>

        <Link to={ '/register' }>
          Register
        </Link>
      </div>
    </form>
  </div>);
};


Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  userSubmitsLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Login;
