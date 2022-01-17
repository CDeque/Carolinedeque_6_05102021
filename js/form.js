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
        photographer.push(new Form(photographer));
      }
    });
  })
  .catch((err) => {
    return Error(err);
  });

class Form {
  constructor(data) {
    this.data = data;
    //console.log(this.data);
    this.contactBtn = document.querySelector(".contact_button");
    //console.log(this.contactBtn);
    this.main = document.querySelector("main");

    this.createContactModal();
    this.addingClass();
    this.addingContent();
    this.setAttributes();
    this.linkElements();
    this.openModal();
    this.closeModal();
    this.validateForm();
  }

  // Creation de la modale contact

  createContactModal() {
    this.contactModal = document.createElement("div");
    this.content = document.createElement("div");
    this.formHeader = document.createElement("div");
    this.formTitle = document.createElement("h1");
    this.closeBtn = document.createElement("img");
    this.modalBody = document.createElement("div");
    this.form = document.createElement("form");
    this.formDataName = document.createElement("div");
    this.labelName = document.createElement("label");
    this.formDataFirst = document.createElement("div");
    this.labelFirst = document.createElement("label");
    this.formDataMail = document.createElement("div");
    this.labelMail = document.createElement("label");
    this.formDataMessage = document.createElement("div");
    this.labelMessage = document.createElement("label");
    this.inputName = document.createElement("input");
    this.errorName = document.createElement("span");
    this.inputFirstName = document.createElement("input");
    this.errorFirstName = document.createElement("span");
    this.inputEmail = document.createElement("input");
    this.errorEmail = document.createElement("span");
    this.inputMessage = document.createElement("input");
    this.errorMessage = document.createElement("span");
    this.submitBtn = document.createElement("button");
  }

  // Ajout des classes

  addingClass() {
    this.contactModal.classList.add("contact_modal");
    this.content.classList.add("content_form");
    this.formHeader.classList.add("form_header");
    this.formTitle.classList.add("form_title");
    this.closeBtn.classList.add("close_btn");

    this.modalBody.classList.add("modal_body");
    this.form.classList.add("form");
    this.formDataName.classList.add("form_data");
    this.formDataFirst.classList.add("form_data");
    this.formDataMail.classList.add("form_data");
    this.formDataMessage.classList.add("form_data");
    this.inputName.classList.add("user_lastName");
    this.errorName.classList.add("error");
    this.inputFirstName.classList.add("user_firstName");
    this.errorFirstName.classList.add("error");
    this.inputEmail.classList.add("user_email");
    this.errorEmail.classList.add("error");
    this.inputMessage.classList.add("user_message");
    this.errorMessage.classList.add("error");
    this.submitBtn.classList.add("submit_btn");
  }

  // Ajout du contenu

  addingContent() {
    this.formTitle.innerHTML = "Contactez-moi " + this.data.name;
    this.closeBtn.src = "medias/icones/close_button.png";
    this.labelName.innerHTML = "Nom";
    this.labelFirst.innerHTML = "Prénom";
    this.labelMail.innerHTML = "Email";
    this.labelMessage.innerHTML = "Message";
    this.submitBtn.innerHTML = "Envoyer";
  }

  // Ajout des attributs

  setAttributes() {
    this.closeBtn.setAttribute("alt", "Bouton pour fermer la modale");
    this.labelName.setAttribute("for", "last");
    this.labelFirst.setAttribute("for", "first");
    this.labelMail.setAttribute("for", "email");
    this.labelMessage.setAttribute("for", "message");
    this.inputName.setAttribute("id", "last");
    this.inputName.setAttribute("type", "text");
    this.inputName.setAttribute("name", "last");
    this.inputName.setAttribute("aria-label", "Champs du nom");
    this.inputFirstName.setAttribute("id", "first");
    this.inputFirstName.setAttribute("type", "text");
    this.inputFirstName.setAttribute("name", "first");
    this.inputFirstName.setAttribute("aria-label", "champs du prénom");
    this.inputEmail.setAttribute("id", "email");
    this.inputEmail.setAttribute("type", "text");
    this.inputEmail.setAttribute("name", "email");
    this.inputEmail.setAttribute("aria-label", "champs de l'adresse mail");
    this.inputMessage.setAttribute("id", "message");
    this.inputMessage.setAttribute("type", "text");
    this.inputMessage.setAttribute("rows", 5);
    this.inputMessage.setAttribute("name", "message");
    this.inputMessage.setAttribute("aria-label", "champs du message");
    this.errorName.setAttribute("id", "error_last");
    this.errorFirstName.setAttribute("id", "error_first");
    this.errorEmail.setAttribute("id", "error_email");
    this.errorMessage.setAttribute("id", "error_message");
    this.submitBtn.setAttribute("type", "submit");
    this.submitBtn.setAttribute(
      "aria-label",
      "bouton de validation du formulaire"
    );
  }

  // Lier les éléments

