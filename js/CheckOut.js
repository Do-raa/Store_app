const btn = document.querySelector('.button') 
const container = document.getElementById('payment_information')
const back_icon = document.querySelector('i') 

btn.onclick = () => { 
    container.innerHTML = "Payment confirmed . Thank you for your order ! "  
    container.style.fontSize = '20px'
    container.style.fontWeight = 'bold' 
    container.style.margin = '50px'
} 

back_icon.onclick = () => {
    history.back()
} 


