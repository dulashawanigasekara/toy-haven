// =====Toy Haven Wishlist=====
document.addEventListener("DOMContentLoaded",
  function(){
    const wishlistGrid = document.getElementById("wishlistGrid");

    // *Display wishlist*
    function displayWishlist(){
      const wishlist = getWishlist();

      wishlistGrid.innerHTML = "";

      if(wishlist.length === 0){
        wishlistGrid.innerHTML = `
          <section class="empty-wishlist">
            <img src="./Images/Icons/Heart1.png" alt="Collection empty" class="empty-state-icon">

            <h2>
              Your collection is empty.
            </h2>

            <p>
              Save the toys you love
              while browsing Toy Haven.
            </p>

            <a
              href="products.html"
              class="button-primary"
            >
              Explore Toys
            </a>

          </section>
        `;

        return;
      }

      wishlist.forEach(
        function(wishlistItem){
          const product = findProduct(wishlistItem.id);

          if(!product){return;}

          const card = document.createElement("article");

          card.className = "wishlist-card";

          card.innerHTML = `
            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <section class="wishlist-card-content">

              <p class="product-category">
                ${product.category}
              </p>

              <h3>
                ${product.name}
              </h3>

              <p class="wishlist-price">
                ${formatPrice(product.price)}
              </p>

              <label
                for="status-${product.id}"
                class="wishlist-status-label"
              >
                Collection Status
              </label>

              <select
                id="status-${product.id}"
                class="wishlist-status"
                data-id="${product.id}"
              >

                <option
                  value="Interested"
                  ${
                    wishlistItem.status === "Interested"
                      ? "selected"
                      : ""
                  }
                >
                  Interested
                </option>


                <option
                  value="Owned"
                  ${
                    wishlistItem.status === "Owned"
                      ? "selected"
                      : ""
                  }
                >
                  Owned
                </option>


                <option
                  value="Not Interested"
                  ${
                    wishlistItem.status === "Not Interested"
                      ? "selected"
                      : ""
                  }
                >
                  Not Interested
                </option>

              </select>

              <section class="wishlist-actions">

                <button
                  type="button"
                  class="button-primary wishlist-cart-btn"
                  data-id="${product.id}"
                >

                  <img src="./Images/Icons/Add-cart.png" alt="Add to cart" class="button-icon">

                  Add to Cart

                </button>

                <button
                  type="button"
                  class="button remove-wishlist-btn"
                  data-id="${product.id}"
                >

                  <img src="./Images/Icons/Delete.png" alt="Remove" class="button-icon">

                  Remove

                </button>

              </section>

            </section>
          `;

          wishlistGrid.appendChild(card);
        }
      );

      setupWishlistEvents();
    }

    // *Change wishlist status*
    function changeWishlistStatus(productId, newStatus){
      const wishlist = getWishlist();

      const item = wishlist.find(
          function(wishlistItem){
            return(wishlistItem.id === Number(productId));
          }
        );

      if(!item){return;}

      item.status = newStatus;

      saveWishlist(wishlist);

      showToast("Collection status updated.");
    }

    // *Remove from wishlist
    function removeWishlistItem(productId){
      let wishlist = getWishlist();

      wishlist = wishlist.filter(
          function(item){
            return(item.id !== Number(productId));
          }
        );

      saveWishlist(wishlist);

      displayWishlist();

      showToast("Product removed from your wishlist.");
    }

    // *Wishlist events*
    function setupWishlistEvents(){
      const statusSelectors = document.querySelectorAll(
        ".wishlist-status");

      statusSelectors.forEach(
        function(select){
          select.addEventListener("change",
            function(){
              changeWishlistStatus(
                select.dataset.id, select.value);
            }
          );
        }
      );

      const cartButtons = document.querySelectorAll(
        ".wishlist-cart-btn");

      cartButtons.forEach(
        function(button){
          button.addEventListener("click",
            function(){
              addToCart(button.dataset.id);
            }
          );
        }
      );

      const removeButtons = document.querySelectorAll(
        ".remove-wishlist-btn");

      removeButtons.forEach(
        function(button){
          button.addEventListener("click",
            function(){
              removeWishlistItem(button.dataset.id);
            }
          );
        }
      );
    }

    // *Start wishlist*
    displayWishlist();
  }
);