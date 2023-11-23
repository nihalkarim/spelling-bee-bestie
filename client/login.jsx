const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass != pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });

    return false;
};

const LoginWindow = (props) => {
    return (
        <>
            <div className='flex flex-row my-4'>
                <h2 className="font-display text-3xl">Welcome back, bee</h2>
                <img id="logo" src="/assets/img/bee.png" alt="bee logo" className="w-8 h-fit mx-3" />
            </div>
            <form id='loginForm'
                name='loginForm'
                onSubmit={handleLogin}
                action='/login'
                method='POST'
                className='flex flex-col'
            >
                <input id='user' type="text" name='username' placeholder='Username' className='border-2 rounded-md focus:border-amber-500 hover:border-amber-300 p-3 my-3 w-60' />

                <input id='pass' type="password" name='pass' placeholder='Password' className='border-2 rounded-md focus:border-amber-300 hover:border-amber-300 p-3 w-60' />

                <input type="submit" value='Sign In' className='rounded-md bg-amber-300 focus:border-amber-200 hover:bg-amber-500 w-20 px-3 py-2 mx-auto my-4 font-display' />
            </form></>
    );
};

const SignupWindow = (props) => {
    return (
        <>
            <div className='flex flex-row my-4'>
                <h2 className="font-display text-3xl">Welcome, new bee</h2>
                <img id="logo" src="/assets/img/bee.png" alt="bee logo" className="w-8 h-fit mx-3" />
            </div>
            <form id='signupForm'
                name='signupForm'
                onSubmit={handleSignup}
                action='/signup'
                method='POST'
                className='flex flex-col'
            >
                <input id='user' type="text" name='username' placeholder='Username' className='border-2 rounded-md focus:border-amber-500 hover:border-amber-300 p-3 my-3 w-60' />

                <input id='pass' type="password" name='pass' placeholder='Password' className='border-2 rounded-md focus:border-amber-500 hover:border-amber-300 p-3 w-60' />

                <input id='pass2' type="password" name='pass2' placeholder='Retype password' className='border-2 rounded-md focus:border-amber-300 o:border-amber-300 p-3 my-3 w-60' />

                <input type="submit" value='Signup' className='rounded-md bg-amber-300 hover:bg-amber-200 w-20 px-3 py-2 mx-auto my-4 font-display' />
            </form></>
    );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />, document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />, document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow />, document.getElementById('content'));
};

window.onload = init;