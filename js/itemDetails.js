const urlParams = new URLSearchParams(window.location.search)
const productList = document.getElementById('product-list')

const info = urlParams.get('id').split('?'); 

console.log(info[0])
//fetch data that has the same id as the query do and create a card for it 
fetch('../data.json')
        .then(response => response.json())
        .then(data => { 
            data.forEach(el => {
                el.id == info[0] ? createCardForProduct(el) : null 
                el.category == info[1] ?  imagesContainer(el) : null 
            }) 

        }) 

//create slides for similar products 
function imagesContainer (el) {
    const identicalProductsContainer = document.getElementById('similar-products') 
    const slides = document.createElement('div') 
    slides.classList.add('slides');

    let _img = document.createElement('img')
    _img.src = el.imageLink 

    slides.appendChild(_img)
    identicalProductsContainer.appendChild(slides)

}

// Create cards for products
function createCardForProduct (el) {

    const card = document.createElement('div') 
    card.classList.add('card');

    let _img = document.createElement('img')
    _img.src = el.imageLink

    let cardTitle = document.createElement('h2') 
    cardTitle.textContent = el.name 

    const container = document.createElement('div') 
    container.classList.add('container'); 

    let title = document.createElement('h5') 
    title.textContent = 'DESCRIPTIF TECHNIQUE'  

    let material = document.createElement('p') 
    material.textContent = `Material: ${el.details.material}`; 

    let cardDes = document.createElement('p') 
    cardDes.textContent = el.description 

    const cardCategory = document.createElement('p');
    cardCategory.textContent = `Category: ${el.category}`;

    const cardPrice = document.createElement('p');
    cardPrice.textContent = `Price: $${el.price}`; 

    const color = document.createElement('p');
    color.textContent = `Color: ${el.details.color}`;

    const size = document.createElement('p');
    size.textContent = `Size: ${el.details.size}`;  
    
    const style = document.createElement('p');
    style.textContent = `Style: ${el.details.style}`;

    card.appendChild(cardTitle)
    card.appendChild(_img)

    productList.appendChild(card)

    container.appendChild(title)
    container.appendChild(cardDes) 
    container.appendChild(cardCategory)
    container.appendChild(material)
    container.appendChild(color) 
    container.appendChild(size)
    container.appendChild(style) 
    container.appendChild(cardPrice)

    productList.appendChild(container)
} 