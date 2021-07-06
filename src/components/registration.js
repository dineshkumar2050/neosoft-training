import React,{ useState, useEffect } from 'react';
import './registration.css';
import { validateEmail, validatePassword, checkValidName } from '../utils/validation';
import { register } from '../actions/register';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Registration = ({ data, register, ...props }) => {
    const [submitError, setSubmitError] = useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(null);
    const [formData, setFormData] = useState({
        firstName:'',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileNumber: '',
        gender: ''
    });
    const [errors,setErrors] = useState({
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        mobileNumberError: '',
        genderError: ''
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkBeforeSubmit(formData,errors)){
            setIsLoading(true);
            register({...formData});
            setIsLoading(false);
        } else {
            setSubmitError('Please fill all the fields to continue');
        }
    }
    function updateError(name, value){
        switch(name){
            case 'firstName':
                if(!value){
                    setErrors({ ...errors, firstNameError: `${name} cannot be empty` })
                } else if(value && !checkValidName(value)){
                    setErrors({ ...errors, firstNameError: `white spaces,numbers & special characters not allowed` }) 
                } else {
                    setErrors({ ...errors, firstNameError: '' })
                }     
                break;           
            case 'lastName':
                if(!value){
                    setErrors({ ...errors, lastNameError: `${name} cannot be empty` })
                } else if(value && !checkValidName(value)){
                    setErrors({ ...errors, lastNameError: `white spaces,numbers & special characters not allowed` }) 
                } else {
                    setErrors({ ...errors, lastNameError: '' })
                }
                break;                
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
                    setErrors({ ...errors, passwordError: `password should be between 8 and 12 digits and must contain atleast one numeric digit, one uppercase and one lowercase letter` })
                }
                break;                
            case 'confirmPassword':
                if(value === formData.password) {
                    setErrors({ ...errors, confirmPasswordError: '' })
                } else {
                    setErrors({ ...errors, confirmPasswordError: `passwords do not match` })
                }
                break;                
            case 'mobileNumber':
                if(value && value.length === 10){
                    setErrors({ ...errors, mobileNumberError: '' })
                } else {
                    setErrors({ ...errors, mobileNumberError: `Incorrect mobile number` })
                }
                break;                
            case 'gender':
                if(!value){
                    setErrors({ ...errors, genderError: `${name} cannot be empty` })
                } else {
                    setErrors({ ...errors, genderError: '' })
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
            case 'firstName':
                setFormData({ ...formData, firstName: value });     
                break;           
            case 'lastName':
                setFormData({ ...formData, lastName: value });
                break;                
            case 'email':
                setFormData({ ...formData, email: value });
                break;                
            case 'password':
                setFormData({ ...formData, password: value });
                break;                
            case 'confirmPassword':
                setFormData({ ...formData, confirmPassword: value });
                break;                
            case 'mobileNumber':
                setFormData({ ...formData, mobileNumber: value });
                break;                
            case 'gender':
                setFormData({ ...formData, gender: value });
                break;
            default:
                break;                
        }
        updateError(name,value);
    };
    const showHidePassword = (e,id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        let typeVal = element && element.type;
        if(typeVal === 'password'){
            element.type = 'text';
            return;
        } else {
            element.type = 'password';
            return;
        }
    }
    useEffect(() => {
        if(formData){
            if(formData.password === formData.confirmPassword) {
                setErrors({ ...errors, confirmPasswordError: '' })
            } else {
                setErrors({ ...errors, confirmPasswordError: `passwords do not match` })
            }
        }
    },[formData.password,formData.confirmPassword]);
    useEffect(() => {
        if(data && data.success && !data.loading && !data.error){
            history.push({
                pathname: '/'
            })
        }
    },[data]);
    return(
        isLoading ? 
        <Spinner /> : 
        <>
            <div className="login">
                <button type="button" className="facebook mb-2 mb-sm-0">
                    <div className="facebook">
                        <span className="iconify" data-icon="ri:facebook-fill" data-inline="false"></span>
                        <p>Login with Facebook</p>
                    </div>
                </button>
                <button type="button" className="google mb-sm-0 mb-2">
                    <div className="google">
                        <span className="iconify" data-icon="akar-icons:google-fill" data-inline="false"></span>
                        <p>Login with Google</p>
                    </div>
                </button> 
            </div>
            <div className="register">
                <form className="formapp">
                    <h2>Register to NeoSTORE</h2>
                    <div>
                        <div>
                            <input onChange={handleChange} name='firstName' type="text" className="first_name" placeholder="First Name" />
                            <span style={{marginTop: '0px'}} className="Tr">Tr</span>
                        </div>                        
                        {errors.firstNameError && <span className='error'>{errors.firstNameError}</span>}
                    </div>
                    <div>
                        <div>
                            <input onChange={handleChange} name='lastName' type="text" className="last_name" placeholder="Last Name" />
                            <span className="Tr">Tr</span>
                        </div>
                        {errors.lastNameError && <span className='error'>{errors.lastNameError}</span>}
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center parent'>
                            <input onChange={handleChange} name='email' type="email" className="email_address" placeholder="Email Address" />
                            <button type='button' className='unset-css'>
                                <span className="iconify" data-icon="carbon:email" data-inline="false"></span>
                            </button>
                        </div>
                        {errors.emailError && <span className='error'>{errors.emailError}</span>}
                    </div>
                    <div>
                        <div  className='d-flex justify-content-between align-items-center parent'>
                            <input onChange={handleChange} name='password' id='password' type="password" className="password" placeholder="Password" />
                            <button type='button' className='unset-css' onClick={e => showHidePassword(e,'password')}>
                                <span className="iconify" data-icon="bx:bx-show" data-inline="false"></span>
                            </button>
                        </div>
                        {errors.passwordError && <span className='error'>{errors.passwordError}</span>}
                    </div>
                    <p className='para-msg'>8-12 Alphanumeric characters</p>
                    <div>
                        <div  className='d-flex justify-content-between align-items-center parent'>
                            <input onChange={handleChange} name='confirmPassword' id='confirmPassword' type="password" className="password" placeholder="Confirm Password" />
                            <button type='button' className='unset-css' onClick={e => showHidePassword(e,'confirmPassword')}>
                                <span className="iconify" data-icon="bx:bx-show" data-inline="false"></span>
                            </button>
                        </div>
                        {errors.confirmPasswordError && <span className='error'>{errors.confirmPasswordError}</span>}
                    </div>
                    <p className='para-msg'>8-12 Alphanumeric characters</p>
                    <div>
                        <div className='d-flex justify-content-between align-items-center parent'>
                            <input onChange={handleChange} min='0000000000' max='9999999999' name='mobileNumber' type="number" className="password" placeholder="Mobile Number" />
                            <button type='button' className='unset-css'>
                                <span className="iconify" data-icon="fluent:call-32-filled" data-inline="false"></span>
                            </button>
                        </div>
                        {errors.mobileNumberError && <span className='error'>{errors.mobileNumberError}</span>}
                    </div>
                    <p>Max 10</p>
                    <div>
                        <div className='d-flex align-items-center'>
                            <div className='mr-5'>
                                <input onChange={handleChange} type="radio" name="gender" id='male' className="gender" value="male" /> 
                                <label htmlFor='male'>Male</label>                         
                            </div>
                            <div>
                                <input onChange={handleChange} type="radio" name="gender" id='female' className="gender" value="female" /> 
                                <label htmlFor='female'>Female</label>
                            </div>
                        </div>
                        {errors.genderError && <span className='error'>{errors.genderError}</span>}
                    </div>
                    
                    <button onClick={handleSubmit} type="submit" className="submit">Register</button>
                    {submitError && <span className='error'>{submitError}</span>}
                </form>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    data: state.register
});

export default connect(mapStateToProps, {register})(Registration);
