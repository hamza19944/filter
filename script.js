let sweets = ['cake-2', 'cake-3', 'cookie-1', 'cookie-2', 'cupcake-1', 'cupcake-2', 'cupcake-3', 'donuts-1', 'donuts-2', 'donuts-3', 'sweets-1', 'sweets-2', 'sweets-3']

let sweetsObj = []
for(let i = 0; i < sweets.length; i++){
    sweetsObj.push({
        name: sweets[i],
        price: 11 + i,
        image: `images/${sweets[i]}.jpg`
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

// Get What is in The Storage 
window.addEventListener("load", ()=>{
    let theUrl;
    for(let j = 0; j < sweetsObj.length; j++){
        for (let i = 0; i < localStorage.length; i++) {
            if(sweetsObj[j].name === localStorage.key(i)){
                theUrl = sweetsObj[i].image
                let createdivFromStorage = document.createElement('div')
                createdivFromStorage.className = 'choice'
                createdivFromStorage.innerHTML = `
                        <img src="${theUrl}" alt="">
                        <div class="name-price">
                            <span>${localStorage.key(i)}</span>
                            <span class = 'price'>${localStorage.getItem(localStorage.key(i))}</span>
                        </div>
                        <i class="fa-solid fa-trash-can"></i>`
                        
                document.querySelector(".product").appendChild(createdivFromStorage)
            }
        }
    }
    let numitems = document.querySelector(".cart-shopping .num-items").innerText = localStorage.length
    let priceList = document.querySelectorAll('.side-bar .choice .name-price .price')
    changePrice(priceList)
    let icons = document.querySelectorAll('.choice i')
    IconToDelete(icons)
})


// hide and appear side-cart
let btnSideCart = document.querySelector('.cart-shopping')
let sideBar = document.querySelector(".side-bar")
let body = document.querySelector("body")

checkBoolean()

let changeBoolean = true;
let clicked = true;
function checkBoolean() {
    btnSideCart.onclick = function (){
        if (btnSideCart.contains(event.target)) {
            if(clicked){
                sideBar.style.opacity = '0.8'
                sideBar.style.zIndex = 2 
                clicked = false
            }
            else{
                sideBar.style.opacity = '0'
                sideBar.style.zIndex = -2 
                clicked = true
            }
        }
    }
}
checkBoolean()
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
        motion()
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
// change cart settings
function changeCartSettings() {
    
    // change the cart setting after filtering
    let productSideBar = sideBar.querySelector('.product')
    let totalPriceChoices = sideBar.querySelector('.sum').querySelector('span')
    
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

            // add to the localStorage
            setToStorage(sideChoices)
            // console.log(sideChoices);

            // number items  &&  select all choices
            document.querySelector('.cart-shopping .num-items').innerText = sideChoices.length
    
            // Full price
            let priceList = document.querySelectorAll('.side-bar .choice .name-price .price')

            changePrice(priceList)
        })
    })
}

// add to storage function
function setToStorage(choicesList) {
    // console.log(choicesList);
    choicesList.forEach(choice => {
        let thePrice = choice.children[1].children[1].innerText
        let theName = choice.children[1].children[0].innerText
        let setChoiceToStorage = localStorage.setItem(theName, thePrice)
    } )
}
// delete icon function
function IconToDelete(icons){
    icons.forEach((icon) => {
        icon.addEventListener("click", () => {
            if(icon.parentElement.parentElement && icon.parentElement.parentElement.querySelectorAll('.choice').length > 1){
                icon.parentElement.remove()
                let price = +document.querySelector(".cart-shopping p .price").innerText - +document.querySelector('.side-bar .price').innerText.match(/\d/g).join("")
                document.querySelector(".cart-shopping p .price").innerText = price
                document.querySelector('.side-bar .sum span').innerText = price
                document.querySelector('.cart-shopping .num-items').innerText = +document.querySelector('.cart-shopping .num-items').innerText - 1
                deleteFromStorage(icon)
            }else{
                icon.parentElement.remove()
                deleteFromStorage(icon)
                let price = 0
                document.querySelector(".cart-shopping p .price").innerText = price
                document.querySelector('.side-bar .sum span').innerText = price
                document.querySelector('.cart-shopping .num-items').innerText = 0
            }
        })
    })
}
// delete from localStorage
function deleteFromStorage(item) {
    for(let i = 0; i < localStorage.length; i++){
        if(item.parentElement.querySelector(".name-price").firstElementChild.innerText === localStorage.key(i)){
            localStorage.removeItem(localStorage.key(i))
        }
    }
}

// change total price function
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

// delete price function
function changeAndRemove(){
    document.querySelectorAll('.side-bar .product .choice').forEach(choice => {
        choice.remove()
    })
    localStorage.clear()
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
        cardImage.addEventListener("click", () => {
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

// when scroll appear the contacts-icons
window.addEventListener("scroll", () => {
    let contactsIcons = document.querySelector('.contacts-icons');
    if(window.scrollY >= 555){
        contactsIcons.style.display = 'flex'
    }
    // else{
    //     contactsIcons.style.display = 'none'
    // }
})

// filtering after typing function
let searchIcon = document.querySelector(".search i")
let filterText = document.querySelector(".search input")
function filtering (){
    // let regex = /[A-Za-z][^0-9_-]/ig
    // let checkValue = filterText.match(regex).join("")
    let divs = document.querySelectorAll(".bottom .card")
    divs.forEach(div => {
         div.remove("div")
    })
     sweetsObj.filter(sweet => {
        if(sweet.name.includes(filterText.value.trim().toLowerCase())){
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
    motion()
    hoverFunc()
    filter = []
    divs = []
}
filterText.addEventListener('keypress', function () {
    filtering()    
})
searchIcon.addEventListener('click', function(){
    filtering()    
})

// animation motion 
function motion(){
    let imageIcons = document.querySelectorAll(".bottom .card .img i")
    imageIcons.forEach(i => {
        i.addEventListener("click", () => {
            // i.style.animation = 'anime 0.3s ease'
            let bodyrect = document.body.getBoundingClientRect()
            let bodyWidth = bodyrect.width
            let bodyY = bodyrect.y
    
            let rect = i.getBoundingClientRect()
            let left = Math.floor(bodyWidth - (rect.x + 40))
            
            let top = Math.floor(-1 * (rect.y + 40)) 
            let leftToString = left.toString() + 'px'
            let topToString = top.toString() + 'px'
    
            i.animate([
                { // from
                    width: '38px',
                    height: '35px',
                    backgroundColor: 'white',
                    color: 'black',
                    transform: `translate(0%, -166%)`,
                    zIndex: 4,
                },
                { // to
                    backgroundColor: 'white',
                    color: 'black',
                    transform: `translate(${leftToString}, ${topToString}) scale(0.2)`,
                    zIndex: 4,
                    // transform: 'scale(0.2)'
                }
            ], 500);
        })
    })
}
motion()    