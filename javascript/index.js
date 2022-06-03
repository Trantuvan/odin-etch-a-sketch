const editor = document.querySelector(".editor");
const slider = document.querySelector("input[type=range]");
const sliderValue = document.querySelector(".slider-value > span");
const colorPicker = document.querySelector("input[type=color]");
const buttons = document.querySelectorAll("button");
let currentMode = "";

function getRGBValue() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }

  return color;
}

function getColorPickerValue() {
  return colorPicker.value;
}

function removeBackgroundColor() {
  const gridItems = [...editor.children];

  gridItems.forEach(
    (gridItem) => (gridItem.style.backgroundColor = "transparent")
  );
}

function setGridItem(editorSize = 16) {
  // *Update slider value
  sliderValue.textContent = `${editorSize}x${editorSize}`;
  // *Total div amount
  const divAmount = editorSize ** 2;
  // * Create grid elements
  editor.style.cssText = `
    grid-template-columns: repeat(${editorSize}, 1fr);
    grid-template-rows: repeat(${editorSize}, 1fr);
    `;

  // *Empty old grid-item
  editor.textContent = "";

  for (let i = 0; i < divAmount; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.addEventListener("mouseover", (evt) => {
      switch (currentMode) {
        case "Rainbow":
          evt.target.style.backgroundColor = getRGBValue();
          break;

        case "Eraser":
          evt.target.style.backgroundColor = "transparent";
          break;

        case "ColorMode":
          evt.target.style.backgroundColor = getColorPickerValue();
          break;

        default:
          evt.target.style.backgroundColor = "#f6b73c";
          break;
      }
    });

    editor.appendChild(gridItem);
  }
}

function setActiveButton(element) {
  // *find parentNode of button
  const options = element.parentNode;
  const optionChildren = [...options.children];

  // *remove active class from all children of options
  optionChildren.forEach((child) => child.classList.remove("active"));
  element.classList.add("active");
}

function getModeOptions(evt, button) {
  {
    setActiveButton(button);
    const classArray = [...evt.target.classList];

    switch (classArray[0]) {
      case "btn-rainbow":
        currentMode = "Rainbow";
        break;

      case "btn-eraser":
        currentMode = "Eraser";
        break;

      case "btn-clear":
        removeBackgroundColor();
        break;

      default:
        currentMode = "ColorMode";
        break;
    }
  }
}

// *Start the game on Load widows (Default slider & color)
window.addEventListener("load", () => {
  //Must use arrow function to avoid callBk with onload event
  setGridItem();
});

// *Option mode for Slider
slider.addEventListener("change", (evt) => setGridItem(evt.target.value));

// *Option mode for color picker
colorPicker.addEventListener("change", (evt) => {
  const options = evt.target.parentNode;
  const optionsChildren = [...options.children];
  const colorModeBtn = document.querySelector(".btn-color");

  optionsChildren.forEach((child) => child.classList.remove("active"));
  colorModeBtn.classList.add("active");

  currentMode = "ColorMode";
});

// *Options Mode
buttons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    getModeOptions(evt, button);
  });
});
