import { Lightbox } from "./lightbox.js";

export class Dropdown {
  constructor() {
    this.main = document.querySelector("main");
    this.section = document.querySelector(".profile_container");
    this.sectionMedia = document.querySelector(".container");

    let sortedMedias = "";
    this.createDropdown();
    this.activeDropdown();
    this.sortMedia();
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
    this.DropdownBtn = document.createElement("button");
    this.DropdownBtn.classList.add("dropdown_btn");
    this.DropdownBtn.innerHTML = "Popularité";
    this.span2 = document.createElement("span");
    this.span2.classList.add("down");
    this.arrowIcon = document.createElement("img");
    this.arrowIcon.classList.add("arrow_icon");
    this.arrowIcon.src = "medias/icones/arrow_dropdown.png";
    this.optionPopularity = document.createElement("li");
    this.optionPopularity.classList.add("popularity");
    this.optionPopularity.setAttribute("id", "popularité");
    this.optionPopularity.setAttribute("role", "option");
    this.optionPopularity.setAttribute("value", "popularity");
    this.optionPopularity.innerHTML = "Popularité";
    this.optionDate = document.createElement("li");
    this.optionDate.classList.add("date");
    this.optionDate.setAttribute("id", "date");
    this.optionDate.setAttribute("role", "option");
    this.optionDate.setAttribute("value", "date");
    this.optionDate.innerHTML = "Date";
    this.optionTitle = document.createElement("li");
    this.optionTitle.classList.add("title");
    this.optionTitle.setAttribute("id", "titre");
    this.optionTitle.setAttribute("role", "option");
    this.optionTitle.setAttribute("value", "title");
    this.optionTitle.innerHTML = "Titre";

    this.section.appendChild(this.sortMenu);
    this.sortMenu.appendChild(this.span);
    this.sortMenu.appendChild(this.div);
    this.div.appendChild(this.DropdownBtn);
    this.DropdownBtn.appendChild(this.arrowIcon);
    this.div.appendChild(this.ul);
    this.ul.appendChild(this.optionPopularity);
    this.ul.appendChild(this.optionDate);
    this.ul.appendChild(this.optionTitle);
  }
  //Active le dropdown
  activeDropdown() {
    this.DropdownBtn.addEventListener("click", () => {
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
    console.log(this.sectionMedia);

    let options = [this.optionPopularity, this.optionDate, this.optionTitle];

    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();

        //condition pour afficher le choix
        if (option.id === "popularité") {
          this.ul.style.display = "none";
          this.DropdownBtn.innerHTML = option.innerHTML;
          this.DropdownBtn.appendChild(this.arrowIcon);
        } else if (option.id === "date") {
          this.ul.style.display = "none";
          this.DropdownBtn.innerHTML = option.innerHTML;
          this.DropdownBtn.appendChild(this.arrowIcon);
        } else if (option.id === "titre") {
          this.ul.style.display = "none";
          this.DropdownBtn.innerHTML = option.innerHTML;
          this.DropdownBtn.appendChild(this.arrowIcon);
        }

        //switch pour trier les medias
        switch (e.target.id) {
          // En fonction de la popularité

          case "popularité":
            document.querySelector(".container").innerHTML = "";
            sortedMedias = mediaGallery.sort(
              (a, b) =>
                b.children[1].children[1].children[0].innerHTML -
                a.children[1].children[1].children[0].innerHTML
            );

            break;
          case "date":
            document.querySelector(".container").innerHTML = "";
            sortedMedias = mediaGallery.sort((a, b) =>
              b.children[0].children[0]
                .getAttribute("date")
                .localeCompare(a.children[0].children[0].getAttribute("date"))
            );

            break;
          case "titre":
            document.querySelector(".container").innerHTML = "";
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
    });
  }
  displayMedia(sortedMedias) {
    // on ré-injecte les medias dans la section

    sortedMedias.forEach((element) => {
      document.querySelector(".container").appendChild(element);
    });
    //mise a jour le la lightbox et des likes
    new Lightbox(sortedMedias);
  }
}
