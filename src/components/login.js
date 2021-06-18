import React,{ useState } from 'react';
import './login.css';
import './registration.css';
import { validateEmail, validatePassword } from '../utils/validation';
import { login } from '../actions/login';
import { connect } from 'react-redux';

const Login = ({data, login, ...props}) => {
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors,setErrors] = useState({
        emailError: '',
        passwordError: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkBeforeSubmit(formData,errors)){
            login(formData);
            console.log('do something')
        } else {
            setSubmitError('Please fill all the fields to continue');
        }
    }
    function updateError(name, value){
        switch(name){                
            case 'email':
                if(validateEmail(value)){
                    setErrors({ ...errors, emailError: '' })
                } else {
                    setErrors({ ...errors, emailError: `Invalid email address` })
                }
                break;                
            case 'password':
                if(validatePassword(value)){
                    setErrors({ ...errors, passwordError: '' })
                } else {
                    setErrors({ ...errors, passwordError: `password should be between 8 and 20 digits and must contain atleast one numeric digit, one uppercase and one lowercase letter` })
                }
                break;   
            default:
                break;             
        }
    }
    function checkBeforeSubmit(formData, errors){
        let formValues = Object.values(formData);
        let errorValues = Object.values(errors);
        let formErrors = formValues.some(val => !val);
        let errorsPresent = errorValues.some(val =>  val);
        if(formErrors || errorsPresent){
            return false;
        }
        return true;
    }
    const handleChange = e => {
        setSubmitError('');
        const { name, value } = e.target;
        switch(name){               
            case 'email':
                setFormData({ ...formData, email: value });
                break;                
            case 'password':
                setFormData({ ...formData, password: value });
                break;
            default:
                break;                
        }
        updateError(name,value);
    };
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
                                <input name='email' onChange={handleChange} placeholder='Email Address' type='text' />
                                {errors.emailError && <span className='error login-error'>{errors.emailError}</span>}
                            </div>
                            <div className='pass'>
                                <input name='password' onChange={handleChange} placeholder='Password' type='password' />
                                {errors.passwordError && <span className='error login-error'>{errors.passwordError}</span>}
                            </div>
                            <div className='options d-flex align-items-center mb-3'>
                                <button className='text-button' type='button'>Register Now</button>
                                <span>{' |  '}</span>
                                <button className='text-button' type='button'>Forgotten</button>
                            </div>
                            <div>
                                <button onClick={handleSubmit} className='btn-primary btn-lg' type='button'>Login</button> 
                                {submitError && <span className='error d-block mt-3 m-0'>{submitError}</span>}
                            </div>                           
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    data: state.login
})

export default connect(mapStateToProps, { login })(Login);
