import React from 'react'
import Login from '../_components/Login'

function LoginPage() {
  return (
    <>
    <div>Hello : {process.env.JWT_SECRET}</div>
    <div>Login Page</div>
    <Login />
    </>
  )
}

export default LoginPage