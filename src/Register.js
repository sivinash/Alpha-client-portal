import React, { useState } from 'react';
import{FaEyeSlash, FaEye} from 'react-icons/fa';
export default function Register({ changeBody ,showFlashMessage,togglePassword}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    async function register(e) {
        e.preventDefault();
        if (password !== password1) {
            showFlashMessage("Passwords do not match","error");
            return;
        }
        const guestid = localStorage.getItem("guestid");
        const address = JSON.parse(localStorage.getItem("Address"));
        console.log("Guest ID:", guestid);
        console.log('address',address)
        const registerData = {
            username,
            password,
            guest_id: guestid,
            address: address
        };
        try {
            const response = await fetch("/add_user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });
            if (response.ok) {
                showFlashMessage("Registration successful","success");
                localStorage.setItem("cartitems", JSON.stringify([]));
                localStorage.setItem("guestexist", false);
                localStorage.setItem("guestid","");
                console.log("super");
                const data = await response.json();
                showFlashMessage(data.message,"success");
                setUsername('');
                setPassword('');
                setPassword1('');
            } else {
                const errorData = await response.json();
                showFlashMessage(errorData.message,"error");
           }
        } catch (error) {
            console.error('Error during registration:', error);
            showFlashMessage("An error occurred during registration. Please try again.");
        }
    }
    return (
        <div className="login-container">
            <div className="login-header"><h3>Registration Form</h3></div>
            <form onSubmit={register}>
                <div className="form-group1">
                    <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />
                </div>
                <div className="form-group1">
                    <label htmlFor="password">Password :</label>
                <input 
                    type="password" 
                    id="password1" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <span id="password-toggle1" className="password-toggle" onClick={()=>togglePassword(1)}>Show</span>
                </div>
                <div className="form-group1">
                    <label htmlFor="password1">Confirm Password :</label>
                <input 
                    type="password" 
                    id="password2" 
                    name="password1" 
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required 
                />
                <span id="password-toggle2" className="password-toggle" onClick={()=>togglePassword(2)}>Show</span>
                </div>
                <div className="form-group1"  >
                    <button type="submit" className="login-btn10">Register</button>
                    <a href="#" className='alink' onClick={() => changeBody(1)}>Login</a>
                </div>
            </form>
            <div id="flash-messages">
                <div class="alert alert-{{ category }}"></div>     
            </div>
        </div>

    );
}
