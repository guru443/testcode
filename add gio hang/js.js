// dong va mo card 
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");


cartIcon.addEventListener("click",() => {
    cart.classList.add("active");
});

closeCart.addEventListener("click",() => {
    cart.classList.remove("active");
});

// start 
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",start);

}else{
    start();
}

// start ============ 
function start(){
    addEvents();

}

// update ============ 
function update(){
    addEvents();
    // cập  nhật lại tổng giá 
    updateToTal();

}

// add event =========== 
function addEvents(){
    // xoas items  from cart
    let cartRemove_btns = document.querySelectorAll(".cart-remove");
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click",handle_removeCartItem);
    });

    // thay ddooir item quantity 
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change",handle_changeItemQuantity);
    });


    // nhan them vaof 
    let addCart_btns = document.querySelectorAll(".add-cart");
    addCart_btns.forEach(btn => {
        btn.addEventListener("click",handle_addCartItem);
    });

}


// =================== handle 
let itemsAdded = []

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;
    console.log(title,price,imgSrc);

    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // handle item is already  
    if (itemsAdded.find((el)  => el.title ==  newToAdd.title)){

        // alert("this Item Is Already Exist !")
        alert("mặt hàng này đã tồn tại !")
        return;
    }else{
        itemsAdded.push(newToAdd);  
    }


    // add product to cart 
    let cartBoxElement = CartBoxComponent(title,price,imgSrc);
    let newNode =  document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();

}


function handle_removeCartItem(){
    this.parentElement.remove();

    update();
}


function handle_changeItemQuantity(){
    if (isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}

// cập nhật 
function updateToTal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    const totalElement = cart.querySelector('.total-price');
    let total = 0 ;
    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });

    total= total.toFixed(2);


    totalElement.innerHTML = "$" + total;
}

// ---------------- html components 

function CartBoxComponent(title,price,imgSrc){
    return `
    <div class="cart-box">
    <img src="${imgSrc}" alt="" class="cart-img">
    <div class="detal-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <!-- xoas  cart* -->
    <i class='bx bxs-trash-alt cart-remove'></i>

    </div>`
}
