import React, { useState } from 'react';

function Login({ changeBody,username,userid,info ,userExists,togglePassword}) {
    return (
        <div className="login-container">
            <div className="login-header"><h3>Login Page</h3></div>
            <form onSubmit={info} id="loginForm">
                <div className="form-group1">
                    <label htmlFor="username">Username </label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div className="form-group1">
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password3" name="password" required />
                    <span id="password-toggle3" className="password-toggle" onClick={()=>togglePassword(3)}>Show</span>
                </div>
                <div className="form-group1" >
                    <button  className="login-btn10" type="submit">Login</button>
                    <a href="#" className='alink'  onClick={() => changeBody(2)}>Sign Up</a>
                </div>
                <div id="flash-messages">
                    
                </div>
            </form>
        </div>
    );
}

export default Login;
