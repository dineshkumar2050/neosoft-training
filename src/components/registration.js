import React from 'react';
import './registration.css';

const Registration = () => {
    return(
        <>
            <div className="login">
                <button type="button" className="facebook">
                    <div className="facebook">
                        <span className="iconify" data-icon="ri:facebook-fill" data-inline="false"></span>
                        <p>Login with Facebook</p>
                    </div>
                </button>
                <button type="button" className="google">
                    <div className="google">
                        <span className="iconify" data-icon="akar-icons:google-fill" data-inline="false"></span>
                        <p>Login with Google</p>
                    </div>
                </button> 
            </div>
            <div className="register">
                <form className="formapp">
                    <h2>Register to NeoSTORE</h2>
                    <input type="text" className="first_name" placeholder="First Name" /><span style={{marginTop: '0px'}} className="Tr">Tr</span>
                    <br/>
                    <input type="text" className="last_name" placeholder="Last Name" /><span className="Tr">Tr</span>
                    <br/>
                    <input type="email" className="email_address" placeholder="Email Address" /><span className="iconify" data-icon="carbon:email" data-inline="false"></span>
                    <br/>
                    <input type="password" className="password" placeholder="Password" /><span className="iconify" data-icon="bx:bx-show" data-inline="false"></span>
                    <p>8-12 Alphanumeric characters</p>
                    <input type="password" className="password" placeholder="Confirm Password" /><span className="iconify" data-icon="bx:bx-show" data-inline="false"></span>
                    <p>8-12 Alphanumeric characters</p>
                    <input type="number" className="password" placeholder="Mobile Number" /><span className="iconify" data-icon="fluent:call-32-filled" data-inline="false"></span>
                    <p>Max 10</p>
                    <input type="radio" name="gender" className="gender" value="male" /> Male <input type="radio" name="gender" value="female" /> Female
                    <br/>
                    <button type="submit" className="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Registration;
