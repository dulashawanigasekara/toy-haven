// =====Toy Haven Feedback & Support Page=====
document.addEventListener("DOMContentLoaded",
  function(){
    const feedbackForm =document.getElementById("feedbackForm");

    // *FAQ*
    function setupFaq(){
      const questions = document.querySelectorAll(".faq-question");

      questions.forEach(
        function(question){
          question.addEventListener("click",
            function(){
              const currentlyOpen = question.getAttribute(
                "aria-expanded") === "true";

              // *Close the other questions first*

              questions.forEach(
                function(otherQuestion){
                  otherQuestion.setAttribute(
                    "aria-expanded",
                    "false");
                }
              );

              // *If this question was closed, open it now*
              if(!currentlyOpen){
                question.setAttribute(
                  "aria-expanded",
                  "true");
              }
            }
          );
        }
      );

    }

    // *Clear feedback errors*
    function clearFeedbackErrors(){
      const errorMessages = feedbackForm.querySelectorAll(
        ".form-error");

      errorMessages.forEach(
        function(error){
          error.textContent = "";
        }
      );

      const formFields = feedbackForm.querySelectorAll("input, textarea");

      formFields.forEach(
        function(field){
          field.classList.remove("input-error");
        }
      );
    }

    // *Show feedback error*
    function showFeedbackError(
      inputId,
      errorId,
      message
    ){

      const input = document.getElementById(inputId);

      const error = document.getElementById(errorId);

      input.classList.add("input-error");

      error.textContent = message;
    }


    // *Validate feedback*
    function validateFeedback(){
      clearFeedbackErrors();

      let formIsValid = true;

      const name = document.getElementById("feedback-name").value.trim();

      const email = document.getElementById("feedback-email").value.trim();

      const message = document.getElementById("feedbackMessage").value.trim();

      if(name.length < 2){
        showFeedbackError(
          "feedback-name",
          "feedback-name-error",
          "Please enter your name.");
        formIsValid = false;
      }

      if(!isValidEmail(email)){
        showFeedbackError(
          "feedback-email",
          "feedback-email-error",
          "Please enter a valid email address.");
        formIsValid = false;
      }

      if(message.length < 10){
        showFeedbackError(
          "feedbackMessage",
          "feedback-message-error",
          "Please write a little more about your feedback.");
        formIsValid = false;
      }

      return formIsValid;
    }

    // *Submit feedback*
    feedbackForm.addEventListener("submit",
      function(event){
        event.preventDefault();

        const successMessage = document.getElementById( "feedback-success");

        successMessage.textContent = "";

        if(!validateFeedback()){return;}

        const feedback ={
          name: document.getElementById("feedback-name").value.trim(),

          email: document.getElementById("feedback-email").value.trim(),

          message: document.getElementById("feedbackMessage").value.trim(),

          submittedAt: new Date().toISOString()
        };

        const feedbackList =readLocalList(FEEDBACK_KEY);

        feedbackList.push(feedback);

        localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackList)
        );

        feedbackForm.reset();

        successMessage.textContent =
          "Thank you! Your feedback has been received.";
      }
    );

    // *Start support page*
    setupFaq();
  }
);