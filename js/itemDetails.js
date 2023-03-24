const productList = document.getElementById('product-list')
const previous = document.querySelector('.previous') 
const next = document.querySelector('.next')
const identicalProductsContainer = document.getElementById('similar-products') 
const back_icon = document.querySelector('i')
const arr = [] 
let start = 0 
let end = 4

const urlParams = new URLSearchParams(window.location.search)
const info = urlParams.get('id').split('?'); 

//fetch data that has the same id as the query do and create a card for it 
fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => { 
            data.forEach(el => {
                el.id == info[0] ? createCardForProduct(el) : null 
                el.category == info[1] && el.id != info[0]?  imagesContainer(el) : null 
            }) 

        }) 

//create slides for similar products 
function imagesContainer (el) {
    const slides = document.createElement('div') 
    slides.classList.add('slides');

    let _img = document.createElement('img') 
    _img.src = el.image 

    slides.appendChild(_img)
    arr.push(slides) 
    
    displaySlides() 
} 

// Create cards for products
function createCardForProduct (el) {

    const card = document.createElement('div') 
    card.classList.add('card');

    let _img = document.createElement('img')
    _img.src = el.image

    let cardTitle = document.createElement('h2') 
    cardTitle.textContent = el.title 

    const container = document.createElement('div') 
    container.classList.add('container'); 

    let title = document.createElement('h5') 
    title.textContent = 'DESCRIPTIF TECHNIQUE'  

    let cardDes = document.createElement('p') 
    cardDes.textContent = el.description 

    const cardCategory = document.createElement('p');
    cardCategory.textContent = `Category : ${el.category}`;

    const cardPrice = document.createElement('p');
    cardPrice.textContent = `Price : $${el.price}`; 

    card.appendChild(cardTitle)
    card.appendChild(_img)

    productList.appendChild(card)

    container.appendChild(title)
    container.appendChild(cardDes) 
    container.appendChild(cardCategory)
    container.appendChild(cardPrice)

    productList.appendChild(container)
}  

function displaySlides() {
    identicalProductsContainer.innerHTML = ''; 
    const newArr = arr.slice(start, end) 
    newArr.every(node => identicalProductsContainer.appendChild(node)) 
}

next.addEventListener('click', (e) => {  
    e.preventDefault() 
    if(start < end && end <= arr.length ) {
        ++start 
        ++end
        displaySlides()
    }
}) 

previous.addEventListener('click', (e) => {  
    e.preventDefault() 
    if(start < end  && start > 0) {
        --start 
        --end
        displaySlides() 
    }
}) 

back_icon.onclick = () => {
    history.back()
}