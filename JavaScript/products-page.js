// =====Toy Haven Products page=====

document.addEventListener("DOMContentLoaded",
  function(){
    const productGrid = document.querySelector(".product-grid");

    const searchInput = document.getElementById("productSearch");

    const categoryFilter = document.getElementById("categoryFilter");

    const sortPrice = document.getElementById("sortPrice");

    const productCount = document.getElementById("productCount");

    const clearButton = document.querySelector(".filter-results .text-btn");

    const filterForm = document.querySelector(".search-filter");

  // Popup elements

    const popup = document.getElementById("productPopup");

    const popupCloseButton = document.getElementById("popupBtn");

    const popupImage = document.getElementById("popupProductImage");

    const popupCategory = document.getElementById("popupProductCategory");

    const popupName = document.getElementById("popupProductName");

    const popupPrice = document.getElementById("popupProductPrice");

    const popupDescription = document.getElementById("popupProductDiscription");

    const popupAddCart = document.getElementById("popupAddCart");

    const popupAddWishlist = document.getElementById("popupAddWishlist");

    let selectedProductId = null;

    // *Read Values from URL*

    function readUrlValues(){

      const urlValues = new URLSearchParams(
          window.location.search);

      const searchValue = urlValues.get("search");

      const categoryValue = urlValues.get("category");

      if(searchValue){searchInput.value = searchValue;}

      if(categoryValue){categoryFilter.value = categoryValue;

        // *If the URL category is not one of the select options, return to All Categories*

        if(categoryFilter.value === ""){
          categoryFilter.value = "All Categories";}

      }
    }

    // *Filter Products*

    function getFilteredProducts(){
      const searchText =
        searchInput
          .value
          .trim()
          .toLowerCase();

      const selectedCategory = categoryFilter.value;

      let filteredProducts = products.filter(
          function(product){
            const productName = product.name.toLowerCase();
            const matchesSearch = productName.includes(searchText);
            const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;

            return (
              matchesSearch &&
              matchesCategory
            );
          }
        );

      // Sort a copy so the original product array stays in its normal order*

      filteredProducts = filteredProducts.slice();


      if(sortPrice.value === "low"){

        filteredProducts.sort(function(first, second){
          return(first.price - second.price);
          }
        );
      }

      if(sortPrice.value === "high"){
        filteredProducts.sort(
          function(first, second){
            return(second.price - first.price);
          }
        );
      }

      return filteredProducts;
    }

    // *Display Product Cards*

    function displayProducts(){
      const filteredProducts = getFilteredProducts();

      productGrid.innerHTML = "";

      productCount.textContent = filteredProducts.length;

      if(filteredProducts.length === 0){

        productGrid.innerHTML = `
          <section class="empty-message">
            <img src="./Images/Icons/Search.png" alt="No toys found" class="empty-state-icon">

            <h2>
              No toys found
            </h2>

            <p>
              Try another product name
              or choose a different category.
            </p>

          </section>
        `;
        return;
      }

      filteredProducts.forEach(function(product){
          const card = document.createElement("article");

          card.className = "product-card";

          card.innerHTML = `

            <section class="product-card-image">

              <img
                src="${product.image}"
                alt="${product.name}"
              >

              <button
                type="button"
                class="wishlist-btn product-wishlist-btn"
                data-id="${product.id}"
                aria-label="Add ${product.name} to wishlist"
              >

                <img src="./Images/Icons/Heart1.png" alt="Wishlist products" class="wishlist-button-icon">

              </button>

              ${
                product.isNew
                  ? '<span class="product-badge">NEW</span>'
                  : ""
              }

            </section>


            <section class="product-info">

              <p class="product-category">
                ${product.category}
              </p>

              <h3>
                ${product.name}
              </h3>

              <p class="product-price">
                ${formatPrice(product.price)}
              </p>

              <section class="product-actions">

                <button
                  type="button"
                  class="button-primary add-cart-btn"
                  data-id="${product.id}"
                >

                  <img src="./Images/Icons/Add-cart.png" alt="Add to cart" class="button-icon">

                  Add to Cart

                </button>


                <button
                  type="button"
                  class="button view-details-btn"
                  data-id="${product.id}"
                >
                  View Details
                </button>

              </section>

            </section>

          `;

          productGrid.appendChild(card);
        }
      );

      setupProductButtons();
      updateWishlistHearts();
    }

    // *Product Card Buttons*
    function setupProductButtons(){
      const cartButtons = document.querySelectorAll( ".add-cart-btn");

      cartButtons.forEach(function(button){
          button.addEventListener("click",
            function(){
              addToCart(button.dataset.id);}
          );
        }
      );

      const wishlistButtons = document.querySelectorAll(".product-wishlist-btn");

      wishlistButtons.forEach(function(button){
          button.addEventListener("click",
            function(){
              addToWishlist(button.dataset.id);

              updateWishlistHearts();
            }
          );
        }
      );

      const detailButtons = document.querySelectorAll(".view-details-btn");

      detailButtons.forEach(function(button){
          button.addEventListener("click",
            function(){
              openProductPopup(button.dataset.id);
            }
          );
        }
      );
    }

    // *Saved Wishlist Hearts*

    function updateWishlistHearts(){
      const wishlistButtons = document.querySelectorAll(
          ".product-wishlist-btn");

      wishlistButtons.forEach(function(button){
          if(isInWishlist(button.dataset.id)){
            button.classList.add("saved");

            button.innerHTML =
              '<img src="./Images/Icons/Heart2.png" alt="Saved wishlist product" class="wishlist-button-icon">';
          }
          else{button.classList.remove("saved");

            button.innerHTML =
              '<img src="./Images/Icons/Heart1.png" alt="Remove wishlist product" class="wishlist-button-icon">';
          }
        }
      );
    }

    // *Open Product Popup*
    function openProductPopup(productId){
      const product = findProduct(productId);

      if(!product){return;}

      selectedProductId = product.id;

      popupImage.src = product.image;

      popupImage.alt = product.name;

      popupCategory.textContent = product.category;

      popupName.textContent = product.name;

      popupPrice.textContent = formatPrice(product.price);

      popupDescription.textContent = product.description;

      popup.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

      popupCloseButton.focus();
    }

    // *Close Product Popup*
    function closeProductPopup(){
      popup.setAttribute("aria-hidden", "true");

      document.body.style.overflow = "";

      selectedProductId = null;
    }

    // *Close using X*

    popupCloseButton.addEventListener("click", closeProductPopup);

    // *Close when clicking the dark background*
    popup.addEventListener("click",
      function(event){
        if(event.target === popup){
          closeProductPopup();
        }
      }
    );

    // *Close using Escape*
    document.addEventListener("keydown",
      function(event){
        if(
          event.key === "Escape" &&
          popup.getAttribute("aria-hidden") === "false"){
          closeProductPopup();
        }
      }
    );

    // *Popup cart button*
    popupAddCart.addEventListener("click",
      function(){
        if(selectedProductId !== null){
          addToCart(selectedProductId);
        }
      }
    );

    // *Popup wishlist button*
    popupAddWishlist.addEventListener("click",
      function(){
        if(selectedProductId !== null){
          addToWishlist(selectedProductId);

          updateWishlistHearts();
        }
      }
    );

    // *Search & Filter Events*
    searchInput.addEventListener("input", displayProducts);

    categoryFilter.addEventListener("change", displayProducts);

    sortPrice.addEventListener("change", displayProducts);

    // *Stop the filter form refreshing the page*
    filterForm.addEventListener("submit",
      function(event){
        event.preventDefault();
      }
    );

    // *Clear Filters*
    clearButton.addEventListener("click",
      function(){
        searchInput.value = "";

        categoryFilter.value = "All Categories";

        sortPrice.value = "default";

        displayProducts();
      }
    );

    // *Open Product from Home Page*
    function openProductFromUrl(){
      const urlValues = new URLSearchParams(window.location.search);

      const productId = urlValues.get("product");

      if(productId){
        openProductPopup(productId);}
    }

    // *Start Shop Page*
    readUrlValues();

    displayProducts();

    openProductFromUrl();
  }
);
