// fetch pour recuperer la data

fetch("photographers.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    const photographers = data.photographers;

    photographers.forEach(function (photographer) {
      new createPhotographerCard(photographer);
    });
  })
  .catch((err) => {
    return Error(err);
  });

class createPhotographerCard {
  constructor(data) {
    this.data = data;
    this.main = document.querySelector("main");
    this.createCard();
    this.addingClass();
    this.addingTextContent();
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
    this.tags = document.createElement("ul");
  }

  //Ajout classes
  addingClass() {
    this.article.classList.add("photographers_card");
    this.linkPhotographer.classList.add("photographer_id");
    this.photographerPortrait.classList.add("photo_id");
    this.div.classList.add("photographers_content");
    this.photographerName.classList.add("name");
    this.gps.classList.add("location");
    this.tagline.classList.add("tagline");
    this.price.classList.add("price");
    this.tags.classList.add("tags");
  }

  // Ajout du contenu

  addingTextContent() {
    this.linkPhotographer.href = "#";
    this.photographerPortrait.src =
      "./medias/Photographers_ID_Photos/" + this.data.portrait;
    this.photographerPortrait.alt = this.data.name;
    this.photographerPortrait.tabIndex = "0";
    this.photographerPortrait.id = this.data.id;
    this.photographerName.innerHTML = this.data.name;
    this.gps.innerHTML = this.data.city + " , " + this.data.country;
    this.tagline.innerHTML = this.data.tagline;
    this.price.innerHTML = this.data.price + " €/jour";
    this.tags.innerHTML = this.data.tags;
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
    this.div.appendChild(this.tags);
  }
}
