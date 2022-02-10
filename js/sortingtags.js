fetch("photographers.json")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    return Error(err);
  });

class SortingTags {
  constructor(tagEvent, filtersArray) {
    this.tag = tagEvent;
    this.tagAriaLabel = this.tag.attributes["aria-label"].value;
    this.tags = document.querySelectorAll(
      ".tag[aria-label=" + this.tagAriaLabel + "]"
    );

    this.photographersCards = document.querySelectorAll(".photographers_card");

    this.filtersArray = filtersArray;

    this.deletePhotographersCards();
    this.activeTags();
    this.displayPhotographersCards();
  }

  // Pour masquer les cartes photographes
  deletePhotographersCards() {
    for (let photographerCard of this.photographersCards) {
      photographerCard.style.display = "none";
    }
  }
  // On ajoute ou retire la class "active" sur les tags et on ajoute/retire les cartes du tableau
  activeTags() {
    for (let tag of this.tags) {
      tag.classList.toggle("active");
    }

    if (this.tag.classList.contains("active")) {
      this.tags.forEach((tag) => {
        let cardOfTag = tag.parentNode.parentNode.parentNode.parentNode;
        this.filtersArray.push(cardOfTag);
      });
    } else {
      this.tag.blur();
      this.tags.forEach((tag) => {
        let cardOfTag = tag.parentNode.parentNode.parentNode.parentNode;

        this.filtersArray.splice(this.filtersArray.indexOf(cardOfTag), 1);
      });
    }
  }
  // on masque/affiche les cartes en fonction du filterArray
  displayPhotographersCards() {
    if (this.filtersArray.length === 0) {
      for (let photographerCard of this.photographersCards) {
        photographerCard.style.display = "flex";
      }
    } else {
      for (let el of this.filtersArray) {
        el.style.display = "flex";
      }
    }
  }
}
//------- regex   afin de verifier sur l'url comporte un parametre tag -------//
let regTag = /\?tag=/i;

//fonctionnalité des tags
setTimeout(() => {
  // Si l'url n'a aucun parametre alors les tags fonctionnent normalement
  if (window.location.search == "") {
    let tagsAll = document.querySelectorAll(".tag");

    let filtersArray = [];
    for (let index = 0; index < tagsAll.length; index++) {
      let tag = tagsAll[index];
      //console.log(tag);

      // lorsque je clique sur un tag j'affiche les photographes ayant ce meme tag
      tag.addEventListener("click", (e) => {
        let tagEvent = e.target;
        console.log(tagEvent);
        new SortingTags(tagEvent, filtersArray);
      });

      // navigation Clavier
      tag.addEventListener("keydown", (e) => {
        let tagEvent = e.target;
        if (e.key === "Enter") {
          new SortingTags(tagEvent, filtersArray);
        }
      });
    }
    // Sinon sinl'url contient un parametre tag j'affiche les photographes ayant ce meme tag
  } else if (regTag.test(window.location.search)) {
    //console.log(regTag.test(window.location.search));
    let tagAriaLabel = window.location.search.replace(/\?tag=/i, "");

    let filtersArray = [];
    let tag = document.querySelector('.tag[aria-label="' + tagAriaLabel + '"]');

    new SortingTags(tag, filtersArray);
  }
}, 300);
