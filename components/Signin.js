import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '30%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <h1 id="intro-text-container">RARE <span style={{ fontSize: '0.6em', marginBottom: '200px' }}>©</span></h1>
      <Button id="login-button" type="button" size="lg" className="copy-btn" onClick={signIn}>
        user login
      </Button>
    </div>
  );
}

export default Signin;
