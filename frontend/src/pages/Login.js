import React, {useState} from 'react'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(value) {
        console.log(value);
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
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;