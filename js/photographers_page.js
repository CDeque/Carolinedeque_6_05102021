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
    this.createTags();
    this.createFooterPageSticker();
    this.linkElements();
  }
  // creation du HTML
  createPhotographerCard() {
    this.section = document.createElement("section");
    this.section2 = document.createElement("section");
    this.article = document.createElement("article");
    this.div = document.createElement("div");
    this.photographerName = document.createElement("h1");
    this.city = document.createElement("p");
    this.tagline = document.createElement("p");
    this.tagsContainer = document.createElement("ul");
    this.contactBtn = document.querySelector("button");
    this.photographerPortrait = document.createElement("img");
  }

  //Ajout des classes
  addingClass() {
    this.section.classList.add("profile_container");
    this.section2.classList.add("container");
    this.article.classList.add("photographer_profile");
    this.div.classList.add("profile_container");
    this.photographerName.classList.add("name_profile");
    this.photographerName.setAttribute("aria-label", "Nom du photographe");
    this.city.classList.add("location_profile");
    this.city.setAttribute("aria-label", "Ville du photographe");
    this.tagline.classList.add("tagline_profile");
    this.tagline.setAttribute("aria-label", "Citation du photographe");
    this.tagsContainer.classList.add("tags_container_profile");
    this.tagsContainer.setAttribute("aria-label", "catégories du photographe");
    this.contactBtn.classList.add("contact_btn");
    this.contactBtn.setAttribute("aria-label", "bouton de contact");
    this.photographerPortrait.classList.add("photo_id_profile");
    this.photographerPortrait.setAttribute(
      "alt",
      "Photo profil du photographe"
    );
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
    this.contactBtn.innerHTML = "Contactez-moi";
  }

  // Ajout des tags
  createTags() {
    this.tagList = document.createElement("li");
    this.tagList.classList.add("tag_list");

    // je cree les differents tags sur le profil photographe
    this.data.tags.forEach((tag) => {
      const tagsArray = [];

      this.tagAnchor = document.createElement("a");
      this.tagAnchor.classList.add("profile_tag");
      this.tagAnchor.setAttribute("aria-label", tag);
      this.tagAnchor.innerHTML = "#" + tag;

      // lorsque l'on clique sur le tag d'un profil photographe,
      // on renvoit vers la page d'accueil et on filtre les photographes en fonction de leurs tags,
      //en ajoutant tag= + le tag .

      this.tagAnchor.href = "index.html?tag=" + tag;
      this.tagList.appendChild(this.tagAnchor);

      tagsArray.push(tag);
      //console.log(tagsArray);
    });
  }

  createFooterPageSticker() {
    //structure du sticker
    this.footer = document.querySelector("footer");
    this.stickerContainer = document.createElement("div");
    this.footerSticker = document.createElement("div");
    this.likesContainer = document.createElement("div");
    this.totalLikes = document.createElement("p");
    this.photographersPrice = document.createElement("p");
    this.stickerHeart = document.createElement("img");
    this.stickerContainer.classList.add("sticker_container");
    this.footerSticker.classList.add("footer_sticker");
    this.likesContainer.classList.add("likes_container");
    this.totalLikes.classList.add("total_likes");
    this.photographersPrice.classList.add("photographers_price");
    this.stickerHeart.classList.add("heart");
    this.totalLikes.innerHTML = "";
    this.stickerHeart.src = "medias/icones/heart_icon.png";
    this.stickerHeart.setAttribute("aria-label", "icone like");
    this.photographersPrice.innerHTML = this.data.price + "€/jour";

    this.footer.appendChild(this.stickerContainer);
    this.stickerContainer.appendChild(this.footerSticker);
    this.footerSticker.appendChild(this.likesContainer);
    this.likesContainer.appendChild(this.totalLikes);
    this.likesContainer.appendChild(this.stickerHeart);
    this.footerSticker.appendChild(this.photographersPrice);
  }

  //Lier les éléments
  linkElements() {
    this.main.appendChild(this.section);
    this.section.appendChild(this.article);
    this.main.appendChild(this.section2);
    this.article.appendChild(this.div);
    this.div.appendChild(this.photographerName);
    this.div.appendChild(this.city);
    this.div.appendChild(this.tagline);
    this.div.appendChild(this.tagsContainer);
    this.tagsContainer.appendChild(this.tagList);
    this.article.appendChild(this.contactBtn);
    this.article.appendChild(this.photographerPortrait);
  }
}
