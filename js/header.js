//------------------------------------------------------------------
// Ajout du scroll sur la page d'accueil

function pageContent() {
  const nav = document.querySelector("nav");
  const linkContent = document.createElement("a");
  linkContent.href = "./index.html";
  const pageContentContainer = document.createElement("h3");

  pageContentContainer.classList.add("content");
  pageContentContainer.setAttribute("id", "content");
  pageContentContainer.innerHTML = "Passer au contenu";
  nav.appendChild(linkContent);
  linkContent.appendChild(pageContentContainer);

  //------------------------------------------------------------------------------//
  // passer au contenu s'affiche lorsque l'on fait defiler la page à partir de 50px

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      document.getElementById("content").style.display = "block";
    } else {
      document.getElementById("content").style.display = "none";
    }
  });
}
pageContent();

//-----------------------------------------------------------------
//ajout des tags de  navigation sur la page d'accueil

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
    navTagLink.href = "#" + tag;

    const navTags = document.createElement("li");
    navTags.classList.add("tag");
    navTags.setAttribute("aria-label", tag);
    navTags.innerHTML =
      "#" + tag.charAt(0).toUpperCase() + tag.substring(1).toLowerCase();
    navTags.tabIndex = "0";
    nav.appendChild(navContainer);
    navContainer.appendChild(navTagLink);
    navTagLink.appendChild(navTags);
  });
}
createHeaderNav();

//-----------------------------------------------------------------
