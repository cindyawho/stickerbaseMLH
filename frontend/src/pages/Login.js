import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === 'user' && password === 'password'){
            localStorage.setItem('isLoggedIn', true);
            navigate('/dashboard');
        } else {
            alert('Invalid username or password');
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange = {(e) => setUsername(e.target.value)}
                    required
                />
                <br/>   
                <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required
                /> 
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;