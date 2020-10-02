// DOM elements
const user = document.getElementById("user");
const sidebarWrapper = document.getElementById("sidebar-wrapper");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const postModalButton = document.getElementById("post-modal-btn");
const postModalWrapper = document.querySelector(".post-modal-wrapper");
const postModal = document.getElementById("post-modal");
const closePostModal = document.getElementById("close-post-modal");
const postModalInput = document.getElementById("post-modal-input");

// sidebar
user.addEventListener("click", () => {
  sidebar.classList.add("sidebar-display");
  sidebarWrapper.classList.add("sidebar-wrapper-display");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-display");
  sidebarWrapper.classList.remove("sidebar-wrapper-display");
});

// Post modal
postModalButton.addEventListener("click", () => {
  postModal.style.display = "block";
  //   postModalWrapper.classList.add("post-modal-wrapper-display");
  postModalWrapper.style.display = "block";
});

postModalInput.addEventListener("input", (e) => {
  if (postModal) {
    const postModalInputCounter = document.getElementById(
      "post-modal-input-counter"
    );
    const postModalInputExpression = document.getElementById(
      "post-modal-expression"
    );
    const postModalSubmitButton = document.getElementById(
      "post-modal-submit-btn"
    );
    const postModalSpan = document.getElementById("post-modal-span");

    if (e.target.value === "") {
      e.target.value.length.reset;
      document.getElementById("post-modal-form").reset();
      postModalInputCounter.textContent = "0/240";
    } else if (e.target.value.length > 0) {
      postModalInputCounter.textContent = e.target.value.length + "/240";
    }
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
  }
});

closePostModal.addEventListener("click", () => {
  const postModalSubmitButton = document.getElementById(
    "post-modal-submit-btn"
  );
  const postModalSpan = document.getElementById("post-modal-span");
  postModal.style.display = "none";
  //   postModalWrapper.classList.remove("post-modal-wrapper-display");
  postModalWrapper.style.display = "none";

  if (postModalInput.value !== "") {
    document.getElementById("post-modal-form").reset();
    postModalSubmitButton.setAttribute("disabled", "true");
    postModalSpan.dataset.disabled = "yes";
    postModalSpan.classList.add("disabled");
  }
});

// click anywhere in the browser to close both post modal and sidebar
window.onclick = (e) => {
  if (e.target == sidebarWrapper) {
    sidebar.classList.remove("sidebar-display");
    sidebarWrapper.classList.remove("sidebar-wrapper-display");
  } else if (e.target == postModalWrapper) {
    const postModalSubmitButton = document.getElementById(
      "post-modal-submit-btn"
    );
    const postModalSpan = document.getElementById("post-modal-span");
    postModal.style.display = "none";
    //   postModalWrapper.classList.remove("post-modal-wrapper-display");
    postModalWrapper.style.display = "none";

    if (postModalInput.value !== "") {
      document.getElementById("post-modal-form").reset();
      postModalSubmitButton.setAttribute("disabled", "true");
      postModalSpan.dataset.disabled = "yes";
      postModalSpan.classList.add("disabled");
    }
  }
};

// Dark mode
const themeDark1Elements = document.querySelectorAll(".change-to-theme-dark-1");
const themeDark2Elements = document.querySelectorAll(".change-to-theme-dark-2");
// set a given theme/color-scheme and store in the localstorage
const setTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
  document.getElementById("theme-checkbox").checked = true;
  localStorage.setItem("themeSwitcher", "true");
  Array.from(themeDark1Elements).map((themeDark1Element) =>
    themeDark1Element.classList.add(themeName)
  );
  Array.from(themeDark2Elements).map((themeDark2Element) =>
    themeDark2Element.classList.add("theme-dark-2")
  );
};

// remove a given theme/color-scheme from the document and the localstorage
const removeTheme = (themeName) => {
  Array.from(themeDark1Elements).map((themeDark1Element) =>
    themeDark1Element.classList.remove(themeName)
  );
  Array.from(themeDark2Elements).map((themeDark2Element) =>
    themeDark2Element.classList.remove("theme-dark-2")
  );
  localStorage.setItem("theme", "");
  document.getElementById("theme-checkbox").checked = false;
  localStorage.setItem("themeSwitcher", "false");
};

// toggle between light and dark theme
const toggleTheme = () => {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    removeTheme("theme-dark-1" || "theme-dark-2");
  } else {
    setTheme("theme-dark-1" || "theme-dark-2");
  }
};

const toggleThemeCheckbox = document.getElementById("theme-checkbox");

toggleThemeCheckbox.addEventListener("click", toggleTheme);

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("theme") === "theme-dark-1") {
    setTheme("theme-dark-1" || "theme-dark-2");
  } else {
    removeTheme("theme-dark-1" || "theme-dark-2");
  }
})();
