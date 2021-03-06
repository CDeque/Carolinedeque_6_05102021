// fetch pour recuperer la data

fetch("photographers.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    const photographers = data.photographers;
    photographers.forEach((photographer) => {
      new CreatePhotographerCard(photographer);
    });
  })
  .catch((err) => {
    return Error(err);
  });

class CreatePhotographerCard {
  constructor(data) {
    this.data = data;

    this.main = document.querySelector("main");

    this.createCard();
    this.addingClass();
    this.addingTextContent();
    this.createTags();
    this.keyboardNav();
    this.linkElements();
  }
  // Creation HTML

  createCard() {
    this.article = document.createElement("article");
    this.linkPhotographer = document.createElement("a");
    this.photographerPortrait = document.createElement("img");
    this.div = document.createElement("div");
    this.photographerName = document.createElement("h2");
    this.gps = document.createElement("p");
    this.tagline = document.createElement("p");
    this.price = document.createElement("p");
    this.tagContainer = document.createElement("ul");
  }

  //Ajout classes
  addingClass() {
    this.article.classList.add("photographers_card");
    this.article.tabIndex = "0";
    this.linkPhotographer.classList.add("photographer_id");
    this.photographerPortrait.classList.add("photo_id");
    this.div.classList.add("photographers_content");
    this.photographerName.classList.add("name");
    this.gps.classList.add("location");
    this.tagline.classList.add("tagline");
    this.price.classList.add("price");
    this.tagContainer.classList.add("tag_container");
  }

  // Ajout du contenu

  addingTextContent() {
    this.linkPhotographer.href = "photographers_page.html?id=" + this.data.id;
    this.photographerPortrait.src =
      "./medias/Photographers_ID_Photos/" + this.data.portrait;
    this.photographerPortrait.alt = "Portrait de " + this.data.name;
    this.photographerPortrait.id = this.data.id;
    this.photographerName.innerHTML = this.data.name;
    this.photographerName.setAttribute("aria-label", "Nom du photographe");
    this.gps.innerHTML = this.data.city + ", " + this.data.country;
    this.gps.setAttribute("aria-label", "Localisation du photographe");
    this.tagline.innerHTML = this.data.tagline;
    this.tagline.setAttribute("aria-label", "Citation du photographe");
    this.price.innerHTML = this.data.price + " ???/jour";
    this.price.setAttribute("aria-label", "Prix du photographe");
  }
  // Ajout des tags
  createTags() {
    this.tagAnchor = document.createElement("a");
    this.tagAnchor.classList.add("tag_anchor");
    this.tagAnchor.href = "#";
    // creation d'une boucle pour g??n??rer les tags
    this.data.tags.forEach((tag) => {
      const tagsArray = [];

      this.tagList = document.createElement("li");
      this.tagList.classList.add("tag");
      this.tagList.setAttribute("aria-label", tag);
      this.tagList.innerHTML = "#" + tag;
      this.tagList.tabIndex = "0";

      this.tagAnchor.appendChild(this.tagList);

      tagsArray.push(tag);
      //console.log(tagsArray);
    });
  }

  keyboardNav() {
    //ajout de la navigation clavier  pour atteindre la page de chaque photographes lorsque l'on presse Enter

    this.article.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        document.location.href = "photographers_page.html?id=" + this.data.id;
      }
    });
  }

  linkElements() {
    this.main.appendChild(this.article);
    this.article.appendChild(this.linkPhotographer);
    this.article.appendChild(this.div);
    this.linkPhotographer.appendChild(this.photographerPortrait);
    this.div.appendChild(this.photographerName);
    this.div.appendChild(this.gps);
    this.div.appendChild(this.tagline);
    this.div.appendChild(this.price);
    this.div.appendChild(this.tagContainer);
    this.tagContainer.appendChild(this.tagAnchor);
  }
}
