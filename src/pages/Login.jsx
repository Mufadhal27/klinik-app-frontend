import React from 'react';
import LoginForm from '../components/LoginForm'; 

function Login() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
            <LoginForm />
        </div>
    );
}

export default Login;