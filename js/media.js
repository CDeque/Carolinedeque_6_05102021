import Dropdown from "./dropdown.js";

fetch("photographers.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    const medias = data.media;

    //pour récuperer l'id  dans l'URL
    let id = new URLSearchParams(window.location.search).get("id");

    medias.forEach((media) => {
      if (media.photographerId === parseInt(id)) {
        medias.push(new CreatePhotographerMedia(media));
      }
    });

    new Dropdown();
  })
  .catch((err) => {
    return Error(err);
  });

class CreatePhotographerMedia {
  constructor(data) {
    this.data = data;
    //console.log(this.data);

    this.main = document.querySelector("main");
    this.section = document.querySelector(".container");

    this.createGalleryElements();
    this.addingClass();
    this.addingContent();
    this.createPhotoGallery();
    this.createVideo();
    this.linkElements();
    this.incrementLikes();
    this.totalLikes();
  }

  // Création des Eléments

  createGalleryElements() {
    this.article = document.createElement("article");
    this.divMedia = document.createElement("div");
    this.divText = document.createElement("div");
    this.titleContainer = document.createElement("div");
    this.likesContainer = document.createElement("div");
    this.likesNumber = document.createElement("p");
    this.btnIcon = document.createElement("button");
    this.heartIcon = document.createElement("img");
  }

  //Ajout des Classes
  addingClass() {
    this.article.classList.add("gallery_container");
    this.divMedia.classList.add("media_container");
    this.divText.classList.add("text_container");
    this.titleContainer.classList.add("title_container");
    this.likesContainer.classList.add("likes_container");
    this.likesNumber.classList.add("likes_number");
    this.likesNumber.setAttribute("id", "likes");
    this.likesNumber.setAttribute("aria-label", "Nombre de likes");
    this.btnIcon.setAttribute("id", "btn_icon");
    this.heartIcon.classList.add("heart_icon");
    this.heartIcon.setAttribute("id", "heart");
    this.heartIcon.setAttribute("aria-label", "icone likes");
  }
  // Ajout du contenu
  addingContent() {
    this.likesNumber.innerHTML = this.data.likes;
    this.heartIcon.src = "medias/icones/heart_icon.png";
  }

  // Création de la gallerie photo/vidéo
  createPhotoGallery() {
    //utilisation  de la methode in pour aller récupérer les images et la vidéo dans le JSON

    if ("image" in this.data) {
      this.image = document.createElement("img");
      this.image.classList.add("media");
      this.image.tabIndex = "0";
      this.image.focus();
      this.image.src =
        "./medias/" + this.data.photographerId + "/" + this.data.image;
      this.image.alt = this.data.alt;
      this.image.setAttribute("date", this.data.date);
      this.image.setAttribute("id", this.data.id);

      this.title = document.createElement("h2");
      this.title.innerHTML = this.data.title;
      this.title.setAttribute("aria-label", "titre de l'image");
      this.title.classList.add("media_title");
      this.divMedia.appendChild(this.image);
      this.divText.appendChild(this.titleContainer);
      this.titleContainer.appendChild(this.title);
      this.divText.appendChild(this.likesContainer);
      this.likesContainer.appendChild(this.likesNumber);
      this.likesContainer.appendChild(this.btnIcon);
      this.btnIcon.appendChild(this.heartIcon);
    }
  }
  // Création de la vidéo
  createVideo() {
    if ("video" in this.data) {
      this.video = document.createElement("video");
      this.video.classList.add("media");
      this.video.tabIndex = "0";
      this.video.src =
        "./medias/" + this.data.photographerId + "/" + this.data.video;
      this.video.alt = this.data.alt;
      this.video.setAttribute("date", this.data.date);
      this.video.setAttribute("id", this.data.id);
      this.title = document.createElement("h2");
      this.title.classList.add("media_title");
      this.title.innerHTML = this.data.title;

      this.divMedia.appendChild(this.video);
      this.divText.appendChild(this.titleContainer);
      this.titleContainer.appendChild(this.title);
      this.divText.appendChild(this.likesContainer);
      this.likesContainer.appendChild(this.likesNumber);
      this.likesContainer.appendChild(this.btnIcon);
      this.btnIcon.appendChild(this.heartIcon);
    }
  }

  // Lier les éléments
  linkElements() {
    this.section.appendChild(this.article);
    this.article.appendChild(this.divMedia);
    this.article.appendChild(this.divText);
  }

  //incrementer les likes
  incrementLikes() {
    //On récuperer la classe des coeurs
    let heartsBtn = [this.btnIcon];

    //console.log(heartsBtn);

    heartsBtn.forEach((heart) => {
      heart.addEventListener("click", (e) => {
        e.preventDefault();

        // on recupere les nb de like
        let likesNumber = this.likesNumber.innerHTML;

        // j'ajoute un au compteur des likes lorsque je clique sur le bouton

        let number = parseInt(likesNumber) + 1;
        this.likesNumber.innerHTML = number;
        //console.log(number);
        this.totalLikesNumbers.innerHTML++; // +1 au sticker de likes
      });
    });
  }

  totalLikes() {
    this.totalLikes = 0;
    this.numbers = document.querySelectorAll("#likes");
    //console.log(numbers);
    this.numbers.forEach((number) => {
      let likesNumber = parseInt(number.innerHTML);
      this.totalLikes += likesNumber;
    });

    this.totalLikesNumbers = document.querySelector(".total_likes");
    this.totalLikesNumbers.innerHTML = this.totalLikes;
  }
}
