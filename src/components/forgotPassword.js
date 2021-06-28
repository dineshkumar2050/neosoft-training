import React,{ useState, useEffect } from 'react';
import './forgotPassword.css';
import InputField from './InputField';
import { useLocation, useHistory } from 'react-router-dom';
import Button from './button';
import ErrorMessage from './ErrorMessage';
import api from '../utils/api';
import { validateEmail, validatePassword } from '../utils/validation';

export default function ForgotPassword({}){
    const location = useLocation(); 
    const pathname = location && location.pathname;
    const pathValue = pathname.substring(pathname.lastIndexOf('/') + 1);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [recoverPasswordData, setRecoverPasswordData] = useState({
        verification_code: '',
        new_password: '',
        confirm_password: ''
    });
    const getCode = async (e) => {
        e.preventDefault();
        if(!emailError){
            if(email){
                const res = await api.post('/auth/forgot-password',{email});
                if(res && res.data){
                    setCodeSent(true);
                }
            } else {
                setEmailError('Email cannot be empty');
            }
        }
    }
    const handleChange = e => {
        e.preventDefault();
        const { value } = e.target;
        setEmail(value);
        if(validateEmail(value)){
            setEmailError('')
        } else {
            setEmailError('Invalid email address')
        }
    }
    return(
        <div className='forgot text-center '>
            {
                codeSent ?
                    <RecoverPassword 
                        recoverPasswordData={recoverPasswordData} 
                         setRecoverPasswordData={setRecoverPasswordData} 
                        heading={pathValue === 'recoverPassword' ? 'Recover Password' : 'Forgot Password'} 
                    />
                    :
                    <div className='form-parent'>
                        <h2 className='mb-2'>Enter email here</h2>
                        <InputField 
                            style={{ textAlign:'center',border: 'none', borderBottom: '1px solid #888' }} 
                            type={'text'} 
                            placeholder={'Email'} 
                            handleChange={handleChange} 
                        />
                        {
                            emailError &&
                            <ErrorMessage className={'mt-3 text-center'} message={emailError} />
                        }                        
                        <Button content={'Send Code'} onClick={getCode} type={'button'} className={'btn-lg btn-primary mt-4'} />
                    </div>
            }

        </div>
    )
}

function RecoverPassword({heading, setRecoverPasswordData, recoverPasswordData}){
    const [forgotError, setForgotError] = useState({
        passwordError: '',
        confirmPasswordError: ''
    })
    const history = useHistory();
    const [formError, setFormError] = useState('');
    function updateError(name, value){
        switch(name){               
            case 'newPassword':                
                if(validatePassword(value)){
                    setForgotError({ ...forgotError, passwordError: '' })
                } else {
                    setForgotError({ ...forgotError, passwordError: `password should be between 8 and 12 digits and must contain atleast one numeric digit, one uppercase and one lowercase letter` })
                }
                break;                
            case 'confirmPassword':
                if(value === recoverPasswordData.new_password) {
                    setForgotError({ ...forgotError, confirmPasswordError: '' })
                } else {
                    setForgotError({ ...forgotError, confirmPasswordError: `passwords do not match` })
                }
                break; 
            default:
                break;             
        }
    }
    function checkBeforeSubmit({...recoverPasswordData}, {...forgotError}){
        let formValues = Object.values(recoverPasswordData);
        let errorValues = Object.values(forgotError);
        let formErrors = formValues.some(val => !val);
        let errorsPresent = errorValues.some(val =>  val);
        if(formErrors || errorsPresent){
            return false;
        }
        return true;
    }
    const handleChange = e => {
        e.preventDefault();
        setFormError('');
        const { name, value } = e.target;
        switch(name){
            case 'verificationCode':
                setRecoverPasswordData({ ...recoverPasswordData,verification_code: value });
                break;
            case 'newPassword':
                setRecoverPasswordData({ ...recoverPasswordData,new_password: value });
                break;
            case 'confirmPassword':
                setRecoverPasswordData({ ...recoverPasswordData,confirm_password: value });
                break;   
            default:
                break;           
        }
        updateError(name, value);
    }
    const changePassword = async (e) => {
        e.preventDefault();
        if(checkBeforeSubmit({...recoverPasswordData}, {...forgotError})){
            let res = await api.post('/auth/set-password',{ ...recoverPasswordData })
            if(res && res.data){
                history.push({
                    pathname: '/'
                })
            }
        } else {
            setFormError('Please fill all the fields to continue');
        }
    }
    useEffect(() => {
        if(recoverPasswordData){
            if(recoverPasswordData.new_password === recoverPasswordData.confirm_password) {
                setForgotError({ ...forgotError, confirmPasswordError: '' })
            } else {
                setForgotError({ ...forgotError, confirmPasswordError: `passwords do not match` })
            }
        }
    },[recoverPasswordData.new_password,recoverPasswordData.confirm_password]);
    return(
        <div className='recover-or-forgot'>
            <h2>{heading}</h2>
            <span className='error mb-3'>Verification code has been sent to your registered mail ID</span>
            <InputField style={{ border: 'none', borderBottom: '1px solid #000' }} name={'verificationCode'} type={'text'} placeholder={'Verification Code'} handleChange={handleChange} />
            <InputField style={{ border: 'none', borderBottom: '1px solid #000' }} name={'newPassword'} type={'password'} placeholder={'New Password'} handleChange={handleChange} />
            {
                forgotError && forgotError.passwordError &&
                <ErrorMessage className={'my-2'} message={forgotError.passwordError} />
            }
            <InputField style={{ border: 'none', borderBottom: '1px solid #000' }} name={'confirmPassword'} type={'password'} placeholder={'Confirm Password'} handleChange={handleChange} />
            {
                forgotError && forgotError.confirmPasswordError &&
                <ErrorMessage className={'my-2'} message={forgotError.confirmPasswordError} />
            }
            <Button content={'Change Password'} onClick={changePassword} type={'button'} className={'btn-lg btn-primary mt-4'} />
            {
                formError &&
                <ErrorMessage className={'my-2'} message={formError} />
            }
        </div>
    )
}
