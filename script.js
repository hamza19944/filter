let sweets = ['cake-2', 'cake-3', 'cookie-1', 'cookie-2', 'cupcake-1', 'cupcake-2', 'cupcake-3', 'donuts-1', 'donuts-2', 'donuts-3', 'sweets-1', 'sweets-2', 'sweets-3']

let sweetsObj = []
for(let i = 0; i < sweets.length; i++){
    sweetsObj.push({
        name: sweets[i],
        price: 11 + i,
        image: `./images/${sweets[i]}.jpg`
    })
}

let card = document.querySelector(".bottom")

for(let i = 0; i < sweetsObj.length; i++){
    let div = document.createElement("div")
    div.className = 'card'
    div.innerHTML = `
            <div class="img">
                <img src="${sweetsObj[i].image}" alt="">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div class="price-card">
                <span class="name">${sweetsObj[i].name}</span>
                <span class="price">$${sweetsObj[i].price}</span>
            </div>`
    card.appendChild(div)
}

// hide and appear side-cart
let btnSideCart = document.querySelector('.cart-shopping')
let sideBar = document.querySelector(".side-bar")

btnSideCart.onclick = function (){
    if(sideBar.style.opacity === '0'){
        sideBar.style.opacity = '0.8'
        sideBar.style.zIndex = 2
    }else{
        sideBar.style.opacity = '0'
    }
}

// change the cart setting function without filter
changeCartSettings()

// select list for filter 
let list = document.querySelectorAll(".top ul li")

let filter = []
list.forEach((li) => {
    li.addEventListener('click',el => {
        let divs = document.querySelectorAll(".bottom .card")
        divs.forEach(div => {
            div.remove("div")
        })
        sweetsObj.filter(sweet => {
            if(sweet.name.includes(el.target.dataset.info)){
                filter.push(sweet);
            }else if(el.target.dataset.info === 'all'){
                filter.push(sweet);
            }
        })
        for(let i = 0; i < filter.length; i++){
            let div = document.createElement("div")
            div.className = 'card'
            div.innerHTML = `
                    <div class="img">
                        <img src="${filter[i].image}" alt="">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </div>
                    <div class="price-card">
                        <span class="name">${filter[i].name}</span>
                        <span class="price">$${filter[i].price}</span>
                    </div>`
            card.appendChild(div)
        }
        // change the cart setting function after filtering
        changeCartSettings()
        hoverFunc()
        filter = []
        divs = []
    })
})

function remove(){
    divs.forEach(div => {
        div.remove("div")
    })
}


// sandwich bar appear and disappear 
let bar = document.querySelector(".bar")
let menu = document.querySelector(".contacts-all")

bar.addEventListener('click', () => {
    if (menu.style.display === 'none') {
        menu.style.display = 'block'
        bar.classList.add("motion")
    }else{
        menu.style.display = 'none'
        bar.classList.remove("motion")
    }
})


function changeCartSettings() {
    
    // change the cart setting after filtering
    let productSideBar = sideBar.querySelector('.product')
    
    let totalPriceChoices = sideBar.querySelector('.sum').querySelector('span')
    
    //.querySelector('img').src
    let productsImgs = document.querySelectorAll('.img')
    let productsCards = document.querySelectorAll(".card")
    
    
    let result = productsCards.forEach(product => {
        let productImg = product.querySelector('img').src
        let productBuyingIcon = product.querySelector('i')
        let productsPrice = product.querySelector('.price-card .price').innerText
        let productsName = product.querySelector('.price-card .name').innerText
    
        // when click on i add the div
        productBuyingIcon.addEventListener("click", (e) => {
            // productSideBar creation
            let createNewDiv = document.createElement('div')
            createNewDiv.className = 'choice'
            createNewDiv.innerHTML = `
                <img src="${productImg}" alt="">
                <div class="name-price">
                    <span>${productsName}</span>
                    <span class = 'price'>${productsPrice}</span>
                </div>
                <i class="fa-solid fa-trash-can"></i>`   
    
    
            // append inside the side-bar
            productSideBar.appendChild(createNewDiv)
            let choiceDeleteIcons = document.querySelectorAll('.choice i')
            
            IconToDelete(choiceDeleteIcons)
    
            let sideChoices = sideBar.querySelectorAll('.choice')
            // number items  &&  select all choices
            document.querySelector('.cart-shopping .num-items').innerText = sideChoices.length
    
            // Full price
            let priceList = document.querySelectorAll('.side-bar .choice .name-price .price')

            changePrice(priceList)
        })
    })
}

function IconToDelete(icons){
    icons.forEach((icon) => {
        icon.addEventListener("click", () => {
            if(icon.parentElement.parentElement.querySelectorAll('.choice').length > 1){
                icon.parentElement.remove()
                let price = +document.querySelector(".cart-shopping p .price").innerText - +document.querySelector('.side-bar .price').innerText.match(/\d/g).join("")
                document.querySelector(".cart-shopping p .price").innerText = price
                document.querySelector('.side-bar .sum span').innerText = price
                document.querySelector('.cart-shopping .num-items').innerText = +document.querySelector('.cart-shopping .num-items').innerText - 1
            }else{
                icon.parentElement.remove()
                let price = 0
                document.querySelector(".cart-shopping p .price").innerText = price
                document.querySelector('.side-bar .sum span').innerText = price
                document.querySelector('.cart-shopping .num-items').innerText = 0
            }
        })
    })
    
}



function changePrice(priceList) {
    document.querySelector(".cart-shopping p .price").innerText = ''
    priceList.forEach(proPrice => {
        let newProPrice = 0
        let validPrice = +proPrice.innerText.match(/\d/g).join("")
        newProPrice = +document.querySelector(".cart-shopping p .price").innerText + validPrice 
        document.querySelector(".cart-shopping p .price").innerText = newProPrice
        document.querySelector('.side-bar .sum span').innerText = newProPrice
    })
}

let clearButton = document.querySelector(".side-bar .card-btns").firstElementChild
clearButton.onclick = changeAndRemove


function changeAndRemove(){
    document.querySelectorAll('.side-bar .product .choice').forEach(choice => {
        choice.remove()
    })
    document.querySelector(".cart-shopping p .price").innerText = 0
    document.querySelector('.side-bar .sum span').innerText = 0
    document.querySelector('.cart-shopping .num-items').innerText = 0
}

// bigger pic with darker background


// putting cover when on-mouseover

let covered = document.querySelector(".prod .container")
let cover = document.createElement('div')

function hoverFunc(){   
    let cardImages = document.querySelectorAll(".img img")
    cardImages.forEach((cardImage) => {
        cardImage.addEventListener("mouseover", () => {
            cover.className = 'cover'
            covered.appendChild(cover);
    
            cardImage.classList.add("hovered")
            
            // cardImage.className = 'hovered'
            // cover.appendChild(cardImage)
            
            cover.onmouseover = function(){
                cardImage.classList.remove("hovered")
                cover.classList.remove('cover')
                covered.removeChild(covered.lastElementChild);
            }
        })
    })
}

hoverFunc()