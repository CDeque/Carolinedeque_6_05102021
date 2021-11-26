fetch("photographers.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    const photographers = data.photographers;

    //pour récuperer l'id  dans l'URL
    let id = new URLSearchParams(window.location.search).get("id");

    photographers.forEach((photographer) => {
      if (photographer.id === parseInt(id)) {
        photographer.push(new CreatePhotographerPage(photographer));
      }
    });
  })
  .catch((err) => {
    return Error(err);
  });

class CreatePhotographerPage {
  constructor(data) {
    this.data = data;
    //console.log(this.data);

    this.main = document.querySelector("main");

    this.createPhotographerCard();
    this.addingClass();
    this.addingTextContent();
    this.linkElements();
  }
  // creation du HTML
  createPhotographerCard() {
    this.section = document.createElement("section");
    this.photographerName = document.createElement("h1");
    this.city = document.createElement("p");
    this.tagline = document.createElement("p");
    this.tagsContainer = document.createElement("div");
    this.contactBtn = document.createElement("button");
    this.photographerPortrait = document.createElement("img");
  }

  //Ajout des classes
  addingClass() {
    this.section.classList.add("section");
    this.photographerName.classList.add("name");
    this.city.classList.add("location");
    this.tagline.classList.add("tagline");
    this.tagsContainer.classList.add("tags_container");
    this.contactBtn.classList.add("contact_button");
    this.photographerPortrait.classList.add("photo_id");
  }

  //ajout du contenu
  addingTextContent() {
    this.photographerName.innerHTML = this.data.name;
    this.city.innerHTML = this.data.city + ", " + this.data.country;
    this.tagline.innerHTML = this.data.tagline;
    this.contactBtn.innerHtml = "Contactez-moi";
    this.photographerPortrait.src =
      "./medias/Photographers_ID_Photos/" + this.data.portrait;
    this.photographerPortrait.alt = this.data.name;
    this.photographerPortrait.tabIndex = "0";
    this.photographerPortrait.id = this.data.id;
  }

  //Lier les éléments
  linkElements() {
    this.main.appendChild(this.section);
    this.section.appendChild(this.photographerName);
    this.section.appendChild(this.city);
    this.section.appendChild(this.tagline);
    this.section.appendChild(this.tagsContainer);
    this.section.appendChild(this.contactBtn);
    this.section.appendChild(this.photographerPortrait);
  }
}
