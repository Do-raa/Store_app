const cardsContainer = document.getElementById("cardsContainer") 
const signIn_icon = document.getElementById('sign_in') 
const signOut_icon = document.getElementById('sign_out')
const total_pg = document.getElementById('total') 



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

fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json()) 
    .then((data) => { 
        // Create card elements for each product in the cartProducts array 
        data.forEach((product) => { 
            if(product.id == JSON.parse(localStorage.getItem('id'))?.find((item)=> item.id == product.id )?.id) 
                { 
                    let quantity = JSON.parse(localStorage.getItem('id')).find((item)=> item.id == product.id ).quantity
                    createCardForProduct(product, quantity) 
                } 
        })
}) 

 // Create cards for products
    function createCardForProduct (el, quantity) { 

    let id = el.id
    let totall = el.price 
   
    cardsContainer.innerHTML += `
    <div class = "card"> 
        <h2>${el.title}</h2> 
        <p class = "close"> X </p> 
        <div class="content">
        <div>
        <img src="${el.images[0]}" alt ='img' />  
        </div>
        <div style="margin-left: 20px; padding: 10px">
        <p>Category: ${el.category.name}</p> 
        <p>Price: $${el.price}</p> 
        <p> Quantity : </p> 
        <button class ="minus" onclick ="${decrease()}"> - </button> 
        <p id="qty"> ${quantity} </p> 
        <button class ="plus" onclick ="${increase()}"> + </button> 
        <div>
        </div>
    </div>
    ` 

    
    const minusBtn = document.querySelector('.minus')
    const plusBtn = document.querySelector('.plus') 
    const closeBtn = document.querySelector('.close') 
    const card = document.querySelector('.card')
    function increase () {
    
        ++quantity && (quantity = quantity) && invoice({[id] :totall* quantity}) 
        console.log(quantity)
    }

    closeBtn.onclick = function (){  
        const myIds = JSON.parse(localStorage.getItem('id')) 
        let index = myIds.findIndex((item) => item.id == el.id)
        console.log('closed')
        if(index != -1) {
            myIds.splice( index, 1) 
            localStorage.setItem('id', JSON.stringify(myIds))
        }

        cardsContainer.removeChild(card) 
    }  

    invoice({[id]: totall})
} 

function decrease (quantity, totall, id){ 
    quantity > 0 ? --quantity && (quantity = quantity) && invoice({[id] :totall* quantity}) : null
    quantity == 0 ? (qty.textContent = quantity) : null
} 

 
 let arr = []
 let sum 
function invoice(obj) {  
    console.log(obj)
    let objToUpdate
    let index
   

    if(arr.length != 0 && obj != (undefined || null)) {

        objToUpdate = arr.find(object => object != (undefined || null) ? Object.keys(object).toString() == Object.keys(obj).toString() : null) 
        index = arr.findIndex(item => item == objToUpdate)
    }
    else if(index != -1) {
        arr.splice(index , 1, obj)
    } else {
        arr.push(obj)
    }
    //console.log(arr)
    sum = arr.reduce((acc, obj) => {
        if (obj != (undefined || null)) {
            return acc + +Object.values(obj)
        } else {
            return acc
        }
    }, 0)
    //console.log(sum) 
    return sum
} 

total_pg.innerText = invoice()

