// Reusable Javascript

// **Local Storage Names**
const CART_KEY = "toyHavenCart";
const WISHLIST_KEY = "toyHavenWishlist";
const NEWSLETTER_KEY = "toyHavenNewsletter";
const ORDERS_KEY = "toyHavenOrders";
const FEEDBACK_KEY = "toyHavenFeedback";
const CONTACT_KEY = "toyHavenContactMessages";
// because user’s data needs to stay saved even after refreshing the page

// **Arrays from local storage**
// don't have to repeat JSON.parse()
function readLocalList(key){
  const savedData = localStorage.getItem(key);

  if(!savedData){
    return[];
  }

  try{
    const convertedData = JSON.parse(savedData);

    if(Array.isArray(convertedData)){
      return convertedData;
    }
    return[];
  }
  catch(error){
    console.log("Could not read saved Toy Haven data.");
    return[];
  }
}

// **Cart Functions**
function getCart(){
  return readLocalList(CART_KEY);
}

function saveCart(cart){
  localStorage.setItem(CART_KEY,
    JSON.stringify(cart)
  );

  updateHeaderCounts();
  
}

// **Wishlist Functions**
function getWishlist(){
  return readLocalList(WISHLIST_KEY);
}

function saveWishlist(wishlist){
  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist)
  );

  updateHeaderCounts();
}

// **Find products**
function findProduct(productId){
  const id = Number(productId);

  return products.find(function(product){
    return product.id === id;
  });
}

// **Product prices**
function formatPrice(price){
  return "Rs. " + Number(price).toLocaleString("en-LK");
}

// **Add product to cart**
function addToCart(productId){
  const product = findProduct(productId);

  if(!product){
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(function(item){
    return item.id === product.id;
  });

  // **increase product quantity**
  if(existingItem){
    existingItem.quantity = existingItem.quantity + 1;
  }
  else{
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart(cart);
  showToast(product.name + " added to your cart.");
}

// **Add product to Wishlist**
function addToWishlist(productId){
  const product = findProduct(productId);
  if(!product){
    return;
  }

  const wishlist = getWishlist();
  const alreadySaved = wishlist.some(function(item){
    return item.id === product.id
  });

  if(alreadySaved){
  showToast(product.name + " is already in your wishlist.");
  return;
}

wishlist.push({
  id: product.id,
  status: "Interested"
});

  saveWishlist(wishlist);
  showToast(product.name + " added to your wishlist.");
}

// **Check if product is in wishlist**
function isInWishlist(productId){
  const wishlist = getWishlist();

  return wishlist.some(function(item){
    return item.id === Number(productId);
  });
}

// **Header counts**
function updateHeaderCounts(){
  const cart = getCart();
  const wishlist = getWishlist();

  let cartQuantity = 0;
  cart.forEach(function(item){
    cartQuantity = cartQuantity + item.quantity;
  });

  const cartCounts = document.querySelectorAll(".cart-count");

  cartCounts.forEach(function(count){
    count.textContent = cartQuantity;
  });

  const wishlistCounts = document.querySelectorAll(".wishlist-count");
  wishlistCounts.forEach(function(count){
    count.textContent = wishlist.length;
  });
}

// **Message after cart**
function showToast(message){

  const oldToast = document.querySelector(".site-toast");

  if (oldToast){
    oldToast.remove();
  }

  const toast =
    document.createElement("section");

  toast.className = "site-toast";

  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(function(){
    toast.classList.add("show");
  }, 20);


  setTimeout(function(){

    toast.classList.remove("show");

    setTimeout(function(){
      toast.remove();
    }, 300);

  }, 2300);

}

// **Email validation**
function isValidEmail(email){
  const atPosition = email.indexOf("@");
  const dotPosition = email.lastIndexOf(".");

  return (
    atPosition > 0 &&
    dotPosition > atPosition + 1 &&
    dotPosition < email.length - 1
  );
}

// **Category dropdown**
function setupCategoryDropdown(){
  const categoryButton = document.querySelector(".base-nav-container > button:first-child");

  const categoryDropdown = document.getElementById("categoryDropdown");

  if (!categoryButton || !categoryDropdown){return;}

  categoryButton.addEventListener("click",
    function(event){event.stopPropagation();

      const isOpen = categoryDropdown.classList.toggle("show");

      categoryButton.setAttribute("aria-expanded", isOpen);
    }
  );

  document.addEventListener("click",
    function(event){
      if(
        !categoryDropdown.contains(event.target) &&
        event.target !== categoryButton){
        categoryDropdown.classList.remove("show");
        categoryButton.setAttribute("aria-expanded", "false");
      }
    }
  );
}

// **Mobile navigation**
function setupMobileMenu(){
  const menuButton = document.querySelector(".menu-toggle");

  const mainNavigation = document.getElementById("mainNavigation");

  if(!menuButton || !mainNavigation){
    return;
  }

  menuButton.addEventListener("click", function(){
    const isOpen = mainNavigation.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", isOpen);
  });

  // *if screen becomes large again remove mobile meu class*
  window.addEventListener("resize", function(){
    if(window.innerWidth > 900){
      mainNavigation.classList.remove("show");

      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// **Close menu with escape key**
function setupEscapeKey(){
  document.addEventListener("keydown", function(event){
    if(event.key !== "Escape"){
      return;
    }

    const categoryDropdown = document.getElementById("categoryDropdown");

    const categoryButton = document.querySelector(".base-nav-container > button:first-child");

    const mainNavigation = document.getElementById("mainNavigation");

    const menuButton = document.querySelector(".menu-toggle");

    if(categoryDropdown){
      categoryDropdown.classList.remove("show");
    }

    if(categoryButton){
      categoryButton.setAttribute("aria-expanded", "false");
    }

    if(mainNavigation){
      mainNavigation.classList.remove("show");
    }

    if(menuButton){
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}


// **Header search**
function setupHeaderSearch(){
  const searchForms = document.querySelectorAll(".header-search");

  searchForms.forEach(function(form){
    form.addEventListener("submit",
      function(event){
        event.preventDefault();

        const searchInput = form.querySelector('input[type="search"]');

        if (!searchInput){return;}

        const searchText = searchInput.value.trim();

        if (searchText === ""){
          window.location.href = "products.html";
          return;}

        window.location.href = "products.html?search=" +
          encodeURIComponent(searchText);
        }
    );
  });
}


// **Register Service Worker**
function registerServiceWorker(){
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./service-worker.js")

      .then(function(){
        console.log(
          "Toy Haven service worker registered."
        );
      })

      .catch(function(error){
        console.log(
          "Service worker registration failed:",
          error
        );
      });
  }
}

// **Start common features**
document.addEventListener("DOMContentLoaded",
  function(){
    setupCategoryDropdown();
    setupMobileMenu();
    setupEscapeKey();
    setupHeaderSearch();
    updateHeaderCounts();
    registerServiceWorker();
  }
);