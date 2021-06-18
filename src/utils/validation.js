export function validateEmail(mail) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailRegex.test(mail)) {
        return (true)
    }
    return false;
}

export function validatePassword(inputtxt) { 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    if(inputtxt.match(passw)) {
        return true;
    }
    return false;
}
