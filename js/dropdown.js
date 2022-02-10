import Lightbox from "./lightbox.js";

export default class Dropdown {
  constructor() {
    this.main = document.querySelector("main");
    this.section = document.querySelector(".profile_container");

    let sortedMedias = "";

    this.createDropdown();
    this.activeDropdown();
    this.sortMedia();
    this.sortMediaOnLoad();
    new Lightbox();
    this.displayMedia(sortedMedias);
  }

  //création du dropdown
  createDropdown() {
    this.sortMenu = document.createElement("div");
    this.sortMenu.classList.add("sort_menu");
    this.span = document.createElement("span");
    this.span.classList.add("sort_text");
    this.div = document.createElement("div");
    this.div.classList.add("sort_div");
    this.span.innerHTML = "Trier par";
    this.ul = document.createElement("ul");
    this.ul.classList.add("sort_container");
    this.dropdownBtn = document.createElement("button");
    this.dropdownBtn.classList.add("dropdown_btn");
    this.dropdownBtn.setAttribute("id", "popularité");
    this.dropdownBtn.innerHTML = "Popularité";
    this.span2 = document.createElement("span");
    this.span2.classList.add("down");
    this.arrowIcon = document.createElement("img");
    this.arrowIcon.classList.add("arrow_icon");
    this.arrowIcon.alt = "flèche pour ouvrir le selecteur";
    this.arrowIcon.src = "medias/icones/arrow_dropdown.png";

    this.optionPopularity = document.createElement("li");
    this.optionPopularity.classList.add("popularity");
    this.optionPopularity.setAttribute("id", "popularité");
    this.optionPopularity.setAttribute("role", "option");
    this.optionPopularity.setAttribute("value", "popularity");
    this.optionPopularity.tabIndex = "0";
    this.optionPopularity.innerHTML = "Popularité";

    this.optionDate = document.createElement("li");
    this.optionDate.classList.add("date");
    this.optionDate.setAttribute("id", "date");
    this.optionDate.setAttribute("role", "option");
    this.optionDate.setAttribute("value", "date");
    this.optionDate.tabIndex = "0";
    this.optionDate.innerHTML = "Date";

    this.optionTitle = document.createElement("li");
    this.optionTitle.classList.add("title");
    this.optionTitle.setAttribute("id", "titre");
    this.optionTitle.setAttribute("role", "option");
    this.optionTitle.setAttribute("value", "title");
    this.optionTitle.tabIndex = "0";
    this.optionTitle.innerHTML = "Titre";

    this.section.appendChild(this.sortMenu);
    this.sortMenu.appendChild(this.span);
    this.sortMenu.appendChild(this.div);
    this.div.appendChild(this.dropdownBtn);
    this.dropdownBtn.appendChild(this.arrowIcon);
    this.div.appendChild(this.ul);
    this.ul.appendChild(this.optionPopularity);
    this.ul.appendChild(this.optionDate);
    this.ul.appendChild(this.optionTitle);
  }

  //Active le dropdown
  activeDropdown() {
    this.dropdownBtn.addEventListener("click", () => {
      this.ul.style.display = "flex";
      this.optionPopularity.style.display = "flex";
      this.optionDate.style.display = "flex";
      this.optionTitle.style.display = "flex";
    });
  }

