const burger = document.getElementById('burger');
const navbar = document.getElementById('side-nav');

burger.addEventListener("click", () => {
  if(navbar.classList.contains("hidden")){
  navbar.classList.remove("hidden");
  }
  else{
    navbar.classList.add("hidden");
  }

})