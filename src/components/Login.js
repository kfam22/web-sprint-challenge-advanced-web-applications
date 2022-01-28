import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Login = () => {
    const { push } = useHistory();
    // set state
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    // handle changes
    const handleChange = e =>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    // handle submit
    const handleSubmit = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', credentials)
        .then(res=>{
            localStorage.setItem('token', res.data.token)
            push('/view');
        })
        .catch(err=>{
            setError(err.response.data.error);
        })
    }
    
    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                <label htmlFor='username'>Username</label>
                <input onChange={handleChange} name='username' id='username' />
                </div>

                <div className='input-container'>
                <label htmlFor='password'>Password</label>
                <input onChange={handleChange} name='password' id='password' type='password' />
                </div>

                <button id='submit'>Submit</button>
                {error && <p id='error'>{error}</p>}
            </form>
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;
// * [ ] In `Login.js`, build all UI and state functionality needed to capture a username and password. On a successful login, redirect user to the `View.js` component.
// * [X] **Make sure that the input for your username and password includes the id="username" and id="password" attributes. Codegrade autotests will fail without them.**
// * [X] **Make sure that the submit button to your login form includes the id="submit" attribute.  Codegrade autotests will fail without them.**
// * [X] In `Login.js`, add a p tag that will display an error if one occurs. Add in all state functionality needed to support error display.
// * [X] **Make sure your error p tag has an id="error" attribute attached. Codegrade autotests will fail without them.**
// * [X] Construct an http request that retrieves an auth token from the server when the username `Lambda` and the password `School` is passed into the request. Complete successful login auth flow and redirect to `View.js.`
// * [X] Display an appropriate error message when login is not successful.



const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
