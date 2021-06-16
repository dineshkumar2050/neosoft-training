import React from 'react';
import './login.css';
import './registration.css';

const Login = () => {
    return(
        <div className="content">
            <div className="login-with-info login">
                <button type="button" className="facebook mb-3">
                    <div className="facebook">
                        <span className="iconify" data-icon="ri:facebook-fill" data-inline="false"></span>
                        <p>Login with Facebook</p>
                    </div>
                </button>
                <button type="button" className="google mb-3">
                    <div className="google">
                        <span className="iconify" data-icon="akar-icons:google-fill" data-inline="false"></span>
                        <p>Login with Google</p>
                    </div>
                </button>
                <button type="button" className="google twitter mb-3">
                    <div className="twitter google">
                        <span className="iconify" data-icon="akar-icons:twitter-fill" data-inline="false"></span>
                        <p>Login with Twitter</p>
                    </div>
                </button>
            </div>
            <div className="login-form">
                <div>
                    <h2>Login to NeoSTORE</h2>
                    <form>
                        <fieldset>
                            <div className='email'>
                                <input placeholder='Email Address' type='text' />
                            </div>
                            <div className='pass'>
                                <input placeholder='Password' type='password' />
                            </div>
                            <div className='options d-flex align-items-center mb-3'>
                                <button className='text-button' type='button'>Register Now</button>
                                <span>{' |  '}</span>
                                <button className='text-button' type='button'>Forgotten</button>
                            </div>
                            <button className='btn-primary btn-lg' type='button'>Login</button>                            
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
