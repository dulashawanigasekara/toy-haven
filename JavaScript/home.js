// =====Toy Haven Home Page=====

// **Hero slider**
function setupHeroSlider(){
  const slides = document.querySelectorAll(".hero-slider > article");

  const dots = document.querySelectorAll(".dots-hero button");

  const slider = document.querySelector(".hero-slider");

  if(slides.length === 0 || dots.length === 0){
    return;}

  let currentSlide = 0;
  let sliderTimer;

  function showSlide(slideNumber){
    slides.forEach(function(slide){
      slide.classList.remove("active-slide");
    });

    dots.forEach(function(dot){
      dot.classList.remove("dot-hero-active");

      dot.classList.add("dot-hero");
    });

    slides[slideNumber]
      .classList.add("active-slide");

    dots[slideNumber]
      .classList.remove("dot-hero");

    dots[slideNumber]
      .classList.add("dot-hero-active");

    currentSlide = slideNumber;
  }

  function nextSlide(){
    let nextSlideNumber = currentSlide + 1;

    if(nextSlideNumber >= slides.length){
      nextSlideNumber = 0;
    }

    showSlide(nextSlideNumber);
  }

  function startSlider(){
    sliderTimer = setInterval(nextSlide, 4500);
  }

  function stopSlider(){
    clearInterval(sliderTimer);
  }

  dots.forEach(function(dot, index){
    dot.addEventListener("click",
      function(){
        stopSlider();
        showSlide(index);
        startSlider();
      }
    );
  });


  // *Pause while the mouse is over the banner*
  slider.addEventListener("mouseenter", stopSlider);

  slider.addEventListener("mouseleave", startSlider);

  showSlide(0);
  startSlider();
}


// **Featured product of the day**
function displayFeaturedToy(){
  const featuredArea = document.getElementById("ftrToy");

  if(!featuredArea){return;}

  const today = new Date();


  // *Create a number from today's date. A different date selects another product*
  const dateNumber =
    today.getFullYear() +
    today.getMonth() +
    today.getDate();

  const productIndex = dateNumber % products.length;

  const product = products[productIndex];

  featuredArea.innerHTML = `
    <section class="ftr-product-layout">
      <section class="ftr-product-image">
        <img
          src="${product.image}"
          alt="${product.name}"
        >
      </section>

      <section class="ftr-product-info">
        <p class="product-category">
          ${product.category}
        </p>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <p class="ftr-product-price">
          ${formatPrice(product.price)}
        </p>

        <section class="ftr-product-actions">
          <button
            type="button"
            class="button-primary"
            id="ftrAddCart"
          >

            <img src="./Images/Icons/Cart.png" alt="Add to Cart" class="button-icon">

            Add to Cart

          </button>

          <button
            type="button"
            class="button-wishlist"
            id="ftrAddWishlist"
          >

            <img src="./Images/Icons/Heart1.png" alt="Add to Wishlist" class="button-icon">

            Add to Wishlist

          </button>

        </section>

      </section>

    </section>

  `;

  document.getElementById("ftrAddCart") .addEventListener("click",
      function(){
        addToCart(product.id);
      }
    );

  document.getElementById("ftrAddWishlist") .addEventListener(
      "click",
      function(){
        addToWishlist(product.id);
      }
    );
}


// **Popular products**
function displayPopularProducts(){
  const popularArea = document.getElementById("popularProducts");

  if (!popularArea){return;}

  // *Select products from different categories instead of simply showing the first eight items.

  const popularIds = [1, 4, 7, 10, 13, 16, 2, 17];

  popularArea.innerHTML = "";

  popularIds.forEach(function(productId){
    const product = findProduct(productId);

    if (!product){return;}

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
          class="wishlist-btn home-wishlist-btn"
          data-id="${product.id}"
          aria-label="Add ${product.name} to wishlist"
        >

          <img src="./Images/Icons/Heart1.png" alt="Wishlist Button" class="wishlist-button-icon">

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
            class="button-primary home-cart-btn"
            data-id="${product.id}"
          >

            <img src="./Images/Icons/Add-cart.png" alt="Add to Cart" class="button-icon">

            Add to Cart

          </button>

          <a
            href="products.html?product=${product.id}"
            class="button"
          >
            View Details
          </a>
        </section>
      </section>
    `;
  popularArea.appendChild(card);
  });

  setupPopularProductButtons();
  updateHomeWishlistButtons();
}


// **Popular product buttons**
function setupPopularProductButtons(){
  const cartButtons = document.querySelectorAll(".home-cart-btn");

  cartButtons.forEach(function(button){
    button.addEventListener("click",
      function(){
        addToCart(
          button.dataset.id);
      }
    );
  });

  const wishlistButtons = document.querySelectorAll(".home-wishlist-btn");

  wishlistButtons.forEach(
    function(button){

      button.addEventListener("click",
        function(){
          addToWishlist(
            button.dataset.id
          );

          updateHomeWishlistButtons();
        }
      );
    }
  );
}


// **Show saved hearts on Home page**
function updateHomeWishlistButtons(){
  const buttons = document.querySelectorAll(".home-wishlist-btn");

  buttons.forEach(function(button){
    const saved = isInWishlist(button.dataset.id);

    if(saved){
      button.classList.add("saved");

      button.innerHTML =
        '<img src="./Images/Icons/Heart2.png" alt="Saved Wishlist Product" class="wishlist-button-icon">';

    } else {
      button.classList.remove("saved");

      button.innerHTML =
        '<img src="./Images/Icons/Heart1.png" alt="Add to wishlist" class="wishlist-button-icon">';
    }
  });
}


// **Newsletter**
function setupNewsletter() {
  const form = document.getElementById("newsletterForm");

  const emailInput = document.getElementById("newsletterEmail");

  const errorMessage = document.getElementById("newsletterError");

  const successMessage =document.getElementById("newsletterSuccess");

  if(!form || !emailInput){return;}

  form.addEventListener("submit",
    function(event){
      event.preventDefault();

      const email = emailInput.value.trim();

      errorMessage.textContent = "";
      successMessage.textContent = "";

      if(email === ""){
        errorMessage.textContent = "Please enter your email address.";

        return;
      }

      if(!isValidEmail(email)){
        errorMessage.textContent = "Please enter a valid email address.";
        return;
      }

      const subscribers = readLocalList(NEWSLETTER_KEY);

      const alreadySubscribed = subscribers.some(function(subscriber){

        return (
          subscriber.email.toLowerCase() === email.toLowerCase());
        }
        );

      if(alreadySubscribed){
        errorMessage.textContent = "This email is already subscribed.";
        return;
      }

      subscribers.push({email: email,
        subscribedAt: new Date().toISOString()
      });

      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(subscribers)
      );

      successMessage.textContent = "Thank you for joining the Toy Haven family!";

      emailInput.value = "";
    }
  );
}


// **Start Home page**
document.addEventListener( "DOMContentLoaded",
  function(){

    setupHeroSlider();
    displayFeaturedToy();
    displayPopularProducts();
    setupNewsletter();
  }
);