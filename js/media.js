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
    this.heartIcon.classList.add("heart_icon");
    this.heartIcon.setAttribute("id", "heart");
  }
  // Ajout du contenu
  addingContent() {
    this.likesNumber.innerHTML = this.data.likes;
    this.heartIcon.src = "medias/icones/heart_icon.png";
  }

  // Création de la gallerie photo
  createPhotoGallery() {
    //utilisation  de la methode in pour aller récupérer les images et la vidéo dans le JSON

    if ("image" in this.data) {
      this.a = document.createElement("a");
      this.a.href =
        "./medias/" + this.data.photographerId + "/" + this.data.image;
      this.image = document.createElement("img");
      this.image.classList.add("photo");
      this.image.src =
        "./medias/" + this.data.photographerId + "/" + this.data.image;
      this.title = document.createElement("h3");
      this.title.classList.add("photo_title");
      this.title.innerHTML = this.data.title;

      this.divMedia.appendChild(this.a);
      this.a.appendChild(this.image);
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
      this.video.classList.add("video");
      this.video.src =
        "./medias/" + this.data.photographerId + "/" + this.data.video;
      this.title = document.createElement("h3");
      this.title.classList.add("video_title");
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
    let heartsBtn = this.likesNumber.nextElementSibling.childNodes;

    //console.log(heartsBtn);

    heartsBtn.forEach((heart) => {
      heart.addEventListener("click", () => {
        //si le coeur est cliqué on ajoute la classe "liked"
        heart.classList.toggle("liked");

        // on recupere les nb de like
        let likesNumber = this.likesNumber.innerHTML;
        //console.log(likesNumber);

        // On ajoute une condition afin d'ajouter +1 au coeur contenant la classe "liked" au clic
        //et une condition afin de retirer le like lorsque le clic a nouveau sur le coeur

        if (heart.classList.contains("liked")) {
          let number = parseInt(likesNumber) + 1;
          this.likesNumber.innerHTML = number;
          //console.log(number);
        }
        if (!heart.classList.contains("liked")) {
          let number = parseInt(likesNumber) - 1;
          this.likesNumber.innerHTML = number;
          //console.log(number);
        }
      });
    });
  }
}
