// =====Toy Haven Cart page=====
document.addEventListener("DOMContentLoaded",
  function(){

    const cartItemsArea = document.getElementById("cartItems");

    const cartSubTotal = document.getElementById("cartSubTotal");

    const cartTotal = document.getElementById("cartTotal");

    const clearCartButton = document.getElementById("clear-cart");

    const checkoutButton = document.getElementById("checkoutButton");

    const cartSummary = document.querySelector(".cart-summary");

    // *Display cart*
    function displayCart(){
      const cart = getCart();

      cartItemsArea.innerHTML = "";

      // *Empty cart*
      if(cart.length === 0){
        cartItemsArea.innerHTML = `
          <section class="empty-cart">
            <img src="./Images/Icons/Cart.png" alt="Empty Cart" class="empty-state-icon">

            <h2>
              Your cart is feeling a little empty.
            </h2>

            <p>
              Browse Toy Haven and find
              something fun to add.
            </p>

            <a
              href="products.html"
              class="button-primary"
            >
              Shop Toys
            </a>
          </section>
        `;

        cartSubTotal.textContent = formatPrice(0);

        cartTotal.textContent = formatPrice(0);

        if(checkoutButton){
          checkoutButton.setAttribute("aria-disabled", "true");
        }
        return;
      }

      if(checkoutButton){
        checkoutButton.removeAttribute("aria-disabled");
      }

      let total = 0;

      cart.forEach(
        function(cartItem){
          const product = findProduct(cartItem.id);

          if(!product){return;}

          const itemSubtotal = product.price * cartItem.quantity;

          total = total + itemSubtotal;

          const item = document.createElement("article");

          item.className = "cart-item";

          item.innerHTML = `
            <img
              src="${product.image}"
              alt="${product.name}"
              class="cart-item-image"
            >

            <section class="cart-item-info">

              <h3>
                ${product.name}
              </h3>

              <p>
                ${product.category}
              </p>

              <p class="cart-item-price">
                ${formatPrice(product.price)}
                each
              </p>

              <button
                type="button"
                class="remove-item"
                data-id="${product.id}"
              >

                <img src="./Images/Icons/Delete.png" alt="Remove" class="button-icon">

                Remove

              </button>

            </section>

            <section
              class="quantity-controls"
              aria-label="Quantity for ${product.name}"
            >

              <button
                type="button"
                class="minus-btn"
                data-id="${product.id}"
                aria-label="Reduce ${product.name} quantity"
              >
                -
              </button>

              <span>
                ${cartItem.quantity}
              </span>

              <button
                type="button"
                class="plus-btn"
                data-id="${product.id}"
                aria-label="Increase ${product.name} quantity"
              > +
              </button>
            </section>

            <p class="cart-item-subtotal">

              ${formatPrice(itemSubtotal)}

            </p>

          `;

          cartItemsArea.appendChild(item);
        }
      );

      cartSubTotal.textContent = formatPrice(total);

      cartTotal.textContent = formatPrice(total);

      setupCartButtons();
    }

    // *Change Quantity*
    function changeQuantity(productId, amount){
      const cart = getCart();

      const item = cart.find(
          function(cartItem){
            return(cartItem.id === Number(productId));
          }
        );

      if(!item){
        return;}

      item.quantity = item.quantity + amount;

      // *Quantity zero means remove it*
      if(item.quantity <= 0){
        const itemPosition = cart.indexOf(item);

        cart.splice(itemPosition, 1);
      }

      saveCart(cart);

      displayCart();
    }

    // *Remove one product completely*
    function removeCartItem(productId){
      let cart = getCart();

      cart = cart.filter(
          function(item){
            return (
              item.id !== Number(productId));
          }
        );

      saveCart(cart);

      displayCart();

      showToast("Product removed from your cart.");
    }

    // *Cart button events*
    function setupCartButtons(){
      const plusButtons = document.querySelectorAll(".plus-btn");

      plusButtons.forEach(
        function(button){

          button.addEventListener("click",
            function(){
              changeQuantity(button.dataset.id, 1);
            }
          );
        }
      );

      const minusButtons = document.querySelectorAll(".minus-btn");

      minusButtons.forEach(
        function(button){

          button.addEventListener("click",
            function(){
              changeQuantity(button.dataset.id, -1);
            }
          );
        }
      );

      const removeButtons = document.querySelectorAll(".remove-item"
        );

      removeButtons.forEach(
        function(button){

          button.addEventListener("click",
            function(){

              removeCartItem(button.dataset.id);
            }
          );
        }
      );
    }

    // *Clear whole cart*
    clearCartButton.addEventListener("click",
      function(){
        const cart = getCart();

        if(cart.length === 0){
          showToast("Your cart is already empty.");
          return;
        }

        const shouldClear =window.confirm("Remove all products from your cart?");

        if(!shouldClear){
          return;}

        localStorage.removeItem(CART_KEY);

        updateHeaderCounts();

        displayCart();

        showToast("Your cart has been cleared.");
      }
    );

    // *Stop checkout if cart is empty*
    checkoutButton.addEventListener("click",
      function(event){
        if(getCart().length === 0){
          event.preventDefault();

          showToast("Add a product before going to checkout.");
        }
      }
    );

    // *Start cart page*
    displayCart();
  }
);