// =====Toy Haven About Page=====
document.addEventListener("DOMContentLoaded", function () {

  // *About page images*
  const aboutImages = document.querySelectorAll(".about-page-image img, .about-info-item img");

  aboutImages.forEach(function (image){

    const imageSource = image.getAttribute("src");

    if(imageSource === "" || imageSource === null){

      image.style.display = "none";
    }
  });
});