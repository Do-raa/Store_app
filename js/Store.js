const cardsContainer = document.getElementById('cards-container'); 
const input = document.querySelector('input') 
const pricedropdown = document.getElementById('pricedropdown')
const categorydropdown = document.getElementById('categorydropdown')
const signIn_icon = document.getElementById('sign_in') 
const signOut_icon = document.getElementById('sign_out') 
const spinner = document.getElementById('spinner')
let isLoading = true
let filteredData 


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

const setSpinner = () => {
    isLoading == true? spinner.style.visibility = 'visible' : spinner.style.visibility = 'hidden'
}

setSpinner()

fetch('https://api.escuelajs.co/api/v1/products')
.then(response => response.json())
.then(data => { 
    data.forEach(el => el.id <= 200 ? createCardForProduct(el) & (isLoading = false) & setSpinner(): null) 

    input.addEventListener('input', () =>{
        cardsContainer.innerHTML = ""
        filteredData = data.filter(el => el.id <= 200 ? el.title.toLowerCase().includes(input.value.toLowerCase()) : null) 
        filteredData.length != 0 ?  filteredData.forEach(el => createCardForProduct(el)) : cardsContainer.innerHTML = "No result found !" 
    })

// Handle price range dropdown selection
Array.from(pricedropdown.children).map(el => {
    el.addEventListener('click', function() {
        const priceRange = this.textContent;
        cardsContainer.innerHTML = ""; // Clear existing cards
        let filteredData;
        switch (priceRange) {
        case "Less than 50.00":
            filteredData = data.filter(el => el.price < 50.00);
            break;
        case "Between 50.00 and 100.00":
            filteredData = data.filter(el => el.price >= 50.00 && el.price <= 100.00);
            break;
        case "Up to 100.00":
            filteredData = data.filter(el => el.price > 100.00);
            break;
        default:
            filteredData = data;
        }
        // Create cards for products in the selected price range
        filteredData.forEach(el => {
        createCardForProduct(el);
        })
    })})


// Handle category dropdown selection
Array.from(categorydropdown.children).map(el => {
    el.addEventListener('click', function() {
        const category = this.textContent;
        cardsContainer.innerHTML = ""; // Clear existing cards
        let filteredData;
        switch (category) {
        case "Clothes":
            filteredData = data.filter(el => el.category === "clothes");
            break;
        case "Accessories":
            filteredData = data.filter(el => el.category === "accessories");
            break;
        case "Shoes":
            filteredData = data.filter(el => el.category === "shoes");
            break;
        default:
            filteredData = data;
        }
        // Create cards for products in the selected category
        filteredData.forEach(el => {
        createCardForProduct(el);
        })
    }) 
})
}) 
// Create cards for products
function createCardForProduct (el) {

    const card = document.createElement('div') 
    card.classList.add('card');

    let _img = document.createElement('img')
    _img.src = el.images[0]  

    let cardTitle = document.createElement('h2') 
    cardTitle.textContent = el.title 

    let cardDes = document.createElement('p') 
    cardDes.textContent = el.description 

    const cardCategory = document.createElement('p');
    cardCategory.textContent = `Category: ${el.category.name}`;

    const cardPrice = document.createElement('p'); 
    cardPrice.classList.add('price')
    cardPrice.textContent = `Price: $${el.price}`;

    const btn = document.createElement('button')
    btn.classList.add('cartbtn')
    btn.textContent = "Add to cart"

    card.appendChild(cardTitle)
    card.appendChild(_img)
    card.appendChild(cardDes) 
    card.appendChild(cardCategory)
    card.appendChild(cardPrice)
    card.appendChild(btn) 

    cardsContainer.appendChild(card)

    //handle button 
    card.onclick = () => { 
        let id = el.id 
        let category = el.category.name
        sendData(id, category) 
        console.log(id)
    } 

    btn.addEventListener("click", (e) =>{ 
        let id = el.id 
        //e.preventDefault()
        e.stopPropagation()
        window.location.href = 'http://127.0.0.1:5500/basics/Cart.html' 

        const currentIds = JSON.parse(localStorage.getItem('id')) || [] 
        const existingProduct = currentIds.findIndex((item) => item.id == id) 
        
        if( existingProduct != -1) {
            let quantity = currentIds[existingProduct]?.quantity 
            console.log(quantity)
            if( quantity ) { 
                currentIds[existingProduct].quantity = quantity+1 
            }
            localStorage.setItem('id', JSON.stringify([...currentIds]))
        } else {
            localStorage.setItem('id', JSON.stringify([...currentIds, {quantity : 1, id}]))
        }
        
    }) 
} 

function sendData(id, category) {
    const url = `http://127.0.0.1:5500/basics/itemDetails.html?id=${id}?${category}`; 
    window.location.href = url; 
} 