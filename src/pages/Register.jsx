import React from 'react';
import RegisterForm from '../components/RegisterForm'; 

function Register() { 
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
            <RegisterForm /> 
        </div>
    );
}

export default Register; 