// =====Toy Haven Contact Page=====
document.addEventListener("DOMContentLoaded",
  function(){
    const contactForm = document.getElementById("contactForm");

    // *Clear contact errors*
    function clearContactErrors(){
      const errors = contactForm.querySelectorAll(".form-error");

      errors.forEach(
        function(error){
          error.textContent = "";
        }
      );

      const fields = contactForm.querySelectorAll("input, textarea");

      fields.forEach(
        function(field){
          field.classList.remove("input-error");
        }
      );
    }

    // *Show contact error*
    function showContactError(
      inputId,
      errorId,
      message
    ){

      const input = document.getElementById(inputId);

      const error = document.getElementById(errorId);

      input.classList.add("input-error");

      error.textContent = message;
    }

    // *Validate contact form*
    function validateContactForm(){
      clearContactErrors();

      let formIsValid = true;

      const name = document.getElementById("contact-name").value.trim();

      const email = document.getElementById("contact-email").value.trim();

      const phone = document.getElementById("contact-phone").value.trim();

      const subject = document.getElementById("contact-subject").value.trim();

      const message = document.getElementById("contact-message").value.trim();

      if(name.length < 3){
        showContactError(
          "contact-name",
          "contact-name-error",
          "Please enter your full name."
        );
        formIsValid = false;
      }

      if(!isValidEmail(email)){
        showContactError(
          "contact-email",
          "contact-email-error",
          "Please enter a valid email address."
        );
        formIsValid = false;
      }

      const simplePhone = phone.replaceAll(" ", "");

    if(
      !simplePhone.startsWith("07") || simplePhone.length !== 10 ||
      isNaN(simplePhone)){

      showContactError(
        "contact-phone",
        "contact-phone-error",
        "Enter a valid 10-digit phone number such as 0712345678.");

      formIsValid = false;
    }

    if(subject.length < 3){
      showContactError(
        "contact-subject",
        "contact-subject-error",
        "Please enter a subject.");
      formIsValid = false;
    }

    if(message.length < 10){
      showContactError(
        "contact-message",
        "contact-message-error",
        "Please write a little more about your message.");
      formIsValid = false;
    }

    return formIsValid;
  }

  // *Submit contact form*
  contactForm.addEventListener("submit", function(event){
    event.preventDefault();

    const successMessage = document.getElementById("contact-success");

    successMessage.textContent = "";

    // *Stop if there are validation errors*
    if (!validateContactForm()) {
      return;
    }

    // *Create contact message bject*
    const contactMessage = {
      fullName: document.getElementById("contact-name").value.trim(),

      email: document.getElementById("contact-email").value.trim(),

      phone: document.getElementById("contact-phone").value.trim(),

      subject: document.getElementById("contact-subject").value.trim(),

      message: document.getElementById("contact-message").value.trim(),

      submittedAt: new Date().toISOString()
    };

    // *Get previous contact messages*
    const contactMessages = readLocalList(CONTACT_KEY);

    // Add new message
    contactMessages.push(contactMessage);

    // *Save to local storage*
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contactMessages)
    );

    // *Clear the form*
    contactForm.reset();

    // *Show success message*
    successMessage.textContent =
      "Thank you! Your message has been sent to Toy Haven.";
  });
});