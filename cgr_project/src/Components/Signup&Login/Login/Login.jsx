import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../public/assets/css/owncss/SignupLogin.css';
import Logo from '../../../../public/assets/img/Logo/CGR-removebg-signup.png';

function Login() {
    const [finNo, setFinNo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (finNo === 'admin' && password === 'admin') {
            navigate('/dashboardadmin', { state: { FinNo: finNo } });
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='Login'>
            <div id="app" className="app app-full-height app-without-header">
                <div className="login">
                    <div className="login-content border p-5 py-1 border-5 border-dark rounded-4 bluebg">
                        <form onSubmit={handleLogin}>
                            <div className='w-50 h-50 mx-auto my-4 p-0 bg-light border border-4 border-primary rounded-5'>
                                <img src={Logo} alt='logo' className='w-100 h-100 ' />
                            </div>
                            <h1 className="text-center bluetext">Log In</h1>
                            <div className="text-body text-opacity-50 text-center mb-5">
                                <span className='yellowtext'>For your protection, please verify your identity.</span>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">FIN ID</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg fs-14px"
                                    placeholder="Enter FIN No"
                                    value={finNo}
                                    onChange={(e) => setFinNo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg fs-14px"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button type="submit" className="btn btn-lg d-block w-100 my-3 bg-warning text-white fw-bold buttonborder border-light rounded">
                                LOG IN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
