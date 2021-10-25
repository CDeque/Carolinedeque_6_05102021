// selectionner main et ajouter une section
const main = document.querySelector("main");
const section = document.createElement("section");
main.appendChild(section);

let photographersData = []; //tab photographers
const fetchPhotographers = async () => {
  await fetch("photographers.json")
    .then((response) => response.json())
    .then((data) => (photographersData = data.photographers));
  //console.log(photographersData);

  photographersData.forEach(function (photographerData) {
    //console.log(photographer);

    class Photographersdisplay {
      constructor(name, id, city, country, tags, tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tags = tags;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
      }

      // Creation HTML

      createCard() {
        const article = document.createElement("article");
        section.appendChild(article);
        article.classList.add("photographers_card");
        const link = document.createElement("a");
        link.classList.add("photographer_id");
        article.appendChild(link);
        const photographerPortrait = document.createElement("img");
        photographerPortrait.classList.add("photo_id");
        link.appendChild(photographerPortrait);
        const photographersName = document.createElement("h2");
        photographersName.classList.add("name");
        link.appendChild(photographersName);
        const location = document.createElement("p");
        link.appendChild(location);
        location.classList.add("location");
        const tagline = document.createElement("p");
        link.appendChild(tagline);
        tagline.classList.add("tagline");
        const price = document.createElement("p");
        link.appendChild(price);
        price.classList.add("price");

        // link class & data

        photographerPortrait.src =
          "/medias/Photographers_ID " + this.id + "/" + this.portrait;
        photographerPortrait.alt = this.name;
        photographersName.innerHTML = this.name;
        location.innerHTML = this.city + "," + this.country;
        tagline.innerHTMl = this.tagline;
        price.innerHTML = this.price + " €/jour";
      }
    }

    const displayPhotographer = new Photographersdisplay(photographer);
    displayPhotographer.createCard();
  });
};
fetchPhotographers();
