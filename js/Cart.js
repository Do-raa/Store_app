const cardsContainer = document.getElementById("cardsContainer")
let counter = 0 
const arr = []
let isExist = false
 


fetch('../data.json')
    .then(response => response.json()) 
    .then(data => {data.forEach(el => 
        el.id == localStorage.getItem('id') ? arr.push(el.id) && createCardForProduct(el) : null
        )

    }) 
console.log(arr)

 // Create cards for products
    function createCardForProduct (el) {
    counter++ 

    const card = document.createElement('div') 
    card.classList.add('card');

    let _img = document.createElement('img')
    _img.src = el.imageLink

    let cardTitle = document.createElement('h2') 
    cardTitle.textContent = el.name 

    const cardCategory = document.createElement('p');
    cardCategory.textContent = `Category: ${el.category}`;

    const cardPrice = document.createElement('p');
    cardPrice.textContent = `Price: $${el.price}`; 

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${counter}`;

    const btn = document.createElement('button')

    card.appendChild(cardTitle)
    card.appendChild(_img)
    card.appendChild(cardCategory)
    card.appendChild(cardPrice)
    card.appendChild(quantity)
    
    cardsContainer.appendChild(card) 
}