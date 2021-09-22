/**
 * Define Global Variables
 */
let navList = document.getElementById("navbar__list");
let sections = document.querySelectorAll("section");
let headPage = document.querySelector(".page__header");
let icon = document.querySelector(".icons");
let spanIcon = document.querySelectorAll(".icons span");
let topScroll = document.querySelector(".scroll-to-top");

/**
 * End Global Variables
 */

// ---------- Build Navigation Bar ---------- //
/*
 * At first we make a "For loop" depend on section length to make nav dynamic if any section add nav upadate automatically at the end of nav
 */
for (let i = 0; i < sections.length; i++) {
  navList.insertAdjacentHTML(
    "beforeend",
    `<li><a href = "#${sections[i].getAttribute(
      "id"
    )}" class = "menu__link">${sections[i].getAttribute("data-nav")}</a></li>`
  );
}

// ---------- Dynaminc Scroll & Add Active Class To The Links & Sections ---------- //
/*
 *First we need to know location when scroll at page so we use "ScrollY"
 *Second we need to know when the the (section Start & End) so we use "offsetTop" to determine the first point of the section. And to know The end of section we add "offsetHeight" to the "offsetTop".
 */
window.onscroll = function () {
  let links = document.querySelectorAll("a");
  let scrollPostion = this.scrollY;
  for (let i = 0; i < sections.length; i++) {
    //we add (sections[i].offsetHeight * 0.5) to "if condition" to make scroll more effictive
    if (
      scrollPostion >= sections[i].offsetTop - sections[i].offsetHeight * 0.4 &&
      scrollPostion <
        sections[i].offsetTop +
          (sections[i].offsetHeight - sections[i].offsetHeight * 0.4)
    ) {
      // Here we add Activity To The Nav Link & The Section
      links[i].classList.add("active-link");
      sections[i].classList.add("your-active-class");
    } else {
      // Here we remmove Activity To The Nav Link & The Section
      links[i].classList.remove("active-link");
      sections[i].classList.remove("your-active-class");
    }
  }
  /*This function to make smooth scroll when click on the nav links.
   * First we should prevent the default of click and add the smooth scroll.
   */
  links.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      let id = e.target.getAttribute("href");
      // This to store the value of "href" to know the section should appear.
      let sec = document.querySelector(id);
      window.scroll({
        top: sec.offsetTop - headPage.offsetHeight,
        // We substarct (headPage.offsetHeight) from (sec.offsetTop) because the header of page have fixed position and we need it in our clac.
        behavior: "smooth",
      });
    });
  });
};

// ---------- Responsive Nav Bar icon ---------- //
icon.addEventListener("click", function () {
  navList.classList.toggle("active-links");
  spanIcon.forEach(function (e) {
    e.classList.toggle("show-icon");
  });
});

// ---------- Top Scroll Button ---------- //
window.addEventListener("scroll", function () {
  // Here we contorl in when the button appear & disappear.
  let scrollPostion = this.scrollY;
  if (scrollPostion > 700) {
    topScroll.classList.add("show-scroll");
  } else {
    topScroll.classList.remove("show-scroll");
  }
  // Here we make scroll to top smooth.
  topScroll.onclick = function () {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
});

// ---------- Some Features ---------- //
/*
 *When (mobile viewport) and the icon is open it just close when click on the icon so i write this code to make when any "click" or "scroll" in the window, The Icon and vertical Navbar close.
 */
window.addEventListener("click", function (e) {
  if (
    e.target.getAttribute("class") != "show-icon" &&
    e.target.getAttribute("class") != "menu__link"
  ) {
    navList.classList.remove("active-links");
    spanIcon.forEach(function (e) {
      e.classList.remove("show-icon");
    });
  }
});
window.addEventListener("scroll", function () {
  if (navList.classList.contains("active-links")) {
    navList.classList.remove("active-links");
    spanIcon.forEach(function (e) {
      e.classList.remove("show-icon");
    });
  }
});
