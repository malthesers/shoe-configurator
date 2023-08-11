"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  loadShoe();
});

const shoeParts = [
  "#Band",
  "#Laces",
  "#Tongue",
  "#Counter",
  "#Clippers",
  "#Stripes",
  "#Uppers",
  "#Trim",
  "#Outsole",
  "#Sole",
];

let fillColor;

async function loadShoe() {
  fetch("svg/shoe-svg-01.svg")
    .then((res) => res.text())
    .then((capSVG) => {
      document.querySelector("#shoe-container").innerHTML = capSVG;
    })
    .then(() => {
      loadCustomiser();
      loadSavedShoe();
    });
}

function loadCustomiser() {
  //Add class
  shoeParts.forEach((shoePart) => {
    const shoeElement = document.querySelector(`${shoePart}`);

    //Make grey
    shoeElement.setAttribute("fill", "#260740");

    //Add eventListeners for shoe parts
    shoeElement.addEventListener("click", paintElement);
    shoeElement.addEventListener("mouseenter", addHighlightPart);
    shoeElement.addEventListener("mouseleave", removeHighlightPart);
  });

  //Remove fill information
  document.querySelectorAll("path").forEach((path) => {
    path.setAttribute("fill", "inherent");
    path.setAttribute("fill-rule", "nonzero");
  });

  //Add eventListeners for coloring
  document.querySelectorAll(".color-button").forEach((button) => {
    button.addEventListener("click", selectColor);
  });

  //Add eventListener for saving
  document.querySelector("#save-shoe").addEventListener("click", saveShoe);
}

function paintElement() {
  this.setAttribute("fill", fillColor);
}

function addHighlightPart() {
  shoeParts.forEach((shoePart) => {
    if (`#${this.id}` !== shoePart) {
      document.querySelector(`${shoePart}`).classList.add("fade");
    }
  });
}

function removeHighlightPart() {
  shoeParts.forEach((shoePart) => {
    if (`#${this.id}` !== shoePart) {
      document.querySelector(`${shoePart}`).classList.remove("fade");
    }
  });
}

function selectColor() {
  //Show current color
  document.querySelector(".current-color").classList.remove("current-color");
  this.classList.add("current-color");

  //Set fillColor variable
  fillColor = getFillColor(this);
}

function getFillColor(button) {
  return button.getAttribute("fill");
}

function saveShoe() {
  //Save shoe colors
  shoeParts.forEach((shoePart) => {
    const shoePartColour = document
      .querySelector(`${shoePart}`)
      .getAttribute("fill");

    //Set localStorageItem
    localStorage.setItem(shoePart, shoePartColour);
  });
}

function loadSavedShoe() {
  //Check for savedShoe
  const shoeToLoad = localStorage.getItem("#Sole");

  //Only load shoe if one is saved
  if (shoeToLoad !== null) {
    shoeParts.forEach((shoePart) => {
      //Get localStorageItem
      const shoePartColour = localStorage.getItem(shoePart);
      console.log("loadingSaved");

      //Set saved color as fill
      document
        .querySelector(`${shoePart}`)
        .setAttribute("fill", shoePartColour);
    });
  }
}
