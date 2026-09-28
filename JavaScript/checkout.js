// =====Toy Haven Checkout Page=====
document.addEventListener("DOMContentLoaded",
  function(){

    const checkoutForm =
      document.getElementById("checkoutForm");

    const checkoutItems =
      document.getElementById("checkoutItems");

    const checkoutTotal =
      document.getElementById("checkoutTotal");

    const checkoutSuccess =
      document.getElementById("checkoutSuccess");

    const checkoutSuccessTitle =
      document.getElementById("checkoutSuccessTitle");

    const orderNumberText =
      document.getElementById("orderNumberText");

    const checkoutSummary =
      document.querySelector(".checkout-summary");

    const cardDetails =
      document.getElementById("cardDetails");

    const paymentMethods =
      document.querySelectorAll(
        'input[name="paymentMethod"]'
      );


    // *Display order summary*
    function displayOrderSummary(){

      const cart = getCart();

      checkoutItems.innerHTML = "";


      if(cart.length === 0){

        checkoutItems.innerHTML = `
          <p>
            Your cart is empty.

            <a
              href="products.html"
              class="text-link"
            >
              Browse toys
            </a>
          </p>
        `;

        checkoutTotal.textContent =
          formatPrice(0);

        return;
      }


      let total = 0;


      cart.forEach(
        function(cartItem){

          const product =
            findProduct(cartItem.id);

          if(!product){
            return;
          }


          const subtotal =
            product.price *
            cartItem.quantity;


          total =
            total + subtotal;


          const item =
            document.createElement("article");


          item.className =
            "checkout-item";


          item.innerHTML = `
            <img
              src="${product.image}"
              alt="${product.name}"
            >

            <section>

              <h3>
                ${product.name}
              </h3>

              <p>
                Qty:
                ${cartItem.quantity}
              </p>

            </section>

            <strong>
              ${formatPrice(subtotal)}
            </strong>
          `;


          checkoutItems.appendChild(item);

        }
      );


      checkoutTotal.textContent =
        formatPrice(total);

    }


    // *Clear previous errors*
    function clearCheckoutErrors(){

      const inputs =
        checkoutForm.querySelectorAll(
          "input, textarea"
        );


      inputs.forEach(
        function(input){

          input.classList.remove(
            "input-error"
          );

        }
      );


      const errors =
        checkoutForm.querySelectorAll(
          ".form-error"
        );


      errors.forEach(
        function(error){

          error.textContent = "";

        }
      );

    }


    // *Show error*
    function showCheckoutError(
      inputId,
      errorId,
      message
    ){

      const input =
        document.getElementById(inputId);

      const error =
        document.getElementById(errorId);


      if(input){

        input.classList.add(
          "input-error"
        );

      }


      if(error){

        error.textContent =
          message;

      }

    }


    // *Show or hide card details*
    paymentMethods.forEach(
      function(payment){

        payment.addEventListener(
          "change",
          function(){

            if(this.value === "Card"){

              cardDetails.classList.add(
                "show"
              );

            }
            else{

              cardDetails.classList.remove(
                "show"
              );

            }

          }
        );

      }
    );


    // *Validate checkout form*
    function validateCheckout(){

      clearCheckoutErrors();


      let formIsValid = true;


      const fullName =
        document
          .getElementById("fullName")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim();


      const phone =
        document
          .getElementById("phone")
          .value
          .trim();


      const address =
        document
          .getElementById(
            "deliveryAddress"
          )
          .value
          .trim();


      const city =
        document
          .getElementById("city")
          .value
          .trim();


      const paymentMethod =
        document.querySelector(
          'input[name="paymentMethod"]:checked'
        );


      // *Full name*
      if(fullName.length < 3){

        showCheckoutError(
          "fullName",
          "fullNameError",
          "Please enter your full name."
        );

        formIsValid = false;

      }


      // *Email*
      if(!isValidEmail(email)){

        showCheckoutError(
          "email",
          "emailError",
          "Please enter a valid email address."
        );

        formIsValid = false;

      }


      // *Sri Lankan mobile number*
      const simplePhone =
        phone.replaceAll(" ", "");


      if(
        !simplePhone.startsWith("07") ||
        simplePhone.length !== 10 ||
        isNaN(simplePhone)
      ){

        showCheckoutError(
          "phone",
          "phoneError",
          "Enter a valid 10-digit phone number such as 0712345678."
        );

        formIsValid = false;

      }


      // *Address*
      if(address.length < 8){

        showCheckoutError(
          "deliveryAddress",
          "addressError",
          "Please enter your delivery address."
        );

        formIsValid = false;

      }


      // *City*
      if(city.length < 2){

        showCheckoutError(
          "city",
          "cityError",
          "Please enter your city."
        );

        formIsValid = false;

      }


      // *Payment method*
      if(!paymentMethod){

        document
          .getElementById(
            "paymentError"
          )
          .textContent =
          "Please select a payment method.";


        formIsValid = false;

      }


      // *Card details*
      if(
        paymentMethod &&
        paymentMethod.value === "Card"
      ){

        const cardName =
          document
            .getElementById("cardName")
            .value
            .trim();


        const cardNumber =
          document
            .getElementById("cardNumber")
            .value
            .replaceAll(" ", "");


        const cardExpiry =
          document
            .getElementById("cardExpiry")
            .value
            .trim();


        const cardCvv =
          document
            .getElementById("cardCvv")
            .value
            .trim();


        // *Name on card*
        if(cardName.length < 3){

          showCheckoutError(
            "cardName",
            "cardNameError",
            "Please enter the name shown on the card."
          );

          formIsValid = false;

        }


        // *Card number*
        if(
          cardNumber.length !== 16 ||
          isNaN(cardNumber)
        ){

          showCheckoutError(
            "cardNumber",
            "cardNumberError",
            "Enter a valid 16-digit card number."
          );

          formIsValid = false;

        }


        // *Expiry date*
        if(
          cardExpiry.length !== 5 ||
          cardExpiry.charAt(2) !== "/"
        ){

          showCheckoutError(
            "cardExpiry",
            "cardExpiryError",
            "Enter the expiry date as MM/YY."
          );

          formIsValid = false;

        }
        else{

          const expiryMonth =
            Number(
              cardExpiry.substring(0, 2)
            );


          if(
            expiryMonth < 1 ||
            expiryMonth > 12
          ){

            showCheckoutError(
              "cardExpiry",
              "cardExpiryError",
              "Enter a valid expiry month."
            );

            formIsValid = false;

          }

        }


        // *CVV*
        if(
          cardCvv.length !== 3 ||
          isNaN(cardCvv)
        ){

          showCheckoutError(
            "cardCvv",
            "cardCvvError",
            "Enter a valid 3-digit CVV."
          );

          formIsValid = false;

        }

      }


      return formIsValid;

    }


    // *Calculate cart total*
    function calculateOrderTotal(){

      const cart =
        getCart();


      let total = 0;


      cart.forEach(
        function(cartItem){

          const product =
            findProduct(cartItem.id);


          if(product){

            total =
              total +
              (
                product.price *
                cartItem.quantity
              );

          }

        }
      );


      return total;

    }


    // *Create order number*
    function createOrderNumber(){

      const now =
        new Date();


      const year =
        now.getFullYear();


      const month =
        String(
          now.getMonth() + 1
        ).padStart(2, "0");


      const day =
        String(
          now.getDate()
        ).padStart(2, "0");


      const randomNumber =
        Math.floor(
          100 +
          Math.random() * 900
        );


      return(
        "TH-" +
        year +
        month +
        day +
        "-" +
        randomNumber
      );

    }


    // *Store order*
    function saveOrder(orderNumber){

      const cart =
        getCart();


      const paymentMethod =
        document.querySelector(
          'input[name="paymentMethod"]:checked'
        );


      const orderItems = [];


      cart.forEach(
        function(cartItem){

          const product =
            findProduct(cartItem.id);


          if(product){

            orderItems.push({

              id:
                product.id,

              name:
                product.name,

              price:
                product.price,

              quantity:
                cartItem.quantity

            });

          }

        }
      );


      const order = {

        orderNumber:
          orderNumber,


        fullName:
          document
            .getElementById("fullName")
            .value
            .trim(),


        email:
          document
            .getElementById("email")
            .value
            .trim(),


        phone:
          document
            .getElementById("phone")
            .value
            .trim(),


        deliveryAddress:
          document
            .getElementById(
              "deliveryAddress"
            )
            .value
            .trim(),


        city:
          document
            .getElementById("city")
            .value
            .trim(),


        paymentMethod:
          paymentMethod.value,


        items:
          orderItems,


        total:
          calculateOrderTotal(),


        orderedAt:
          new Date().toISOString()

      };


      const orders =
        readLocalList(
          ORDERS_KEY
        );


      orders.push(order);


      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
      );

    }


    // *Form submission*
    checkoutForm.addEventListener(
      "submit",
      function(event){

        event.preventDefault();


        const cart =
          getCart();


        // *Check cart*
        if(cart.length === 0){

          showToast(
            "Your cart is empty."
          );

          return;

        }


        // *Validate form*
        if(!validateCheckout()){

          return;

        }


        const orderNumber =
          createOrderNumber();


        const selectedPayment =
          document.querySelector(
            'input[name="paymentMethod"]:checked'
          );


        // *Save completed order*
        saveOrder(orderNumber);


        // *Change success message*
        if(
          selectedPayment &&
          selectedPayment.value === "Card"
        ){

          checkoutSuccessTitle
            .textContent =
            "Payment successful! Your order has been placed.";

        }
        else{

          checkoutSuccessTitle
            .textContent =
            "Your order has been placed successfully.";

        }


        // *Show order number*
        orderNumberText.textContent =
          "Order Number: " +
          orderNumber;


        // *Clear shopping cart*
        localStorage.removeItem(
          CART_KEY
        );


        // *Update header counts*
        updateHeaderCounts();


        // *Hide checkout form*
        checkoutForm.style.display =
          "none";


        // *Hide order summary*
        if(checkoutSummary){

          checkoutSummary.hidden =
            true;

        }


        // *Show success message*
        checkoutSuccess.classList.add(
          "show"
        );


        // *Move to success message*
        checkoutSuccess.scrollIntoView({

          behavior:
            "smooth",

          block:
            "center"

        });

      }
    );


    // *Start checkout page*
    displayOrderSummary();

  }
);