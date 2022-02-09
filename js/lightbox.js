export default class Lightbox {
  constructor() {
    this.createLightbox();

    this.closeLightbox();

    this.displayLightbox();

    this.loadMedia();

    this.nextMedia();
    this.previousMedia();
  }

  createLightbox() {
    //creation du html
    this.main = document.querySelector("main");
    this.div = document.createElement("div");
    this.div.tabIndex = "0";
    this.lightBoxClsBtn = document.createElement("button");
    this.closebtnIcon = document.createElement("img");
    this.prev = document.createElement("button");
    this.prevIcon = document.createElement("img");
    this.next = document.createElement("button");
    this.nextIcon = document.createElement("img");
    this.lightboxContainer = document.createElement("div");

    //ajout des classes
    this.div.classList.add("lightbox");
    this.lightBoxClsBtn.classList.add("lightbox_close_button");
    this.lightBoxClsBtn.setAttribute = ("alt", "Bouton fermer");
    this.closebtnIcon.setAttribute = ("alt", "icone fermer");
    this.prev.classList.add("previous");
    this.prev.setAttribute = ("alt", "bouton image précédente");
    this.prevIcon.setAttribute = ("alt", "icône image précédente");
    this.next.classList.add("next");
    this.next.setAttribute = ("alt", "bouton image suivante");
    this.nextIcon.setAttribute = ("alt", "icône image suivante");
    this.lightboxContainer.classList.add("lightbox_container");

    //ajout du contenu

    this.closebtnIcon.src = "medias/icones/close_lightbox_button.png";
    this.prevIcon.src = "medias/icones/left_arrow.png";
    this.nextIcon.src = "medias/icones/right_arrow.png";

    //lier les elements
    this.main.appendChild(this.div);
    this.div.appendChild(this.lightBoxClsBtn);
    this.lightBoxClsBtn.appendChild(this.closebtnIcon);
    this.div.appendChild(this.prev);
    this.prev.appendChild(this.prevIcon);
    this.div.appendChild(this.next);
    this.next.appendChild(this.nextIcon);
    this.div.appendChild(this.lightboxContainer);
  }
  // Pour fermer la lightbox
  closeLightbox() {
    this.lightBoxClsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.div.style.display = "none";

      //affiche le sticker et dropdown a la fermeture de la lightbox
      document.querySelector(".sort_menu").style.display = "flex";
      document.querySelector(".footer_sticker").style.display = "flex";
    });
    //------------------------------navigation Clavier------------------------------

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.div.style.display = "none";

        //affiche le sticker et dropdown a la fermeture de la lightbox
        document.querySelector(".sort_menu").style.display = "flex";
        document.querySelector(".footer_sticker").style.display = "flex";
      }
    });
  }

  displayLightbox() {
    const mediasSource = document.querySelectorAll(".media");
    //console.log(mediasSource);

    const loadLightbox = document.querySelector(".lightbox");
    //console.log(loadLightbox);

    mediasSource.forEach((medSrc) => {
      medSrc.addEventListener("click", (e) => {
        e.preventDefault();

        loadLightbox.style.display = "flex"; //rend active la lightbox

        // cache le sticker et le dropdown lorsque que la lightbox est ouverte
        document.querySelector(".sort_menu").style.display = "none";
        document.querySelector(".footer_sticker").style.display = "none";

        this.lightboxContainer.innerHTML = ""; //vide le container avant de charger le media

        this.loadMedia(medSrc);
        this.nextMedia();
        this.previousMedia();
      });

      //--------------------navigation clavier--------------------//
      medSrc.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          loadLightbox.style.display = "flex";

          document.querySelector(".sort_menu").style.display = "none";
          document.querySelector(".footer_sticker").style.display = "none";

          this.lightboxContainer.innerHTML = "";

          this.loadMedia(medSrc);
          this.nextMedia();
          this.previousMedia();
        }
      });
    });
  }
  loadMedia(medSrc) {
    // on verifie s'il s'agit d'une photo
    if (medSrc.src.includes(".jpg")) {
      this.media = new Image();
      this.media.src = medSrc.src;
      this.media.classList.add("photo_lightbox");
      this.media.tabIndex = 0;
      this.title = document.createElement("p");
      this.title.classList.add("media_title");
      this.title.innerHTML =
        medSrc.parentNode.nextSibling.children[0].children[0].innerHTML;
      this.lightboxContainer.innerHTML = "";
      this.lightboxContainer.appendChild(this.media);
      this.lightboxContainer.appendChild(this.title);

      // on verifie s'il s'agit d'une vidéo
    } else if (medSrc.src.includes(".mp4")) {
      this.media = document.createElement("video");
      this.media.src = medSrc.src;
      this.media.classList.add("video_lightbox");
      this.media.tabIndex = "0";
      this.media.setAttribute("controls", "controls");

      this.title = document.createElement("p");
      this.title.classList.add("media_title");
      this.title.innerHTML =
        medSrc.parentNode.nextSibling.children[0].children[0].innerHTML;
      this.lightboxContainer.innerHTML = "";
      this.lightboxContainer.appendChild(this.media);
      this.lightboxContainer.appendChild(this.title);
    }
  }

  //-----------------------next media-----------------------//
  nextMedia() {
    const mediasSource = Array.from(document.querySelectorAll(".media"));
    //console.log(mediasSource);

    const nbSlide = mediasSource.length;
    //console.log(nbSlide);

    const next = document.querySelector(".next");

    let count = 0;

    next.addEventListener("click", (e) => {
      e.preventDefault();

      if (count < nbSlide - 1) {
        count++;
      } else {
        count = 0;
      }

      this.loadMedia(mediasSource[count]);
      this.title.innerHTML =
        mediasSource[
          count
        ].parentNode.nextSibling.children[0].children[0].innerHTML;
    });
    //------------------------------navigation Clavier------------------------------

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();

        if (count < nbSlide - 1) {
          count++;
        } else {
          count = 0;
        }

        this.loadMedia(mediasSource[count]);
        this.title.innerHTML =
          mediasSource[
            count
          ].parentNode.nextSibling.children[0].children[0].innerHTML;
      }
    });
  }

  //-----------------------Previous Media-----------------------//
  previousMedia() {
    const mediasSource = document.querySelectorAll(".media");

    const nbSlide = mediasSource.length;

    let count = 0;
    const previous = document.querySelector(".previous");

    previous.addEventListener("click", (e) => {
      e.preventDefault();

      if (count > 0) {
        count--;
      } else {
        count = nbSlide - 1;
      }

      this.loadMedia(mediasSource[count]);
      this.title.innerHTML =
        mediasSource[
          count
        ].parentNode.nextSibling.children[0].children[0].innerHTML;
    });

    //------------------------------navigation Clavier------------------------------

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();

        if (count > 0) {
          count--;
        } else {
          count = nbSlide - 1;
        }

        this.loadMedia(mediasSource[count]);
        this.title.innerHTML =
          mediasSource[
            count
          ].parentNode.nextSibling.children[0].children[0].innerHTML;
      }
    });
  }
}
