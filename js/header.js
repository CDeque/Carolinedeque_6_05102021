//------------------------------------------------------------------
// scroll

function pageContent() {
  const nav = document.querySelector("nav");
  const linkContent = document.createElement("a");
  linkContent.href = "./index.html";
  const pageContentContainer = document.createElement("p");

  pageContentContainer.classList.add("content");
  pageContentContainer.setAttribute("id", "content");
  pageContentContainer.innerHTML = "Passer au contenu";
  nav.appendChild(linkContent);
  linkContent.appendChild(pageContentContainer);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.getElementById("content").style.display = "block";
    } else {
      document.getElementById("content").style.display = "none";
    }
    //console.log("scrolled");
  });
}
pageContent();

//-----------------------------------------------------------------
//ajout tags-nav - Header
function createHeaderNav() {
  const nav = document.querySelector("nav");
  const navContainer = document.createElement("ul");
  navContainer.classList.add("nav_container");

  const tagsCategories = [
    "portrait",
    "art",
    "fashion",
    "architecture",
    "travel",
    "sport",
    "animals",
    "events",
  ];
  tagsCategories.forEach((tag) => {
    const navTagLink = document.createElement("a");
    navTagLink.classList.add("nav_tag_link");
    navTagLink.href = "#";

    const navTags = document.createElement("li");

    navTags.innerHTML = "#" + tag;

    nav.appendChild(navContainer);
    navContainer.appendChild(navTagLink);
    navTagLink.appendChild(navTags);
  });
}
createHeaderNav();

//-----------------------------------------------------------------
// Function Affichage des photographes en fonction des tags cliqués

let selectNavTags = document.querySelectorAll("li");
console.log(selectNavTags);

selectNavTags.forEach((navTag) => {
  navTag.addEventListener("click", function () {
    selectNavTags.forEach((element) => element.classList.remove("active"));
    this.classList.add("active");

    console.log("click");
  });
});
