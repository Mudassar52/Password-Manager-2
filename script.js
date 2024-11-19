// Select elements
const websiteInput = document.getElementById("website");
const passwordInput = document.getElementById("password");
const addButton = document.getElementById("add-button");
const passwordList = document.getElementById("password-list");

// Add button functionality
addButton.addEventListener("click", () => {
  const website = websiteInput.value.trim();
  const password = passwordInput.value.trim();

  if (website === "" || password === "") {
    alert("Please fill in both fields!");
    return;
  }

  // Create a new list item
  const listItem = document.createElement("li");
  listItem.className = "password-item";

  // Add website and password
  listItem.innerHTML = `
    <span>${website} - ${password}</span>
    <button class="delete-button">
      <i class="fas fa-trash"></i> Delete
    </button>
  `;

  // Add delete functionality
  listItem.querySelector(".delete-button").addEventListener("click", () => {
    handleDelete(listItem, website, password);
  });

  // Append to the list
  passwordList.appendChild(listItem);

  // Clear inputs
  websiteInput.value = "";
  passwordInput.value = "";
});

// Handle Delete
function handleDelete(listItem, website, password) {
  const confirmDelete = confirm(
    `Are you sure you want to delete the password for "${website}"?`
  );
  if (!confirmDelete) return;

  listItem.style.transition = "opacity 0.3s ease";
  listItem.style.opacity = "0";

  setTimeout(() => {
    listItem.remove();
    showUndoNotification(website, password);
  }, 300);
}

// Show Undo Notification
function showUndoNotification(website, password) {
  const undoContainer = document.createElement("div");
  undoContainer.className = "undo-notification";
  undoContainer.innerHTML = `
    <span>Password for "${website}" deleted.</span>
    <button class="undo-button">Undo</button>
  `;

  document.body.appendChild(undoContainer);

  undoContainer.querySelector(".undo-button").addEventListener("click", () => {
    addPasswordBack(website, password);
    undoContainer.remove();
  });

  setTimeout(() => undoContainer.remove(), 5000);
}

// Add Password Back After Undo
function addPasswordBack(website, password) {
  const listItem = document.createElement("li");
  listItem.className = "password-item";

  listItem.innerHTML = `
    <span>${website} - ${password}</span>
    <button class="delete-button">
      <i class="fas fa-trash"></i> Delete
    </button>
  `;

  listItem.querySelector(".delete-button").addEventListener("click", () => {
    handleDelete(listItem, website, password);
  });

  passwordList.appendChild(listItem);
}
