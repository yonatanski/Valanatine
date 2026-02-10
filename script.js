(function () {
  "use strict";

  const questionEl = document.getElementById("question");
  const buttonsEl = document.getElementById("buttons");
  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const successWrapper = document.getElementById("successWrapper");
  const successGif = document.getElementById("successGif");
  const popupEl = document.getElementById("popup");
  const cardEl = document.querySelector(".card");

  let noClickCount = 0;
  let yesClickCount = 0;
  const scaleStep = 0.25;
  const baseFontSize = 16;
  const minYesWidth = 100;
  const movesBeforeSuccess = 7; /* Yes must be clicked 8 times: 7 moves then 8th click shows heart */

  function getRandomPosition() {
    const isMobile = window.innerWidth <= 480;
    const padding = isMobile ? 60 : 80;
    const minPos = padding;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    const left = minPos + Math.random() * Math.max(0, maxX - minPos * 2);
    const top = minPos + Math.random() * Math.max(0, maxY - minPos * 2);
    return { left: left + "px", top: top + "px" };
  }

  function moveYesButton() {
    btnYes.classList.add("btn-yes-running");
    var pos = getRandomPosition();
    btnYes.style.left = pos.left;
    btnYes.style.top = pos.top;
    btnYes.style.transform = "translate(-50%, -50%) scale(" + (1 + noClickCount * scaleStep) + ")";
  }

  const noMessages = ["Are you sure?", "You better say yes", "Babe please"];

  function showPopup(message) {
    popupEl.textContent = message;
    popupEl.classList.add("show");
    setTimeout(function () {
      popupEl.classList.remove("show");
    }, 1400);
  }

  function growYesButton() {
    const scale = 1 + noClickCount * scaleStep;
    var w = minYesWidth + noClickCount * 20;
    btnYes.style.minWidth = w + "px";
    btnYes.style.fontSize = (baseFontSize + noClickCount * 2) + "px";
    if (btnYes.classList.contains("btn-yes-running")) {
      btnYes.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
    } else {
      btnYes.style.transform = "scale(" + scale + ")";
    }
  }

  function handleNoClick() {
    noClickCount += 1;
    var messageIndex = Math.min(noClickCount - 1, noMessages.length - 1);
    showPopup(noMessages[messageIndex]);
    growYesButton();
  }

  function handleYesClick() {
    yesClickCount += 1;
    if (yesClickCount <= movesBeforeSuccess) {
      moveYesButton();
    } else {
      questionEl.textContent = "Yaayyyy Im happy";
      successGif.src = "https://giphy.com/embed/26BRv0ThflsHCqDrG";
      cardEl.classList.add("success");
    }
  }

  btnNo.addEventListener("click", handleNoClick);
  btnYes.addEventListener("click", handleYesClick);
})();
