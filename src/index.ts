// ==UserScript==
// @name         Seibert Stiftung Global
// @namespace    https://programmieren.de
// @description  general purpose script for Seibert Stiftung Chromebooks
// @author       NilsGke
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/index.js
// @updateURL    https://github.com/NilsGke/seibert-stiftung-scripts/releases/latest/download/index.js
// @version      {{version}}
// ==/UserScript==

const url = window.location.href;

//change the language of code.org to german and click cookie banner and login prompt
if (/https:\/\/studio\.code\.org.+/.test(url)) {
  function getCookie(cookieName: string) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == " ") c = c.substring(1);

      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  function setCookie(
    cookieName: string,
    cookieValue: string,
    maxAgeDays: number
  ) {
    const d = new Date();
    d.setTime(d.getTime() + maxAgeDays * 24 * 60 * 60 * 1000);

    let expires = "expires=" + d.toUTCString();

    document.cookie =
      cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }

  // set language cookie
  const cookieName = "language_";
  const cookieValue = "de-DE";
  const currentLanguage = getCookie(cookieName);
  if (currentLanguage !== cookieValue) {
    console.log("setting language cookie");
    setCookie(cookieName, cookieValue, 1);
    window.location.reload();
  }

  // click cookie banner
  setTimeout(() => {
    const interval = setInterval(clickThings, 500);

    function clickThings() {
      const buttonElement = document.querySelector<HTMLButtonElement>(
        "#onetrust-close-btn-container > button"
      );
      const backDropElement = document.querySelector<HTMLButtonElement>(
        "#header_user_signin > div > div > div > div.modal-backdrop"
      );

      if (buttonElement !== null) {
        buttonElement.click();
        console.log("clicked cookie button");
      } else if (backDropElement !== null) {
        backDropElement.click();
        console.log("clicked backdrop");
      } else {
        clearInterval(interval);
        console.log("cleared interval");
      }
    }
  }, 500);
}
