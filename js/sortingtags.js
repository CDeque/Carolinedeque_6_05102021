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
  deletePhotographersCards() {
    for (let photographerCard of this.photographersCards) {
      photographerCard.style.display = "none";
    }
  }
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

  displayPhotographersCards() {
    if (this.filtersArray.length === 0) {
      for (let photographerCard of this.photographersCards) {
        photographerCard.style.display = "flex";

        //console.log((photographerCard.style.display = "flex"));
      }
    } else {
      for (let el of this.filtersArray) {
        el.style.display = "flex";
        //console.log((el.style.display = "flex"));
      }
    }
  }
}

let regTag = /\?tag=/i;

setTimeout(() => {
  if (window.location.search == "") {
    let tagsAll = document.querySelectorAll(".tag");

    let filtersArray = [];
    for (let index = 0; index < tagsAll.length; index++) {
      let tag = tagsAll[index];
      //console.log(tag);

      tag.addEventListener("click", (e) => {
        let tagEvent = e.target;
        //console.log(tagEvent);
        new SortingTags(tagEvent, filtersArray);
      });
    }
  } else if (regTag.test(window.location.search)) {
    //console.log(regTag.test(window.location.search));
    let tagAriaLabel = window.location.search.replace(/\?tag=/i, "");

    let filtersArray = [];
    let tag = document.querySelector('.tag[aria-label="' + tagAriaLabel + '"]');

    new SortingTags(tag, filtersArray);
  }
}, 300);
