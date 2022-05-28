const editor = document.querySelector(".editor");
const slider = document.querySelector("input[type=range]");
const sliderValue = document.querySelector(".slider-value > span");

function changeBackgroundColor(evt, backgroundColor) {
  evt.target.style.backgroundColor = `${backgroundColor}`;
}

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

    gridItem.addEventListener("click", (evt) => {
      changeBackgroundColor(evt, backgroundColor);
    });

    editor.appendChild(gridItem);
  }
}

// *Start the game on Load widows
window.addEventListener("load", () => {
  //Must use arrow function to avoid callBk with onload event
  setGridItem();
});

// *Start Game with Slider
slider.addEventListener("change", (evt) => setGridItem(evt.target.value));
