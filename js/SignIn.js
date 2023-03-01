const email_input = document.getElementById('floatingInput')
const password_input = document.getElementById('floatingPassword') 
const btn = document.getElementById('btn') 
const fields_warning = document.getElementById('fields_warning') 
const email_warning = document.getElementById('email_warning')
const password_warning = document.getElementById('password_warning') 
const back_icon = document.querySelector('i')

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/  
// Contains at least one digit.
// Contains at least one lowercase letter.
// Contains at least one uppercase letter.
// Has a length of 8 or more characters.

const inputsValidation = () => {
    if(email_input.value === "" || password_input.value === "") {
        fields_warning.innerHTML = "All fields must be filled ! " 
        return false
    }else {
        fields_warning.innerHTML = "" 
        return true
    }
}

const emailValidation = () => {
    if(!emailRegex.test(email_input.value) && email_input.value != "") {
        email_warning.innerHTML = 'Please enter a valid email address' 
        return false
    }else {
        email_warning.innerHTML = ""
        return true
    }
}

const passwordValidation = () => {
    if(!passwordRegex.test(password_input.value) && password_input.value != "" ) {
        password_warning.innerHTML = 'Your password should contain at least one digit, one uppercase letter, one lowercase letter and has a length of 8 or more characters.' 
        return false
    }else {
        password_warning.innerHTML = "" 
        return true
    }
}

btn.addEventListener('click', (e) => { 
    e.preventDefault() 
    
    if( inputsValidation() && passwordValidation() && emailValidation() ) { 
        fetch('https://api.storerestapi.com/users')
        .then(response => response.json()) 
        .then(res => res.data.forEach(user => {
            user.email == email_input.value && user.password == password_input.value ? 
                localStorage.setItem('email', email_input.value) & history.back() : 
                fields_warning.innerHTML = "This user doesn't exist ! " 
        }))
        .catch(err => console.log(err))  
    }
}) 

back_icon.onclick = () => {
    history.back()
}