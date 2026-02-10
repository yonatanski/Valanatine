(function () {
  "use strict";

  const questionEl = document.getElementById("question");
  const buttonsEl = document.getElementById("buttons");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const fireworksEl = document.getElementById("fireworks");
  const popupEl = document.getElementById("popup");
  const cardEl = document.querySelector(".card");

  let noClickCount = 0;
  let yesClickCount = 0;
  const scaleStep = 0.25;
  const baseFontSize = 16;
  const minYesWidth = 100;
  const movesBeforeSuccess = 3;

  function getRandomPosition() {
    const padding = 80;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    const left = padding + Math.random() * Math.max(0, maxX - padding);
    const top = padding + Math.random() * Math.max(0, maxY - padding);
    return { left: left + "px", top: top + "px" };
  }

  function moveYesButton() {
    var pos = getRandomPosition();
    btnYes.style.left = pos.left;
    btnYes.style.top = pos.top;
    btnYes.style.transform = "translate(-50%, -50%) scale(" + (1 + noClickCount * scaleStep) + ")";
  }

  function showPopup() {
    popupEl.classList.add("show");
    setTimeout(function () {
      popupEl.classList.remove("show");
    }, 1200);
  }

  function growYesButton() {
    noClickCount += 1;
    const scale = 1 + noClickCount * scaleStep;
    var w = minYesWidth + noClickCount * 20;
    btnYes.style.minWidth = w + "px";
    btnYes.style.fontSize = (baseFontSize + noClickCount * 2) + "px";
    btnYes.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
  }

  function handleNoClick() {
    showPopup();
    growYesButton();
  }

  function handleYesClick() {
    yesClickCount += 1;
    if (yesClickCount <= movesBeforeSuccess) {
      moveYesButton();
    } else {
      questionEl.textContent = "Yayyyy!!! 🎉💖";
      cardEl.classList.add("success");
    }
  }

  btnNo.addEventListener("click", handleNoClick);
  btnYes.addEventListener("click", handleYesClick);
})();