  sortMedia() {
    const mediaGallery = Array.from(
      document.querySelectorAll(".gallery_container")
    );

    let sortedMedias = "";
    this.sectionMedia = document.querySelector(".container");

    let options = [this.optionPopularity, this.optionDate, this.optionTitle];

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        // e.preventDefault();

        //condition pour afficher le choix
        if (option.id === "popularité") {
          this.ul.style.display = "none";
          this.dropdownBtn.innerHTML = option.innerHTML;
          this.dropdownBtn.appendChild(this.arrowIcon);
        } else if (option.id === "date") {
          this.ul.style.display = "none";
          this.dropdownBtn.innerHTML = option.innerHTML;
          this.dropdownBtn.appendChild(this.arrowIcon);
        } else if (option.id === "titre") {
          this.ul.style.display = "none";
          this.dropdownBtn.innerHTML = option.innerHTML;
          this.dropdownBtn.appendChild(this.arrowIcon);
        }

        //switch pour trier les medias
        switch (e.target.id) {
          // En fonction de la popularité

          case "popularité":
            this.sectionMedia = "";
            sortedMedias = mediaGallery.sort(
              (a, b) =>
                b.children[1].children[1].children[0].innerHTML -
                a.children[1].children[1].children[0].innerHTML
            );

            break;

          //En fonction de la date
          case "date":
            this.sectionMedia = "";
            sortedMedias = mediaGallery.sort((a, b) =>
              b.children[0].children[0]
                .getAttribute("date")
                .localeCompare(a.children[0].children[0].getAttribute("date"))
            );

            break;

          // En fonction du titre

          case "titre":
            this.sectionMedia = "";
            sortedMedias = mediaGallery.sort((a, b) =>
              a.children[1].children[0].children[0].innerHTML.localeCompare(
                b.children[1].children[0].children[0].innerHTML
              )
            );

            break;

          default:
            break;
        }
        this.displayMedia(sortedMedias);
      });

      //------------------------------Navigation Clavier------------------------------//

      option.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          //condition pour afficher le choix lorsque sur l'on appuie sur Enter une fois l'option selectionnée au tab
          if (option.id === "popularité") {
            this.ul.style.display = "none";
            this.dropdownBtn.innerHTML = option.innerHTML;
            this.dropdownBtn.appendChild(this.arrowIcon);
          } else if (option.id === "date") {
            this.ul.style.display = "none";
            this.dropdownBtn.innerHTML = option.innerHTML;
            this.dropdownBtn.appendChild(this.arrowIcon);
          } else if (option.id === "titre") {
            this.ul.style.display = "none";
            this.dropdownBtn.innerHTML = option.innerHTML;
            this.dropdownBtn.appendChild(this.arrowIcon);
          }

          //switch pour trier les medias

          switch (e.target.id) {
            // En fonction de la popularité

            case "popularité":
              this.sectionMedia = "";
              sortedMedias = mediaGallery.sort(
                (a, b) =>
                  b.children[1].children[1].children[0].innerHTML -
                  a.children[1].children[1].children[0].innerHTML
              );
              break;

            // En fonction de la date

            case "date":
              this.sectionMedia = "";
              sortedMedias = mediaGallery.sort((a, b) =>
                b.children[0].children[0]
                  .getAttribute("date")
                  .localeCompare(a.children[0].children[0].getAttribute("date"))
              );
              break;

            //En fonction du titre

            case "titre":
              this.sectionMedia = "";
              sortedMedias = mediaGallery.sort((a, b) =>
                a.children[1].children[0].children[0].innerHTML.localeCompare(
                  b.children[1].children[0].children[0].innerHTML
                )
              );

              break;

            default:
              break;
          }
          this.displayMedia(sortedMedias);
        }
      });
    });
  }

  // Pour afficher les medias en fonction de la popularité au chargement de la page

  sortMediaOnLoad() {
    const mediaGallery = Array.from(
      document.querySelectorAll(".gallery_container")
    );
    let sortedMedias = "";
    this.sectionMedia = document.querySelector(".container");

    // tri des medias pour l'option populaire au chargement de la page
    if (this.dropdownBtn.id === "popularité") {
      document.querySelector(".container").innerHTML = "";
      sortedMedias = mediaGallery.sort(
        (a, b) =>
          b.children[1].children[1].children[0].innerHTML -
          a.children[1].children[1].children[0].innerHTML
      );
      this.displayMedia(sortedMedias);
    }
  }
  // Pour ré-injecter les media dans la gallerie enfonction du tri

  displayMedia(sortedMedias) {
    sortedMedias.forEach((element) => {
      document.querySelector(".container").appendChild(element);
    });
  }
}
