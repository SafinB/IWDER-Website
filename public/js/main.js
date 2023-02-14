window.addEventListener('scroll', reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++){

        var windowhoogte = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowhoogte - revealpoint){
            reveals[i].classList.add('active');
        } else{
            reveals[i].classList.remove('active');
        }
    }
}

const body = document.querySelector('body');
if(body.classList.contains('informatie2')) {

    let cartIcoon = document.querySelector("#cart-icoon");
    let cart = document.querySelector(".cart");
    let cartSluiten = document.querySelector("#cart-sluiten");

    cartIcoon.onclick = () => {
        cart.classList.add("Active")
    }

    cartSluiten.onclick = () => {
        cart.classList.remove('Active')
    }

    if(document.readyState == 'loading'){
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        ready();
    }
            
    function ready(){
        var verwijderCartKnoppen = document.getElementsByClassName("item-verwijderen");
        console.log(verwijderCartKnoppen);
        for (var i = 0; i < verwijderCartKnoppen.length; i++) {
            var button = verwijderCartKnoppen[i];
            button.addEventListener("click", verwijderCartItem);
        }
    }
        var toevoegenAanCart = document.getElementsByClassName("toevoegen")
        for (var i = 0; i < toevoegenAanCart.length; i++){
            var button = toevoegenAanCart[i]
            button.addEventListener("click", addCartClicked)
        }

        document.getElementsByClassName("button-buy")[0].addEventListener("click", buyButtonClicked);
    }
            
    function buyButtonClicked(){
        alert("Uw bestelling is geplaatst");
        var cartContent = document.getElementsByClassName("cart-inhoud")[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
    }

    function verwijderCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
    }

    function quantityChanged(event) {
        var input = event.target;
        if(isNaN(input.value) || input.value <= 0){
            input.value = 1;
        }
    }

    function addCartClicked(event){
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName("product-naam")[0].innerText;
        var price = shopProducts.getElementsByClassName("prijs")[0].innerText;
        var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
        addProductToCart(title, price, productImg);
    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-doos"); 
        var cartItems = document.getElementsByClassName("cart-inhoud")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-titel");
        for(var i = 0; i < cartItemsNames.length; i++){
            if (cartItemsNames[i].innerText == title) {
                return;
            }
        }
                
    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                            <div class="details">
                                <div class="cart-product-titel">${title}</div>
                                <div class="cart-prijs">${price}</div>
                            </div>
                        <i class="fa-solid fa-trash item-verwijderen"></i> `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
    .getElementsByClassName("item-verwijderen")[0]
    .addEventListener("click", verwijderCartItem);

}