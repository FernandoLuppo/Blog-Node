let btnMobile = document.getElementById("bnt-mobile");
let nav = document.getElementById("nav");

function toggleMenu() {
  console.log("ola");
  nav.classList.toggle("active");
}

btnMobile.addEventListener("click", toggleMenu);
