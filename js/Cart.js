const cardsContainer = document.getElementById("cardsContainer") 
const signIn_icon = document.getElementById('sign_in') 
const signOut_icon = document.getElementById('sign_out')



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

fetch('../data.json')
    .then(response => response.json()) 
    .then((data) => { 
        console.log(data)
        // Create card elements for each product in the cartProducts array 
        data.forEach((product) => { 
            console.log(JSON.parse(localStorage.getItem('id')))
            if(product.id == JSON.parse(localStorage.getItem('id'))?.find((item)=> item.id == product.id )?.id) 
                { createCardForProduct(product) } 
        })
}) 

 // Create cards for products
    function createCardForProduct (el) { 
    let counter = 1 
    let totall = el.price 

    const card = document.createElement('div') 
    card.classList.add('card');

    let cardTitle = document.createElement('h2') 
    cardTitle.textContent = el.name 

    let span = document.createElement('span') 
    span.classList.add('close') 
    span.textContent = 'X'

    cardTitle.appendChild(span)
    card.appendChild(cardTitle)

    let _img = document.createElement('img')
    _img.src = el.imageLink
    card.appendChild(_img)

    const cardCategory = document.createElement('p');
    cardCategory.textContent = `Category: ${el.category}`;
    card.appendChild(cardCategory)

    const cardPrice = document.createElement('p');
    cardPrice.textContent = `Price: $${el.price}`; 
    card.appendChild(cardPrice) 

    const quantity = document.createElement('p');
    quantity.classList.add('container'); 
    quantity.textContent = "Quantity : ";
    card.appendChild(quantity) 

    const minusBtn = document.createElement('button') 
    minusBtn.classList.add('minus')
    minusBtn.textContent = "-"
    quantity.appendChild(minusBtn) 
    minusBtn.onclick = () => { 
        counter > 0 ? --counter && (qty.textContent = counter) && (total.textContent = `TOTAL : ${totall * counter}`) : null
        counter == 0 ? (total.textContent = `TOTAL : 0`)  && (qty.textContent = counter) : null
    }

    const qty = document.createElement('p'); 
    qty.textContent = counter;
    quantity.appendChild(qty) 

    const plusBtn = document.createElement('button') 
    plusBtn.classList.add('plus')
    plusBtn.textContent = "+" 
    quantity.appendChild(plusBtn) 
    plusBtn.onclick = () => ++counter && (qty.textContent = counter) && (total.textContent = `TOTAL : ${totall * counter}`); 

    const total = document.createElement('p'); 
    total.textContent = `TOTAL : ${totall}`;
    card.appendChild(total) 
    
    cardsContainer.appendChild(card)

    span.onclick = () => cardsContainer.removeChild(card) 
} 



