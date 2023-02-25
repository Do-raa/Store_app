const signIn_icon = document.getElementById('sign_in') 
const signOut_icon = document.getElementById('sign_out')

signIn_icon.onclick = () =>  window.location.href = 'http://127.0.0.1:5500/basics/SignIn.html' 
signOut_icon.onclick = () => localStorage.setItem('email', '') & setIcon()

function setIcon() {
    if(localStorage.getItem('email')) {
    signIn_icon.style.display = 'none' 
    signOut_icon.style.display = 'inline-block'
    } else {
    signIn_icon.style.display = 'inline-block'
    signOut_icon.style.display = 'none'
    }
}

setIcon()