  linkElements() {
    this.main.appendChild(this.contactModal);
    this.contactModal.appendChild(this.content);
    this.content.appendChild(this.formHeader);
    this.formHeader.appendChild(this.formTitle);
    this.formHeader.appendChild(this.closeBtn);
    this.content.appendChild(this.form);
    this.form.appendChild(this.formDataName);
    this.formDataName.appendChild(this.labelName);
    this.formDataName.appendChild(this.inputName);
    this.formDataName.appendChild(this.errorName);
    this.form.appendChild(this.formDataFirst);
    this.formDataFirst.appendChild(this.labelFirst);
    this.formDataFirst.appendChild(this.inputFirstName);
    this.formDataFirst.appendChild(this.errorFirstName);
    this.form.appendChild(this.formDataMail);
    this.formDataMail.appendChild(this.labelMail);
    this.formDataMail.appendChild(this.inputEmail);
    this.formDataMail.appendChild(this.errorEmail);
    this.form.appendChild(this.formDataMessage);
    this.formDataMessage.appendChild(this.labelMessage);
    this.formDataMessage.appendChild(this.inputMessage);
    this.formDataMessage.appendChild(this.errorMessage);
    this.form.appendChild(this.submitBtn);
  }

  //--------------------------------------------------------------------//
  //------------------- fonctionnement du formulaire -------------------//
  //--------------------------------------------------------------------//

  // ouvre la modale lorsque l'on clique sur le bouton contactez-moi
  openModal() {
    this.contactBtn = document.querySelector(".contact_button");
    //console.log(this.contactBtn);
    this.contactModal = document.querySelector(".contact_modal");
    //console.log(this.contactModal);
    this.contactBtn.addEventListener("click", () => {
      this.contactModal.style.display = "block";
      console.log("click");
    });
  }

  // ferme la modale lorsque l'on clique sur la croix

  closeModal() {
    this.closeBtn.addEventListener("click", () => {
      this.contactModal.style.display = "none";
    });
  }

  //--------------------------------------------------------------//
  //-------------------validation du formulaire-------------------//
  //--------------------------------------------------------------//

  validateForm() {
    const form = document.querySelector("form");
    //console.log(form);

    const inputs = document.querySelectorAll("input");

    //--------------------------------------------------------------//
    //---------------------------- Regex----------------------------//
    //--------------------------------------------------------------//

    let strings = /^[a-zA-Z-]*$/;
    let checkMail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //--------------------------------------------------------------//
    //------------ fonctions last, first, mail & message -----------//
    //--------------------------------------------------------------//
    function validationLast() {
      let last = form.elements["last"];
      let error = document.getElementById("error_last");
      if (strings.test(last.value) === false || last.value.length <= 1) {
        last.classList.add("input-error");
        last.classList.remove("input-validate");
        error.innerText = "Veuillez entrer 2 caractères pour le nom. ";
        return false;
      } else {
        last.classList.remove("input-error");
        last.classList.add("input-validate");
        error.innerText = "";

        return true;
      }
    }
    function validationFirst() {
      let first = form.elements["first"];
      let error = document.getElementById("error_first");
      if (strings.test(first.value) === false || first.value.length <= 1) {
        first.classList.add("input-error");
        first.classList.remove("input-validate");
        error.innerText = "Veuillez entrer 2 caractères pour le prénom. ";
        return false;
      } else {
        first.classList.remove("input-error");
        first.classList.add("input-validate");
        error.innerText = "";

        return true;
      }
    }

    function validationEmail() {
      let email = form.elements["email"]; // je viens chercher l'id
      let error = document.getElementById("error_email");
      if (checkMail.test(email.value) === false) {
        email.classList.add("input-error");
        email.classList.remove("input-validate");
        error.innerText = "Veuillez saisir un email valide";
        return false;
      } else {
        email.classList.remove("input-error");
        email.classList.add("input-validate");
        error.innerText = "";

        return true;
      }
    }

    function validationMessage() {
      let message = form.elements["message"];
      let error = document.getElementById("error_message");
      if (strings.test(message.value) === false || message.value.length <= 1) {
        message.classList.add("input-error");
        message.classList.remove("input-validate");
        error.innerText = "Veuillez entrer un message. ";
        return false;
      } else {
        message.classList.remove("input-error");
        message.classList.add("input-validate");
        error.innerText = "";

        return true;
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        switch (e.target.id) {
          case "last":
            validationLast(e.target.value);
            break;
          case "first":
            validationFirst(e.target.value);
            break;
          case "email":
            validationEmail(e.target.value);
            break;
          case "message":
            validationMessage(e.target.value);
            break;
          default:
            null;
        }
      });
    });

    //--------------------------------------------------------------//
    //----------------------- validation form ----------------------//
    //--------------------------------------------------------------//
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validationLast() === false) {
        return false;
      } else if (validationFirst() === false) {
        return false;
      } else if (validationEmail() === false) {
        return false;
      } else if (validationMessage() === false) {
        return false;
      } else {
        //remet a zero le form
        form.reset();

        // ajout du message de validation
        let validationMessage = document.createElement("span");
        validationMessage.classList.add("validationText");
        validationMessage.textContent = "Votre message a été enregistré";
        this.form.appendChild(validationMessage);
      }
    });
  }
}
