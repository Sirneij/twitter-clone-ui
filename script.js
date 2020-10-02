// DOM elements

const mainPage = document.getElementById("main-page");
const loginPage = document.getElementById("login-page");
const middleContent = document.getElementById("middle-content");
const buttonTop = document.getElementById("btn-top");
const feedsPage = document.getElementById("feeds-page");
const loginModal = document.getElementById("login-modal");
const closeLoginModal = document.getElementById("close-modal");
const loginForm = document.getElementById("login-form");
const password = document.getElementById("userpassword");
const username = document.getElementById("username");
const loginButton = document.getElementById("login-btn");
const postModalButton = document.getElementById("post-modal-btn");
const postModalWrapper = document.querySelector(".post-modal-wrapper");
const postModal = document.getElementById("post-modal");
const closePostModal = document.querySelector("#post-modal .modal-header i");
const postModalSubmitButton = document.getElementById("post-modal-submit-btn");
const postModalInput = document.getElementById("post-modal-input");
const postModalSpan = document.getElementById("post-modal-span");
const user = document.getElementById("user");
const sideBarWrapper = document.getElementById("sidebar-wrapper");
const sideBar = document.getElementById("sidebar");
const closeSideBar = document.getElementById("close-sidebar");
/******************************************* */
/******************************************* */

// Main page

const goToLoginPage = () => {
  mainPage.style.display = "none";
  loginPage.style.display = "grid";
};

middleContent.addEventListener("click", (e) => {
  if (e.target.classList[2] === "main-btn") {
    goToLoginPage();
  }
});

buttonTop.addEventListener("click", () => {
  const userInfo = document.getElementById("user-info");
  const password = document.getElementById("password");
  if (password.value.length >= 6 && userInfo.value.length >= 4) {
    mainPage.style.display = "none";
    feedsPage.style.display = "block";
  } else {
    goToLoginPage();
    loginModal.style.display = "block";
  }
});

// Login page
closeLoginModal.addEventListener("click", () => {
  loginModal.style.display = "none";
});

password.addEventListener("input", (e) => {
  if (e.target.value.length >= 6) {
    loginButton.removeAttribute("disabled");
  } else if (e.target.value.length < 6) {
    loginButton.setAttribute("disabled", "true");
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (password.value.length >= 6 && username.value.length >= 4) {
    loginPage.style.display = "none";
    feedsPage.style.display = "block";
  }
});

// Feeds page

// post modal

postModalButton.addEventListener("click", () => {
  postModal.style.display = "block";
  //   postModalWrapper.classList.add("post-modal-wrapper-display");
  postModalWrapper.style.display = "block";
});

closePostModal.addEventListener("click", () => {
  postModal.style.display = "none";
  //   postModalWrapper.classList.remove("post-modal-wrapper-display");
  postModalWrapper.style.display = "none";
  if (postModalInput.value !== "") {
    postModalInput.value = "";
    postModalSubmitButton.setAttribute("disabled", "true");
    postModalSpan.dataset.disabled = "yes";
    postModalSpan.classList.add("disabled");
  }
});
// postModal.addEventListener("blur", () => {
//   postModal.style.display = "none";
//   postModalWrapper.style.display = "none";
// });
// postModalInput.addEventListener("keypress", (e) => {
//   if (e.target.value !== "") {
//     postModalSubmitButton.removeAttribute("disabled");
//     postModalSpan.dataset.disabled = "no";
//     postModalSpan.classList.remove("disabled");
//   } else {
//     postModalSubmitButton.setAttribute("disabled", "true");
//     postModalSpan.dataset.disabled = "yes";
//     postModalSpan.classList.add("disabled");
//   }
// });

postModalInput.addEventListener("input", (e) => {
  const postModalInputCounter = document.getElementById(
    "post-modal-input-counter"
  );
  const postModalInputExpression = document.getElementById(
    "post-modal-expression"
  );
  postModalInputCounter.innerText = e.target.value.length + "/240";
  if (e.target.value.length >= 1) {
    postModalSubmitButton.removeAttribute("disabled");
    postModalSpan.dataset.disabled = "no";
    postModalSpan.classList.remove("disabled");
  } else {
    postModalSubmitButton.setAttribute("disabled", "true");
    postModalSpan.dataset.disabled = "yes";
    postModalSpan.classList.add("disabled");
  }
  if (e.target.value.length > 240) {
    postModalInputExpression.classList.replace("fa-smile", "fa-frown");
    postModalInputExpression.classList.add("danger");
    postModalInputCounter.classList.add("danger");
    postModalInputCounter.innerText = 240 - e.target.value.length + "/240";
    postModalInput.style.borderColor = "#cc3f3f";
    postModalSubmitButton.setAttribute("disabled", "true");
    postModalSpan.dataset.disabled = "yes";
    postModalSpan.classList.add("disabled");
  } else if (e.target.value.length <= 240) {
    postModalInputExpression.classList.replace("fa-frown", "fa-smile");
    postModalInputExpression.classList.remove("danger");
    postModalInputCounter.classList.remove("danger");
    postModalInput.removeAttribute("style");
  }
});

postModalInput.addEventListener("blur", (e) => {
  if (e.target.value === "") {
    postModalSubmitButton.setAttribute("disabled", "true");
    postModalSpan.dataset.disabled = "yes";
    postModalSpan.classList.add("disabled");
  }
});

// sidebar

user.addEventListener("click", () => {
  sideBar.classList.add("sidebar-display");
  sideBarWrapper.classList.add("sidebar-wrapper-display");
});

closeSideBar.addEventListener("click", () => {
  sideBar.classList.remove("sidebar-display");
  sideBarWrapper.classList.remove("sidebar-wrapper-display");
});

// click anywhere in the browser to close modals
window.onclick = (e) => {
  if (e.target == sideBarWrapper) {
    sideBar.classList.remove("sidebar-display");
    sideBarWrapper.classList.remove("sidebar-wrapper-display");
  } else if (e.target == postModalWrapper) {
    postModal.style.display = "none";
    //   postModalWrapper.classList.remove("post-modal-wrapper-display");
    postModalWrapper.style.display = "none";
  }
};

// Dark mode
// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("theme", themeName);
  document.getElementById("theme-checkbox").checked = true;
  localStorage.setItem("themeSwitcher", "true");
  document.body.classList.add(themeName);
  sideBar.classList.add(themeName);
  postModal.classList.add(themeName);
}

function removeTheme(themeName) {
  // body...
  document.body.classList.remove(themeName);
  sideBar.classList.remove(themeName);
  postModal.classList.remove(themeName);
  localStorage.setItem("theme", "");
  document.getElementById("theme-checkbox").checked = false;
  localStorage.setItem("themeSwitcher", "false");
}
// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    removeTheme("theme-dark-1" || "theme-dark-2");
  } else {
    setTheme("theme-dark-1" || "theme-dark-2");
  }
}

const toggleThemeCheckbox = document.getElementById("theme-checkbox");

toggleThemeCheckbox.addEventListener("click", toggleTheme);
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    setTheme("theme-dark-1");
  } else {
    removeTheme("theme-dark-1");
  }
})();
