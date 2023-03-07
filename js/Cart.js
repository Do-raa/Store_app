const cardsContainer = document.getElementById("cardsContainer") 
const signIn_icon = document.getElementById('sign_in') 
const signOut_icon = document.getElementById('sign_out')
const total_pg = document.getElementById('total')
const checkout_btn = document.getElementById('checkout')


signIn_icon.onclick = () =>  window.location.href = 'http://127.0.0.1:5500/basics/SignIn.html' 
signOut_icon.onclick = () => localStorage.setItem('email', '') & setIcon() & (window.location.href = 'http://127.0.0.1:5500/basics/Home.html' )

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

JSON.parse(localStorage.getItem('products')).forEach(el => {
    createCardForProduct (el) 
});

if(cardsContainer.innerHTML == "") {
    cardsContainer.innerHTML = "Your cart is empty !" 
    cardsContainer.style.marginTop = "200px"
    checkout_btn.style.display = "none"
}

 // Create cards for products
    function createCardForProduct (el) { 

    let id = el.id 
    let quantity = el.quantity 
    let price = el.price
    
    cardsContainer.innerHTML += `
    <div class = "card"> 
        <h2>${el.title}</h2> 
        <p class = "close"> X </p> 
        <div class="content">
        <div>
        <img src="${el.images[2]}" alt ='img' />  
        </div>
        <div style="margin-left: 20px; padding: 10px">
        <p>Category: ${el.category.name}</p> 
        <p>Price: $${price}</p> 
        <p> Quantity : </p> 
        <button class ="minus"> - </button> 
        <p id="qty"> ${quantity} </p> 
        <button class ="plus"> + </button> 
        <div>
        </div>
    </div>
    ` 
    const minusBtn = document.querySelector('.minus')
    const plusBtn = document.querySelector('.plus') 
    const closeBtn = document.querySelector('.close') 
    const card = document.querySelector('.card') 
    let qty = document.getElementById('qty') 

    const myProducts = JSON.parse(localStorage.getItem('products')) 
    let myItem = myProducts.find(item => item.id == id) 
    
    minusBtn.addEventListener('click', () => {
        if(quantity > 0) { 
            qty.textContent = --quantity
        }else if(quantity == 0) {
            qty.textContent = quantity
        } 
        myItem.quantity = quantity
        localStorage.setItem('products', JSON.stringify(myProducts))
    })

    plusBtn.addEventListener('click', () => {
        qty.textContent = ++quantity 
        myItem.quantity = quantity
        localStorage.setItem('products', JSON.stringify(myProducts))
    })
    
    closeBtn.onclick = function (){  
    let index = myProducts.findIndex((item) => item.id == id) 
        if(index != -1) {
            myProducts.splice( index, 1) 
            localStorage.setItem('products', JSON.stringify(myProducts))
        }
        cardsContainer.removeChild(card) 
    }  
} 

function calculateTotal() {
    const myProducts = JSON.parse(localStorage.getItem('products')) 
    let sum = 0
    myProducts.forEach(item => sum += item.quantity * item.price) 
    //console.log(sum) 
    return sum
}

total_pg.innerHTML = 'Total :' + calculateTotal()

checkout_btn.addEventListener('click', () => {
    localStorage.getItem('email') == '' ? window.location.href = 'http://127.0.0.1:5500/basics/SignIn.html' : window.location.href = 'http://127.0.0.1:5500/basics/CheckOut.html'
})