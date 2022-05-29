const editor = document.querySelector(".editor");
const slider = document.querySelector("input[type=range]");
const sliderValue = document.querySelector(".slider-value > span");
const colorPicker = document.querySelector("input[type=color]");
const buttons = document.querySelectorAll("button");

function setGridItem(editorSize = 2, backgroundColor = "#f6b73c") {
  // *Update slider value
  sliderValue.textContent = `${editorSize}x${editorSize}`;
  // *Total div amount
  const divAmount = editorSize ** 2;
  // * Create grid elements
  editor.style.cssText = `
    grid-template-columns: repeat(${editorSize}, 1fr);
    grid-template-rows: repeat(${editorSize}, 1fr);
    `;

  for (let i = 0; i < divAmount; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.addEventListener(
      "click",
      // (evt) => (evt.target.style.backgroundColor = `${backgroundColor}`)
      () => {
        console.log(bgColor);
      }
    );

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

function getColorOptions(evt, button) {
  {
    setActiveButton(button);
    const classArray = [...evt.target.classList];

    switch (classArray[0]) {
      case "btn-color":
        return colorPicker.value;
        break;

      case "btn-rainbow":
        console.log(classArray[0]);
        break;
      case "btn-eraser":
        console.log(classArray[0]);
        break;
      case "btn-clear":
        console.log(classArray[0]);
        break;
      default:
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

// *Start Game with Code Mode
buttons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    optionsColor = getColorOptions(evt, button);
    setGridItem(undefined, optionsColor);
  });
});
